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
  socialEnergy: number;
  clarityIndex: number;
  mentalDrain: number;
  nightOwlProb: number;
  timestamp: number;
}

export interface UserRecord {
  id: string;
  personality_id: string;
  scores: Record<string, number>;
  created_at: string;
}
