import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, UserProgress, MedalType } from '../types';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  userProgress: UserProgress;
  updateQuizMedal: (quizId: string, medal: MedalType) => void;
  incrementDailyStreak: () => void;
  resetDailyStreak: () => void;
  addCompletedQuiz: (quizId: string) => void;
}

const defaultUserProgress: UserProgress = {
  language: 'french',
  weeklyQuizzes: {},
  dailyStreak: 0,
  completedQuizzes: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('french');
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const savedProgress = localStorage.getItem('userProgress');
    return savedProgress ? JSON.parse(savedProgress) : defaultUserProgress;
  });

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  const updateQuizMedal = (quizId: string, medal: MedalType) => {
    setUserProgress(prev => {
      // Only update if the new medal is better than the previous one
      const currentMedal = prev.weeklyQuizzes[quizId] || 'none';
      const medalRank = { none: 0, bronze: 1, silver: 2, gold: 3 };
      
      if (medalRank[medal] > medalRank[currentMedal as MedalType]) {
        return {
          ...prev,
          weeklyQuizzes: {
            ...prev.weeklyQuizzes,
            [quizId]: medal
          }
        };
      }
      return prev;
    });
  };

  const incrementDailyStreak = () => {
    const today = new Date().toDateString();
    
    setUserProgress(prev => {
      if (prev.lastCompletedDaily === today) {
        return prev; // Already completed today
      }
      
      return {
        ...prev,
        dailyStreak: prev.dailyStreak + 1,
        lastCompletedDaily: today,
      };
    });
  };

  const resetDailyStreak = () => {
    setUserProgress(prev => ({
      ...prev,
      dailyStreak: 0,
    }));
  };

  const addCompletedQuiz = (quizId: string) => {
    setUserProgress(prev => {
      if (prev.completedQuizzes.includes(quizId)) {
        return prev;
      }
      
      return {
        ...prev,
        completedQuizzes: [...prev.completedQuizzes, quizId],
      };
    });
  };

  const value = {
    language,
    setLanguage,
    userProgress,
    updateQuizMedal,
    incrementDailyStreak,
    resetDailyStreak,
    addCompletedQuiz,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};