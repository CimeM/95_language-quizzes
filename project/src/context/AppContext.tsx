import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { Language, UserProgress, MedalType } from '../types';
import * as api from '../services/api';

interface AppContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
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
    profile: {
        id: '1',
        userId: '1',
        medals: {},
        streak: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    vocabularySets: undefined
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('french');

  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const savedProgress = localStorage.getItem('userProgress');
      
      // TODO , check if all JSON keys are there, if not set them form the default 
      const validate = savedProgress ? JSON.parse(savedProgress) : defaultUserProgress;
    //   console.log("savedProgress", validate.language);
      setLanguage(validate.language)
      return validate;
    } catch (error) {
      console.error('[Storage] Failed to load progress:', error);
      toast.error('Failed to load progress. Starting fresh!');
      return defaultUserProgress;
    }
  });

  // Sync with API and validate subscription
  useEffect(() => {
    const syncWithApi = async () => {
      try {
        // console.log('[API] Syncing user progress...', defaultUserProgress.profile);
        await api.updateUserProgress(
            userProgress.profile.id,
            userProgress.profile.medals, 
            userProgress.profile.streak,
            language,
            "", //userProgress.profile.lastCompletedDaily,
        );
        
        const subscription = await api.validateSubscription(defaultUserProgress.profile.userId);
        // console.log('[API] Syncing users subscription...', subscription);
        if (subscription) {
          setUserProgress(prev => ({
            ...prev,
            subscription,
          }));
        }
        console.log('[API] subscription sync completed successfully');
      } catch (error) {
        console.error('[API] Sync failed:', error);
        toast.warning('Using offline mode - changes will be saved locally');
      }
    };

    syncWithApi();
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      console.log('[Storage] Saving progress to local storage');
      localStorage.setItem('userProgress', JSON.stringify(userProgress));
    } catch (error) {
      console.error('[Storage] Failed to save progress:', error);
      toast.error('Failed to save progress!');
    }
  }, [userProgress]);

    const updateQuizMedal = async (quizId: string, medal: MedalType) => {
        try {
        console.log('[Medal] Updating quiz medal:', { quizId, medal });
        setUserProgress(prev => {
            const currentMedal = prev.weeklyQuizzes[quizId] || 'none';
            const medalRank = { none: 0, bronze: 1, silver: 2, gold: 3 };
            
            if (medalRank[medal] > medalRank[currentMedal as MedalType]) {
                const newProgress = {
                    ...prev,
                    weeklyQuizzes: {
                    ...prev.weeklyQuizzes,
                    [quizId]: medal
                    }
                };

                // Try to sync with API
                api.updateUserProgress(
                    userProgress.profile.id,
                    newProgress.profile.medals, 
                    newProgress.profile.streak,
                    language,
                    "", //userProgress.profile.lastCompletedDaily,
                )
                .catch(error => {
                    console.error('[API] Failed to update medal:', error);
                    toast.warning('Medal saved locally - will sync when online');
                });

            return newProgress;
            }
            return prev;
        });
        } catch (error) {
        console.error('[Medal] Failed to update medal:', error);
        toast.error('Failed to update medal!');
        }
    };

    const incrementDailyStreak = async () => {
        try {
            console.log('[Streak] Incrementing daily streak');
            const today = new Date().toDateString();
            
            setUserProgress(prev => {
                if (prev.lastCompletedDaily === today) {
                return prev;
                }
                
                const newProgress = {
                ...prev,
                dailyStreak: prev.dailyStreak + 1,
                lastCompletedDaily: today,
                };

                // Try to sync with API
                api.updateUserProgress(
                    userProgress.profile.id,
                    newProgress.profile.medals, 
                    newProgress.profile.streak,
                    language,
                    "", //userProgress.profile.lastCompletedDaily,
                )
                .catch(error => {
                    console.error('[API] Failed to update streak:', error);
                    toast.warning('Streak saved locally - will sync when online');
                });

                return newProgress;
            });
        } catch (error) {
        console.error('[Streak] Failed to update daily streak:', error);
        toast.error('Failed to update daily streak!');
        }
    };

    const changeLanguage = async (language: Language) => {
        try {
            setLanguage(language);
            console.log('[Language] Change language action');
            const today = new Date().toDateString();
            
            setUserProgress(prev => {
                if (prev.lastCompletedDaily === today) {
                return prev;
                }
                
                const newProgress = {
                ...prev,
                language: language,
                };

                // Try to sync with API
                api.updateUserProgress(
                    userProgress.profile.id,
                    newProgress.profile.medals, 
                    newProgress.profile.streak,
                    language,
                    "", //userProgress.profile.lastCompletedDaily,
                )
                .catch(error => {
                    console.error('[API] Failed to update language:', error);
                    toast.warning('Language change saved locally - will sync when online');
                });

                return newProgress;
            });
        } catch (error) {
        console.error('[Language] Failed to update:', error);
        toast.error('Failed to update language!');
        }
    };

    const resetDailyStreak = async () => {
        try {
        console.log('[Streak] Resetting daily streak');
        setUserProgress(prev => {
            const newProgress = {
            ...prev,
            dailyStreak: 0,
            };

            // Try to sync with API
            api.updateUserProgress(
                userProgress.profile.id,
                newProgress.profile.medals, 
                newProgress.profile.streak,
                language,
                "",
            )
            .catch(error => {
                console.error('[API] Failed to reset streak:', error);
                toast.warning('Streak reset locally - will sync when online');
            });

            return newProgress;
        });
        } catch (error) {
        console.error('[Streak] Failed to reset streak:', error);
        toast.error('Failed to reset streak!');
        }
    };

    const addCompletedQuiz = (quizId: string) => {
        try {
        console.log('[Quiz] Adding completed quiz:', quizId);
        setUserProgress(prev => {
            if (prev.completedQuizzes.includes(quizId)) {
            return prev;
            }
            
            return {
            ...prev,
            completedQuizzes: [...prev.completedQuizzes, quizId],
            };
        });
        } catch (error) {
        console.error('[Quiz] Failed to update completed quizzes:', error);
        toast.error('Failed to update completed quizzes!');
        }
    };

  const value = {
    language,
    changeLanguage,
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