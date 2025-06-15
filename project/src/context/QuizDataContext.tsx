// src/context/QuizContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeQuiz } from '../types';
import { fetchDailyChallenge, fetchWeeklyQuizzes } from '../services/api';
import { useApp } from './AppContext';

interface QuizContextType {
  weeklyQuizzes: ThemeQuiz[];
  dailyChallenge: ThemeQuiz;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizDataProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { language } = useApp();
  const [weeklyQuizzes, setWeeklyQuizzes] = useState<ThemeQuiz[]>([]);
  const [dailyChallenge, setDailyChallenge] = useState<ThemeQuiz>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQuizzes = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("using language ", language)
      setWeeklyQuizzes(await fetchWeeklyQuizzes(language));
      setDailyChallenge(await fetchDailyChallenge(language));
    } catch (err) {
      setError('Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, [language]);

  return (
    <QuizContext.Provider value={{ weeklyQuizzes,dailyChallenge, loading, error, reload: loadQuizzes }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizDataContext = () => {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuizDataContext must be used within QuizProvider');
  return ctx;
};
