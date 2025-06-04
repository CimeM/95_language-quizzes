// src/context/VocabularyContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeQuiz, VocabularySet } from '../types';
import { fetchVocabularies } from '../services/api';
import { useApp } from './AppContext';

interface VocabularyContextType {
  vocabularies: VocabularySet[];
  loading: boolean;
  error: string | null;
  reload: () => void;
}

const VocabularyContext = createContext<VocabularyContextType | undefined>(undefined);

export const VocabularyDataProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const {language} = useApp();
  const [vocabularies, setvocabularies] = useState<VocabularySet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadVocabularyzes = async () => {
    setLoading(true);
    setError(null);
    try {
      setvocabularies(await fetchVocabularies(language));
    } catch (err) {
      setError('Failed to load vocabularyzes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVocabularyzes();
  }, []);

  return (
    <VocabularyContext.Provider value={{ vocabularies, loading, error, reload: loadVocabularyzes }}>
      {children}
    </VocabularyContext.Provider>
  );
};

export const useVocabularyDataContext = () => {
  const ctx = useContext(VocabularyContext);
  if (!ctx) throw new Error('useVocabularyDataContext must be used within VocabularyProvider');
  return ctx;
};
