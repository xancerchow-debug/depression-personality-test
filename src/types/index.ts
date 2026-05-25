export interface Question {
  id: number;
  text: string;
  options: Option[];
  dimension: Dimension;
  reverse?: boolean;
}

export interface Option {
  id: string;
  text: string;
  score: number;
  weights: Record<Dimension, number>;
  feedback?: string;
}

export type Dimension =
  | "rumination"
  | "surveillance"
  | "provocation"
  | "masking"
  | "testing"
  | "avoidance"
  | "isolation"
  | "eruption";

export interface PersonalityType {
  id: string;
  name: string;
  code: string;
  tagline: string;
  behavior: string[];         // 4 specific internet behaviors
  deepNeed: string;
  healedBy: string;
  shareText: string;
  color: string;
  icon: string;
  rarity: number;
  dangerMatch: string;
  collapseTime: string;
  attackIndex: number;
  chatDisappear: number;
  viralHeadline: string;
  hiddenPersonality: {
    name: string;
    description: string;      // the contradiction/tension
  };
}

export interface TestResult {
  personalityId: string;
  secondPersonalityId: string;
  thirdPersonalityId: string;
  matchPercent: number;
  secondMatchPercent: number;
  thirdMatchPercent: number;
  scores: Record<Dimension, number>;
  metrics: Record<Dimension, number>;
  nightEmotion: number;       // 夜晚情绪指数
  relationDependency: number; // 关系依赖指数
  mentalFriction: number;     // 精神内耗指数
  timestamp: number;
  carelessFlag?: boolean;
}

export interface UserRecord {
  id: string;
  personality_id: string;
  scores: Record<string, number>;
  created_at: string;
}
