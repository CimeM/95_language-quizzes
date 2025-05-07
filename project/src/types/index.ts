export type Language = 'english' | 'spanish' | 'french' | 'german' | 'italian' | 'japanese' | 'chinese' | 'korean';

export type GameType = 'campaign' | 'vocabulary';

export type CampaignType = 'weekly' | 'daily' | 'challenges';

export type ThemeType = 'grocery' | 'transport' | 'park' | 'restaurant' | 'office';

export type MedalType = 'bronze' | 'silver' | 'gold' | 'none';

export type RankType = 'novice' | 'apprentice' | 'expert' | 'master' | 'grandmaster';

export interface ThemeQuiz {
  id: string;
  title: string;
  theme: ThemeType;
  description: string;
  medal: MedalType;
  maxScore: number;
  timeLimit: number;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface VocabularySet {
  id: string;
  title: string;
  description: string;
  words: VocabularyWord[];
  completed: boolean;
  progress: number;
}

export interface VocabularyWord {
  id: string;
  word: string;
  translation: string;
  example: string;
  mastered: boolean;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  country: string;
  language: Language;
  rank: RankType;
  totalMedals: number;
  globalRank: number;
  countryRank: number;
  streak: number;
  lastActive: string;
  avatar?: string;
}

export interface UserProgress {
  language: Language;
  weeklyQuizzes: Record<string, MedalType>;
  dailyStreak: number;
  lastCompletedDaily?: string;
  completedQuizzes: string[];
  vocabularySets: Record<string, VocabularySet>;
  profile: UserProfile;
}