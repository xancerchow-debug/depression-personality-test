import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Dimension, TestResult, Question } from "@/types";
import { personalities } from "@/data/personalities";
import { questions } from "@/data/questions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 10 personalities × 8 dimensions
// Some primary dimensions repeat — algorithm handles via same-primary penalty
const PERSONALITY_SIGNATURES: Record<string, {
  primary: { dim: Dimension; ideal: number };
  secondary?: { dim: Dimension; ideal: number };
}> = {
  "message-ruminator":   { primary: { dim: "overthinking", ideal: 82 }, secondary: { dim: "sensitivity", ideal: 55 } },
  "midnight-scroller":   { primary: { dim: "sensitivity", ideal: 80 }, secondary: { dim: "dependency", ideal: 60 } },
  "pretend-whatever":    { primary: { dim: "numbness", ideal: 78 }, secondary: { dim: "performance", ideal: 58 } },
  "earphone-escape":     { primary: { dim: "withdrawal", ideal: 80 }, secondary: { dim: "numbness", ideal: 55 } },
  "emotion-performer":   { primary: { dim: "performance", ideal: 82 }, secondary: { dim: "sensitivity", ideal: 60 } },
  "social-fuse":         { primary: { dim: "collapse", ideal: 75 }, secondary: { dim: "withdrawal", ideal: 58 } },
  "chat-replay":         { primary: { dim: "overthinking", ideal: 78 }, secondary: { dim: "sensitivity", ideal: 60 } },
  "social-stalker":      { primary: { dim: "dissociation", ideal: 82 }, secondary: { dim: "withdrawal", ideal: 55 } },
  "relation-tester":     { primary: { dim: "performance", ideal: 75 }, secondary: { dim: "dependency", ideal: 62 } },
  "cold-reply":          { primary: { dim: "numbness", ideal: 72 }, secondary: { dim: "performance", ideal: 58 } },
};

// Display dimensions (6 of 8)
const DISPLAY_DIMENSIONS: { key: Dimension; label: string }[] = [
  { key: "sensitivity", label: "情绪敏感度" },
  { key: "withdrawal", label: "社交回避度" },
  { key: "overthinking", label: "思维反刍度" },
  { key: "numbness", label: "情感钝化度" },
  { key: "performance", label: "人格面具度" },
  { key: "dissociation", label: "现实解离度" },
];

// Primary-only question count per dimension
const PRIMARY_Q_COUNT: Record<Dimension, number> = {
  sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0,
  performance: 0, dependency: 0, dissociation: 0, collapse: 0,
};
for (const q of questions) {
  PRIMARY_Q_COUNT[q.dimension]++;
}

// Compute primary-only scores
function calcPrimaryScores(
  answers: Record<number, string | null>,
  shuffledQuestions: Question[],
): Record<Dimension, number> {
  const result: Record<Dimension, number> = {
    sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0,
    performance: 0, dependency: 0, dissociation: 0, collapse: 0,
  };
  for (const q of shuffledQuestions) {
    const optId = answers[q.id];
    if (!optId) continue;
    const opt = q.options.find((o) => o.id === optId);
    if (!opt) continue;
    const effectiveScore = q.reverse ? (5 - opt.score) : opt.score;
    result[q.dimension] += effectiveScore;
  }
  return result;
}

// Match percent: 3.0x primary multiplier for wide gaps
function calcMatchPercent(
  metrics: Record<Dimension, number>,
  personalityId: string,
): number {
  const sig = PERSONALITY_SIGNATURES[personalityId];
  if (!sig) return 0;

  const userNorm = metrics;

  // Primary: 3.0x multiplier — deviation costs 3 points per 1 point off
  const primaryDiff = Math.abs(userNorm[sig.primary.dim] - sig.primary.ideal);
  const primaryMatch = Math.max(0, Math.min(100,
    100 - primaryDiff * 3.0
  ));

  let secondaryMatch = 0;
  if (sig.secondary) {
    const secondaryDiff = Math.abs(userNorm[sig.secondary.dim] - sig.secondary.ideal);
    secondaryMatch = Math.max(0, Math.min(100,
      100 - secondaryDiff * 1.5
    ));
  }

  let percent = Math.round(primaryMatch * 0.75 + secondaryMatch * 0.25);

  // Penalty: core dimension below 45% of ideal → cut by 60%
  if (userNorm[sig.primary.dim] < sig.primary.ideal * 0.45) {
    percent = Math.round(percent * 0.4);
  }

  return Math.max(5, Math.min(97, percent));
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
  return count >= 3;
}

export function calculateResult(
  scores: Record<Dimension, number>,
  answers?: Record<number, string | null>,
  shuffledQuestions?: Question[],
): TestResult {
  // Display metrics: primary-only scores (0-100%)
  const metrics: Record<Dimension, number> = {} as Record<Dimension, number>;
  if (answers && shuffledQuestions) {
    const primaryScores = calcPrimaryScores(answers, shuffledQuestions);
    for (const dim of Object.keys(primaryScores) as Dimension[]) {
      const maxRaw = PRIMARY_Q_COUNT[dim] * 4;
      metrics[dim] = maxRaw > 0 ? Math.min(100, Math.round((primaryScores[dim] / maxRaw) * 100)) : 0;
    }
  } else {
    for (const dim of Object.keys(scores) as Dimension[]) {
      const maxRaw = PRIMARY_Q_COUNT[dim] * 4;
      metrics[dim] = maxRaw > 0 ? Math.min(100, Math.round((scores[dim] / maxRaw) * 100)) : 0;
    }
  }

  // Match all personalities
  const matches = personalities
    .map((p) => ({
      id: p.id,
      percent: calcMatchPercent(metrics, p.id),
    }))
    .sort((a, b) => b.percent - a.percent);

  // Same-primary penalty for second match
  const topSig = PERSONALITY_SIGNATURES[matches[0].id];
  const secondSig = PERSONALITY_SIGNATURES[matches[1].id];
  if (topSig && secondSig && topSig.primary.dim === secondSig.primary.dim) {
    matches[1].percent = Math.max(5, Math.round(matches[1].percent * 0.4));
  }

  // Third must be well below second
  if (matches[2].percent >= matches[1].percent * 0.75) {
    matches[2].percent = Math.max(5, Math.round(matches[2].percent * 0.5));
  }

  // Calculate derived metrics
  const nightEmotion = Math.min(100, Math.round(
    (metrics.sensitivity * 0.5 + metrics.overthinking * 0.3 + (100 - metrics.numbness) * 0.2)
  ));
  const relationDependency = Math.min(100, Math.round(
    (scores.dependency / (PRIMARY_Q_COUNT.dependency * 4 || 1)) * 100
  ));
  const mentalFriction = Math.min(100, Math.round(
    (metrics.overthinking * 0.5 + metrics.sensitivity * 0.3 + metrics.performance * 0.2)
  ));

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
    thirdPersonalityId: matches[2].id,
    matchPercent: matches[0].percent,
    secondMatchPercent: matches[1].percent,
    thirdMatchPercent: matches[2].percent,
    scores,
    metrics,
    nightEmotion,
    relationDependency,
    mentalFriction,
    timestamp: Date.now(),
    carelessFlag,
  };
}

export { DISPLAY_DIMENSIONS };

export function generateShareText(personalityId: string): string {
  const p = personalities.find((p) => p.id === personalityId);
  if (!p) return "";
  return `我在「测测你的互联网精神状态」里测出了「${p.name}」——${p.tagline}\n\n你也来测测？`;
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
