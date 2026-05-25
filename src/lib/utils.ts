import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Dimension, TestResult, Question } from "@/types";
import { personalities } from "@/data/personalities";
import { questions } from "@/data/questions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Each personality's ideal dimension profile (0-100 scale)
const IDEAL_PROFILES: Record<string, Record<Dimension, number>> = {
  "ruins-observer":              { sensitivity: 60, withdrawal: 40, overthinking: 30, numbness: 30, performance: 20, dependency: 15, dissociation: 70, collapse: 25 },
  "midnight-disconnect":         { sensitivity: 55, withdrawal: 25, overthinking: 65, numbness: 20, performance: 45, dependency: 70, dissociation: 15, collapse: 30 },
  "emotional-bunker":            { sensitivity: 25, withdrawal: 75, overthinking: 20, numbness: 50, performance: 30, dependency: 10, dissociation: 35, collapse: 15 },
  "high-sensitivity-camouflage": { sensitivity: 80, withdrawal: 20, overthinking: 40, numbness: 10, performance: 55, dependency: 50, dissociation: 10, collapse: 20 },
  "read-no-reply-philosopher":   { sensitivity: 40, withdrawal: 35, overthinking: 80, numbness: 25, performance: 20, dependency: 15, dissociation: 50, collapse: 25 },
  "smiling-collapse":            { sensitivity: 50, withdrawal: 10, overthinking: 25, numbness: 20, performance: 75, dependency: 30, dissociation: 15, collapse: 55 },
  "permanent-standby":           { sensitivity: 20, withdrawal: 60, overthinking: 15, numbness: 65, performance: 15, dependency: 10, dissociation: 30, collapse: 20 },
  "self-destruct-warning":       { sensitivity: 55, withdrawal: 20, overthinking: 40, numbness: 15, performance: 35, dependency: 30, dissociation: 10, collapse: 75 },
  "night-owl-philosopher":       { sensitivity: 45, withdrawal: 50, overthinking: 70, numbness: 30, performance: 15, dependency: 20, dissociation: 45, collapse: 20 },
  "cyber-ghost":                 { sensitivity: 35, withdrawal: 55, overthinking: 25, numbness: 35, performance: 50, dependency: 10, dissociation: 60, collapse: 15 },
  "emotional-overload":          { sensitivity: 85, withdrawal: 15, overthinking: 50, numbness: 10, performance: 25, dependency: 35, dissociation: 10, collapse: 65 },
  "void-wanderer":               { sensitivity: 15, withdrawal: 45, overthinking: 20, numbness: 70, performance: 20, dependency: 10, dissociation: 55, collapse: 10 },
  "people-pleaser":              { sensitivity: 50, withdrawal: 10, overthinking: 35, numbness: 15, performance: 70, dependency: 75, dissociation: 10, collapse: 25 },
  "rational-isolator":           { sensitivity: 15, withdrawal: 65, overthinking: 20, numbness: 55, performance: 25, dependency: 10, dissociation: 40, collapse: 10 },
  "emotional-storm":             { sensitivity: 85, withdrawal: 10, overthinking: 65, numbness: 10, performance: 20, dependency: 40, dissociation: 10, collapse: 70 },
  "self-exile":                  { sensitivity: 30, withdrawal: 70, overthinking: 20, numbness: 50, performance: 15, dependency: 10, dissociation: 55, collapse: 15 },
};

// Per-personality dimension weights (normalized to sum=1)
const PERSONALITY_WEIGHTS: Record<string, Record<Dimension, number>> = {};
for (const [id, profile] of Object.entries(IDEAL_PROFILES)) {
  const total = Object.values(profile).reduce((a, b) => a + b, 0);
  PERSONALITY_WEIGHTS[id] = {} as Record<Dimension, number>;
  for (const dim of Object.keys(profile) as Dimension[]) {
    PERSONALITY_WEIGHTS[id][dim] = profile[dim] / total;
  }
}

