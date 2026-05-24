import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Dimension, TestResult } from "@/types";
import { personalities, PERSONALITY_PERCENTILES } from "@/data/personalities";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Composite personality mapping — considers top 2-3 dimensions together
const PERSONALITY_RULES: { match: (s: Record<Dimension, number>) => boolean; id: string }[] = [
  // High sensitivity + collapse → emotional overload
  {
    match: (s) => s.sensitivity >= s.collapse && s.sensitivity >= 12 && s.collapse >= 8,
    id: "emotional-overload",
  },
  // High numbness + dissociation → void wanderer
  {
    match: (s) => s.numbness >= 12 && s.dissociation >= 8,
    id: "void-wanderer",
  },
  // High overthinking + dependency → midnight disconnect
  {
    match: (s) => s.overthinking >= 10 && s.dependency >= 8,
    id: "midnight-disconnect",
  },
  // High performance + sensitivity → smiling collapse
  {
    match: (s) => s.performance >= 10 && s.sensitivity >= 8,
    id: "smiling-collapse",
  },
  // High withdrawal + numbness → permanent standby
  {
    match: (s) => s.withdrawal >= 10 && s.numbness >= 8,
    id: "permanent-standby",
  },
  // High dissociation + overthinking → read-no-reply philosopher
  {
    match: (s) => s.dissociation >= 8 && s.overthinking >= 10,
    id: "read-no-reply-philosopher",
  },
  // High sensitivity + dependency → high sensitivity camouflage
  {
    match: (s) => s.sensitivity >= 10 && s.dependency >= 6,
    id: "high-sensitivity-camouflage",
  },
  // High withdrawal → emotional bunker
  {
    match: (s) => s.withdrawal >= 12,
    id: "emotional-bunker",
  },
  // High collapse → self-destruct warning
  {
    match: (s) => s.collapse >= 10,
    id: "self-destruct-warning",
  },
  // High overthinking + late night pattern → night owl philosopher
  {
    match: (s) => s.overthinking >= 10 && s.withdrawal >= 6 && s.dissociation >= 4,
    id: "night-owl-philosopher",
  },
  // High dissociation + performance → cyber ghost
  {
    match: (s) => s.dissociation >= 8 && s.performance >= 6,
    id: "cyber-ghost",
  },
  // High dissociation alone → ruins observer
  {
    match: (s) => s.dissociation >= 10,
    id: "ruins-observer",
  },
];

function getPersonalityId(scores: Record<Dimension, number>): string {
  // Try composite rules first
  for (const rule of PERSONALITY_RULES) {
    if (rule.match(scores)) return rule.id;
  }

  // Fallback: dominant dimension
  const dimensionToPersonality: Record<Dimension, string> = {
    sensitivity: "high-sensitivity-camouflage",
    withdrawal: "emotional-bunker",
    overthinking: "read-no-reply-philosopher",
    numbness: "void-wanderer",
    performance: "smiling-collapse",
    dependency: "midnight-disconnect",
    dissociation: "ruins-observer",
    collapse: "self-destruct-warning",
  };

  let maxScore = 0;
  let dominant: Dimension = "sensitivity";
  for (const [dim, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      dominant = dim as Dimension;
    }
  }
  return dimensionToPersonality[dominant];
}

export function calculateResult(
  scores: Record<Dimension, number>
): TestResult {
  const personalityId = getPersonalityId(scores);
  const maxPossible = 36 * 4;

  // Calculate derived metrics with weighted formulas
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const normalizedTotal = totalScore / maxPossible;

  // Social Energy: low when withdrawal is high, boosted by dependency
  const socialRaw = (scores.dependency * 1.5 + scores.performance * 1.2) -
                    (scores.withdrawal * 1.8 + scores.numbness * 0.8);
  const socialEnergy = Math.round(
    Math.max(8, Math.min(96, 50 + socialRaw * 3.5))
  );

  // Clarity Index: how "together" you feel — hurt by dissociation and numbness
  const clarityRaw = (scores.sensitivity * 0.5) -
                     (scores.dissociation * 1.5 + scores.numbness * 1.2 + scores.overthinking * 0.6);
  const clarityIndex = Math.round(
    Math.max(5, Math.min(95, 55 + clarityRaw * 3))
  );

  // Mental Drain: cumulative exhaustion from overthinking, collapse, sensitivity
  const drainRaw = scores.overthinking * 1.3 + scores.collapse * 1.5 +
                   scores.sensitivity * 0.8 + scores.performance * 0.6;
  const mentalDrain = Math.round(
    Math.max(10, Math.min(98, drainRaw * 2.8))
  );

  // Night Owl Probability: driven by overthinking and withdrawal patterns
  const nightRaw = scores.overthinking * 1.2 + scores.withdrawal * 0.8 +
                   scores.dissociation * 0.6 + scores.collapse * 0.4;
  const nightOwlProb = Math.round(
    Math.max(12, Math.min(97, 20 + nightRaw * 3.2))
  );

  return {
    personalityId,
    scores,
    percentage: Math.max(3, Math.min(15, PERSONALITY_PERCENTILES[personalityId] || 8)),
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
