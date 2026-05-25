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
  dimensionInsights: Record<string, string>;
  // Internet-viral additions
  rarity: number;           // percentage of people with this type
  dangerMatch: string;      // most dangerous personality to fall for
  collapseTime: string;     // most likely time to break down
  attackIndex: number;      // emotional attack power 1-10
  chatDisappear: number;    // probability of ghosting in chat 0-100
  viralHeadline: string;    // share headline for social media
}

export interface TestResult {
  personalityId: string;
  secondPersonalityId: string;
  matchPercent: number;
  secondMatchPercent: number;
  scores: Record<Dimension, number>;
  metrics: Record<Dimension, number>;
  timestamp: number;
  carelessFlag?: boolean;
}

export interface UserRecord {
  id: string;
  personality_id: string;
  scores: Record<string, number>;
  created_at: string;
}