// Dimensions to show as metrics (6 of 8)
const DISPLAY_DIMENSIONS: { key: Dimension; label: string }[] = [
  { key: "sensitivity", label: "情绪敏感度" },
  { key: "withdrawal", label: "社交回避度" },
  { key: "overthinking", label: "思维反刍度" },
  { key: "numbness", label: "情感钝化度" },
  { key: "performance", label: "人格面具度" },
  { key: "dissociation", label: "现实解离度" },
];

// Dynamically compute max raw score per dimension from questions data
const MAX_RAW: Record<Dimension, number> = {
  sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0,
  performance: 0, dependency: 0, dissociation: 0, collapse: 0,
};
for (const q of questions) {
  for (const dim of Object.keys(MAX_RAW) as Dimension[]) {
    const maxWeight = Math.max(...q.options.map(o => o.weights[dim] || 0));
    MAX_RAW[dim] += maxWeight * 4;
  }
}

function calcMatchPercent(
  userScores: Record<Dimension, number>,
  idealProfile: Record<Dimension, number>,
  personalityId: string,
): number {
  const userNorm: Record<string, number> = {};
  for (const dim of Object.keys(userScores) as Dimension[]) {
    userNorm[dim] = Math.round((userScores[dim] / MAX_RAW[dim]) * 100);
  }

  const weights = PERSONALITY_WEIGHTS[personalityId];
  let sumSq = 0;
  let maxSumSq = 0;
  for (const dim of Object.keys(idealProfile) as Dimension[]) {
    const diff = (userNorm[dim] || 0) - idealProfile[dim];
    const w = weights[dim] || 0;
    sumSq += w * diff * diff;
    maxSumSq += w * 100 * 100;
  }
  const distance = Math.sqrt(sumSq);
  const maxDistance = Math.sqrt(maxSumSq);
  const percent = Math.round((1 - distance / maxDistance) * 100);

  return Math.max(5, Math.min(98, percent));
}

function detectCareless(
  answers: Record<number, string>,
  shuffledQuestions: Question[],
): boolean {
  const reverseQs = shuffledQuestions.filter(q => q.reverse);
  let count = 0;
  for (const q of reverseQs) {
    const optId = answers[q.id];
    const opt = q.options.find(o => o.id === optId);
    if (opt && opt.score === 1) count++;
  }
  return count >= 5;
}

export function calculateResult(
  scores: Record<Dimension, number>,
  answers?: Record<number, string | null>,
  shuffledQuestions?: Question[],
): TestResult {
  const metrics: Record<Dimension, number> = {} as Record<Dimension, number>;
  for (const dim of Object.keys(scores) as Dimension[]) {
    metrics[dim] = Math.round((scores[dim] / MAX_RAW[dim]) * 100);
  }

  const matches = personalities
    .map((p) => ({
      id: p.id,
      percent: calcMatchPercent(scores, IDEAL_PROFILES[p.id], p.id),
    }))
    .sort((a, b) => b.percent - a.percent);

  let carelessFlag = false;
  if (answers && shuffledQuestions) {
    const cleaned: Record<number, string> = {};
    for (const [k, v] of Object.entries(answers)) {
      if (v !== null) cleaned[Number(k)] = v;
    }
    carelessFlag = detectCareless(cleaned, shuffledQuestions);
  }

  return {
    personalityId: matches[0].id,
    secondPersonalityId: matches[1].id,
    matchPercent: matches[0].percent,
    secondMatchPercent: matches[1].percent,
    scores,
    metrics,
    timestamp: Date.now(),
    carelessFlag,
  };
}

export { DISPLAY_DIMENSIONS };

export function generateShareText(personalityId: string): string {
  const p = personalities.find((p) => p.id === personalityId);
  if (!p) return "";
  return `我在「测测你的抑郁型人格」里测出了「${p.name}」——${p.tagline}\n\n你也来测测？`;
}

export function generateShareUrl(resultId: string): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/result?id=${resultId}`;
  }
  return `/result?id=${resultId}`;
}

export function formatNumber(n: number): string {
  return n.toString().padStart(2, "0");
}

export function getStaggerDelay(index: number, base: number = 0.1): number {
  return index * base;
}
