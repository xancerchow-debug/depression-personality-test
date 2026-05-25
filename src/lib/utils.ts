import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Dimension, TestResult } from "@/types";
import { personalities } from "@/data/personalities";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Each personality's ideal dimension profile (0-100 scale)
// Based on psychological archetypes:
//   sensitivity = emotional reactivity
//   withdrawal = social avoidance
//   overthinking = rumination tendency
//   numbness = emotional blunting
//   performance = persona/mask wearing
//   dependency = attachment anxiety
//   dissociation = reality detachment
//   collapse = structural fragility
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

// Dimensions to show as metrics (6 of 8)
const DISPLAY_DIMENSIONS: { key: Dimension; label: string }[] = [
  { key: "sensitivity", label: "情绪敏感度" },
  { key: "withdrawal", label: "社交回避度" },
  { key: "overthinking", label: "思维反刍度" },
  { key: "numbness", label: "情感钝化度" },
  { key: "performance", label: "人格面具度" },
  { key: "dissociation", label: "现实解离度" },
];

// Max possible raw score per dimension (questions per dim × 4 points)
const MAX_PER_DIM: Record<Dimension, number> = {
  sensitivity: 24,   // 6 questions
  withdrawal: 16,    // 4 questions
  overthinking: 20,  // 5 questions
  numbness: 16,      // 4 questions
  performance: 24,   // 6 questions
  dependency: 16,    // 4 questions
  dissociation: 16,  // 4 questions
  collapse: 12,      // 3 questions
};

function calcMatchPercent(
  userScores: Record<Dimension, number>,
  idealProfile: Record<Dimension, number>
): number {
  // Convert raw scores to 0-100 scale
  const userNorm: Record<string, number> = {};
  for (const dim of Object.keys(userScores) as Dimension[]) {
    userNorm[dim] = Math.round((userScores[dim] / MAX_PER_DIM[dim]) * 100);
  }

  // Euclidean distance in 8-dimensional space
  let sumSq = 0;
  for (const dim of Object.keys(idealProfile) as Dimension[]) {
    const diff = (userNorm[dim] || 0) - idealProfile[dim];
    sumSq += diff * diff;
  }
  const distance = Math.sqrt(sumSq);

  // Max possible distance (worst case: all dimensions at opposite extremes)
  // Each dimension can differ by at most 100, so max distance = sqrt(8 * 100^2) = ~283
  const maxDistance = Math.sqrt(8 * 100 * 100);
  const percent = Math.round((1 - distance / maxDistance) * 100);

  return Math.max(5, Math.min(98, percent));
}

export function calculateResult(
  scores: Record<Dimension, number>
): TestResult {
  // Calculate metrics as simple percentages
  const metrics: Record<Dimension, number> = {} as Record<Dimension, number>;
  for (const dim of Object.keys(scores) as Dimension[]) {
    metrics[dim] = Math.round((scores[dim] / MAX_PER_DIM[dim]) * 100);
  }

  // Find best and second-best personality match
  const matches = personalities
    .map((p) => ({
      id: p.id,
      percent: calcMatchPercent(scores, IDEAL_PROFILES[p.id]),
    }))
    .sort((a, b) => b.percent - a.percent);

  return {
    personalityId: matches[0].id,
    secondPersonalityId: matches[1].id,
    matchPercent: matches[0].percent,
    secondMatchPercent: matches[1].percent,
    scores,
    metrics,
    timestamp: Date.now(),
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
