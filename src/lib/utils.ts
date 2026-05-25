import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Dimension, TestResult, Question } from "@/types";
import { personalities } from "@/data/personalities";
import { questions } from "@/data/questions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Personality signatures: core dimensions that define each type
// primary = the defining trait (70% weight), secondary = the supporting trait (30% weight)
// ideal values calibrated for primary-only normalization (scores spread 30-95)
const PERSONALITY_SIGNATURES: Record<string, {
  primary: { dim: Dimension; ideal: number };
  secondary?: { dim: Dimension; ideal: number };
}> = {
  "ruins-observer":              { primary: { dim: "dissociation", ideal: 78 }, secondary: { dim: "sensitivity", ideal: 62 } },
  "midnight-disconnect":         { primary: { dim: "dependency", ideal: 72 }, secondary: { dim: "overthinking", ideal: 65 } },
  "emotional-bunker":            { primary: { dim: "withdrawal", ideal: 75 }, secondary: { dim: "numbness", ideal: 58 } },
  "high-sensitivity-camouflage": { primary: { dim: "sensitivity", ideal: 78 }, secondary: { dim: "performance", ideal: 55 } },
  "read-no-reply-philosopher":   { primary: { dim: "overthinking", ideal: 78 }, secondary: { dim: "dissociation", ideal: 52 } },
  "smiling-collapse":            { primary: { dim: "performance", ideal: 72 }, secondary: { dim: "collapse", ideal: 60 } },
  "permanent-standby":           { primary: { dim: "numbness", ideal: 72 }, secondary: { dim: "withdrawal", ideal: 58 } },
  "self-destruct-warning":       { primary: { dim: "collapse", ideal: 75 }, secondary: { dim: "sensitivity", ideal: 52 } },
  "night-owl-philosopher":       { primary: { dim: "overthinking", ideal: 68 }, secondary: { dim: "withdrawal", ideal: 55 } },
  "cyber-ghost":                 { primary: { dim: "dissociation", ideal: 68 }, secondary: { dim: "withdrawal", ideal: 55 } },
  "void-wanderer":               { primary: { dim: "numbness", ideal: 78 }, secondary: { dim: "dissociation", ideal: 55 } },
  "people-pleaser":              { primary: { dim: "dependency", ideal: 78 }, secondary: { dim: "performance", ideal: 65 } },
  "rational-isolator":           { primary: { dim: "withdrawal", ideal: 68 }, secondary: { dim: "numbness", ideal: 58 } },
  "emotional-overload":          { primary: { dim: "sensitivity", ideal: 75 }, secondary: { dim: "collapse", ideal: 55 } },
  "emotional-storm":             { primary: { dim: "sensitivity", ideal: 72 }, secondary: { dim: "overthinking", ideal: 58 } },
  "self-exile":                  { primary: { dim: "withdrawal", ideal: 72 }, secondary: { dim: "dissociation", ideal: 48 } },
};

// Dimensions to show as metrics (6 of 8)
const DISPLAY_DIMENSIONS: { key: Dimension; label: string }[] = [
  { key: "sensitivity", label: "情绪敏感度" },
  { key: "withdrawal", label: "社交回避度" },
  { key: "overthinking", label: "思维反刍度" },
  { key: "numbness", label: "情感钝化度" },
  { key: "performance", label: "人格面具度" },
  { key: "dissociation", label: "现实解离度" },
];

// Normalize denominator: count primary-dimension questions × 4
// This avoids inflating the denominator with secondary weight contributions
const MAX_RAW: Record<Dimension, number> = {
  sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0,
  performance: 0, dependency: 0, dissociation: 0, collapse: 0,
};
for (const q of questions) {
  MAX_RAW[q.dimension] += 4; // each primary question contributes max score 4
}

function calcMatchPercent(
  userScores: Record<Dimension, number>,
  personalityId: string,
): number {
  const sig = PERSONALITY_SIGNATURES[personalityId];
  if (!sig) return 0;

  const userNorm: Record<string, number> = {};
  for (const dim of Object.keys(userScores) as Dimension[]) {
    userNorm[dim] = Math.round((userScores[dim] / MAX_RAW[dim]) * 100);
  }

  const primaryMatch = Math.max(0, Math.min(100,
    100 - Math.abs(userNorm[sig.primary.dim] - sig.primary.ideal) * 1.5
  ));

  let secondaryMatch = 0;
  if (sig.secondary) {
    secondaryMatch = Math.max(0, Math.min(100,
      100 - Math.abs(userNorm[sig.secondary.dim] - sig.secondary.ideal) * 1.2
    ));
  }

  let percent = Math.round(primaryMatch * 0.7 + secondaryMatch * 0.3);

  // Penalty: core dimension too low
  if (userNorm[sig.primary.dim] < sig.primary.ideal * 0.5) {
    percent = Math.round(percent * 0.6);
  }

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
      percent: calcMatchPercent(scores, p.id),
    }))
    .sort((a, b) => b.percent - a.percent);

  // If top two share the same primary dimension, penalize the second
  const topSig = PERSONALITY_SIGNATURES[matches[0].id];
  const secondSig = PERSONALITY_SIGNATURES[matches[1].id];
  if (topSig && secondSig && topSig.primary.dim === secondSig.primary.dim) {
    matches[1].percent = Math.max(5, Math.round(matches[1].percent * 0.55));
  }

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
