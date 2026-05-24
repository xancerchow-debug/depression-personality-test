import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Dimension, TestResult } from "@/types";
import { personalities, PERSONALITY_PERCENTILES } from "@/data/personalities";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateResult(
  scores: Record<Dimension, number>
): TestResult {
  const dimensionToPersonality: Record<Dimension, string> = {
    sensitivity: "high-sensitivity-camouflage",
    withdrawal: "emotional-bunker",
    overthinking: "read-no-reply-philosopher",
    numbness: "permanent-standby",
    performance: "smiling-collapse",
    dependency: "midnight-disconnect",
    dissociation: "ruins-observer",
    collapse: "self-destruct-warning",
  };

  // Find dominant dimension
  let maxScore = 0;
  let dominantDimension: Dimension = "sensitivity";

  for (const [dim, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      dominantDimension = dim as Dimension;
    }
  }

  const personalityId = dimensionToPersonality[dominantDimension];
  const maxPossible = 24 * 4; // 24 questions * max 4 points per dimension
  const percentage = Math.round((maxScore / maxPossible) * 100);

  // Calculate derived metrics
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const socialEnergy = Math.max(10, 100 - Math.round((scores.withdrawal + scores.performance) * 8));
  const clarityIndex = Math.max(10, 100 - Math.round((scores.dissociation + scores.numbness) * 7));
  const mentalDrain = Math.min(100, Math.round((scores.overthinking + scores.collapse + scores.sensitivity) * 5));
  const nightOwlProb = Math.min(99, Math.round((scores.overthinking + scores.withdrawal + scores.collapse) * 6));

  return {
    personalityId,
    scores,
    percentage: Math.max(3, Math.min(15, percentage || PERSONALITY_PERCENTILES[personalityId] || 10)),
    socialEnergy,
    clarityIndex,
    mentalDrain,
    nightOwlProb,
    timestamp: Date.now(),
  };
}

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
