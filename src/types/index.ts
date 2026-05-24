export interface Question {
  id: number;
  text: string;
  options: Option[];
  dimension: Dimension;
}

export interface Option {
  id: string;
  text: string;
  scores: Record<Dimension, number>;
}

export type Dimension =
  | "sensitivity"
  | "withdrawal"
  | "overthinking"
  | "numbness"
  | "performance"
  | "dependency"
  | "dissociation"
  | "collapse";

export interface PersonalityType {
  id: string;
  name: string;
  code: string;
  tagline: string;
  description: string;
  socialBehavior: string;
  loveBehavior: string;
  deepNeed: string;
  healedBy: string;
  misunderstoodAs: string;
  shareText: string;
  color: string;
  icon: string;
}

export interface TestResult {
  personalityId: string;
  scores: Record<Dimension, number>;
  percentage: number;
  emotionSensitivity: number;  // 情绪敏感度
  socialBattery: number;       // 社交电量
  thoughtDensity: number;      // 思维密度
  emotionTemp: number;         // 情感温度
  realityAnchor: number;       // 现实锚定
  collapseIndex: number;       // 崩溃指数
  timestamp: number;
}

export interface UserRecord {
  id: string;
  personality_id: string;
  scores: Record<string, number>;
  created_at: string;
}
