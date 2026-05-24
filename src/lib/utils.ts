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

// Normalize a raw score to 0-100 using sqrt scaling for better distribution
function norm(raw: number, maxRaw: number): number {
  const clamped = Math.max(0, Math.min(maxRaw, raw));
  return Math.round(Math.sqrt(clamped / maxRaw) * 100);
}

export function calculateResult(
  scores: Record<Dimension, number>
): TestResult {
  const personalityId = getPersonalityId(scores);

  // Max possible per dimension: 36 questions * 4 points = 144
  // But in practice no dimension hits 144, realistic max ~80-100
  // Use 90 as practical max for sqrt normalization
  const M = 90;

  // 情绪敏感度 — sensitivity + collapse
  const emotionSensitivity = norm(
    scores.sensitivity * 1.3 + scores.collapse * 0.7, M
  );

  // 社交电量 — high withdrawal + high performance = drained (inverted)
  const socialRaw = scores.withdrawal * 1.2 + (M - scores.performance) * 0.8;
  const socialBattery = 100 - norm(socialRaw, M * 1.2);

  // 思维密度 — overthinking + dissociation
  const thoughtDensity = norm(
    scores.overthinking * 1.2 + scores.dissociation * 0.8, M
  );

  // 情感温度 — numbness kills it, sensitivity boosts it
  const emotionTemp = norm(
    (M - scores.numbness) * 0.7 + scores.sensitivity * 0.6, M * 1.3
  );

  // 现实锚定 — dissociation and numbness both erode it (inverted)
  const realityRaw = scores.dissociation * 1.1 + scores.numbness * 0.9;
  const realityAnchor = 100 - norm(realityRaw, M);

  // 崩溃指数 — collapse + performance(面具的代价) + dependency(关系焦虑)
  const collapseIndex = norm(
    scores.collapse * 1.3 + scores.performance * 0.7 + scores.dependency * 0.5, M * 1.5
  );

  return {
    personalityId,
    scores,
    percentage: Math.max(3, Math.min(15, PERSONALITY_PERCENTILES[personalityId] || 8)),
    emotionSensitivity,
    socialBattery,
    thoughtDensity,
    emotionTemp,
    realityAnchor,
    collapseIndex,
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
