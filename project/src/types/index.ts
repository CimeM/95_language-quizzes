export type Language = 'english' | 'spanish' | 'french' | 'slovenian' | 'italian' ;

export type GameType = 'campaign' | 'vocabulary';

export type CampaignType = 'weekly' | 'daily' | 'challenges';

export type ThemeType = 'grocery' | 'transport' | 'park' | 'restaurant' | 'office';

export type MedalType = 'bronze' | 'silver' | 'gold' | 'none';

export type RankType = 'novice' | 'apprentice' | 'expert' | 'master' | 'grandmaster';

export const API_URL = 'https://api.langapi.rivieraapps.com'; // https://api.langapi.rivieraapps.com

export  const languages = [
  { value: 'french', label: 'French' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'slovenian', label: 'Slovenian' },
  { value: 'italian', label: 'Italian' },
];

export interface Plan {
  id: string;
  title: string;
  description: string;
  price: number;
  savings?: string;
  popular?: boolean;
  benefits: string[];
  limitations: {
    maxQuizzes: number;
    maxVocabSets: number;
    features: string[];
  };
  paypalInvoiceId?: string;
}

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
  userId: string;
  medals: Record<string, MedalType>;
  streak: number;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  active: boolean;
  id: string;
  userId: string;
  planId: string;
  startsAt: string;
  expiresAt: string;
  paymentId: string;
  createdAt: string;
  daysLeft: number;
}

export interface UserProgress {
  language: Language;
  weeklyQuizzes: Record<string, MedalType>;
  dailyStreak: number;
  lastCompletedDaily?: string;
  completedQuizzes: string[];
  vocabularySets: Record<string, VocabularySet>;
  profile: UserProfile;
  subscription?: Subscription;
}