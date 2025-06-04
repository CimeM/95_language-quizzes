import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { Language,Country, UserProgress, MedalType, Theme, UserProfile, MedalInfo } from '../types';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

interface AppContextType {
  country: Country;
  language: Language;
  theme: Theme;
  changeLanguage: (lang: Language) => void;
  userProgress: UserProgress;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  updateQuizMedal: (quizId: string, medal: MedalType) => void;
  incrementDailyStreak: () => void;
  resetDailyStreak: () => void;
  addCompletedQuiz: (quizId: string) => void;
  updateCountry: (country: Country) => void;
  changeTheme: (theme: Theme) => void;
  resetUserProgress: () => void;
}


const defaultUserProgress: UserProgress = {
    userId: "",
    medals: {},
    streak: 0,
    completedQuizzes: [],
    lastCompletedDaily: "",
    vocabularySets: {},
    weeklyQuizzes: {},
    updatedAt: new Date().toISOString(),
};

const defaultUserProfile: UserProfile = {
  id: '1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  language: "french",
  country: "UK",
  email: "test@gmail.com",
  username: "",
  rank: "",
  totalMedals: 0,
  globalRank: 0,
  countryRank: 0,
  lastActive: new Date().toISOString(),
  theme: 'light'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('french');
  const [country, setCountry] = useState<Country>('FR');
  // set profile from local storage (or default) for immediate UI responsiveness.
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('userProfile');
      var savedJson = saved ? JSON.parse(saved) : defaultUserProfile;
      savedJson.id = user?.uid;
      return mergeUserProfile(defaultUserProfile, savedJson);
    } catch {
      return defaultUserProfile;
    }
  });

  // fetch UserProfile from the api on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log("requesting user account on id:", user?.uid);
        if(user?.uid == undefined ){
          return
        }
        var profileFromApi = await api.getUserAccount( user==null ? "1": user.uid );
        profileFromApi.id = user?.uid || '1';
        if( profileFromApi.hasOwnProperty("error") ){
          console.log("error foun in user account", profileFromApi);
          return 
        }
        // Merge with defaults
        const mergedProfile = mergeUserProfile(defaultUserProfile, profileFromApi);
        // Ensure the id is always set to the current user's uid
        mergedProfile.id = user.uid;
        setUserProfile(mergedProfile);
        localStorage.setItem('userProfile', JSON.stringify(profileFromApi));
      } catch (error) {
        // Optionally, show a toast or log error
        console.warn('Could not fetch user profile from API, using local storage:', error);
        // Do nothing: state is already set from local storage
      }
    };
  
    fetchUserProfile();
  }, []);

  // theme change
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      // fetch from storage foor speed
      const saved = localStorage.getItem('userProgress');
      const savedJson = saved ? JSON.parse(saved) : {};
      return mergeProgress(defaultUserProgress, savedJson);
      
    } catch (error) {
      console.error('[Storage] Failed to load progress:', error);
      // toast.error('Failed to load progress. Starting fresh!');
      return defaultUserProgress;
    }
  });
  

  // --- Sync with API - user progress and subscription ---
  useEffect(() => {
    const syncWithApi = async () => {
      try {
        console.log("requesting user progress on id:", user?.uid);
        if(user == null || user?.uid == undefined){ return }
        var userprogressFromApi = await api.retriveUserProgress(user.uid);
        userprogressFromApi.userId = user.uid;
        if( userprogressFromApi.hasOwnProperty("error") ){
          console.warn("error found in user account", userprogressFromApi);
          return;
        }
        setUserProgress(userprogressFromApi);
        localStorage.setItem('userProgress', JSON.stringify(userprogressFromApi));
        
        // const subscription = await api.validateSubscription(user ? user.uid : "1");
        // if (subscription) {
        //   setUserProgress(prev => ({
        //     ...prev,
        //     subscription,
        //   }));
        // }
      } catch (error) {
        console.error('[API] Sync failed:', error);
        toast.warning('Using offline mode - changes will be saved locally');
      }
    };
    syncWithApi();
    // eslint-disable-next-line
  }, []);

  // --- Save to local storage ---
  useEffect(() => {
    try {
      localStorage.setItem('userProgress', JSON.stringify(userProgress));
    } catch (error) {
      console.error('[Storage] Failed to save progress:', error);
      toast.error('Failed to save progress!');
    }

  }, [userProgress]);

  useEffect(() => {
    try {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    } catch (error) {
      console.error('[Storage] Failed to save profile:', error);
      toast.error('Failed to save profile!');
    }
  }, [userProfile]);

  const updateQuizMedal = async (quizId: string, medal: MedalType) => {

    const clubId = "default";
    console.log("updateQuizMedal", quizId, medal);
    try {
      setUserProgress(prev => {
        const key = quizId.replace(/\W/g, '');
        const currentMedalInfo = prev.medals?.[key] || { medal: 'none', clubId: '' };
        const medalRank = { none: 0, bronze: 1, silver: 2, gold: 3 };
        const currentWeeklyMedal = prev.weeklyQuizzes?.[key] || 'none';
        // console.log("updateQuizMedal medalRank[medal] > medalRank[currentMedalInfo.medal as MedalType]", medalRank[medal], ">", medalRank[currentMedalInfo.medal as MedalType], (medalRank[medal] > medalRank[currentMedalInfo.medal]) );
        if (medalRank[medal] > medalRank[currentMedalInfo.medal]) {
          const newMedalInfo: MedalInfo = { medal, clubId };
          const newProgress = {
            ...prev,
            medals: {
              ...prev.medals,
              [key]: newMedalInfo,
            },
            weeklyQuizzes: {
              ...prev.weeklyQuizzes,
              // Update weekly medal only if new medal is better than current weekly medal
              [key]: medalRank[medal] > medalRank[currentWeeklyMedal] ? medal : currentWeeklyMedal
            }
          };
        api.updateUserProgress(newProgress).catch(error => {
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
      const today = new Date().toDateString();
      setUserProgress(prev => {
        if (prev.lastCompletedDaily === today) {
          return prev;
        }
        const newProgress = {
          ...prev,
          streak: prev.streak + 1,
          lastCompletedDaily: today,
        };
        api.updateUserProgress(newProgress ).catch(error => {
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

  const updateCountry = async (country: Country) => {
    try {
      setCountry(country)
      setUserProfile(prev => ({
        ...prev,
        country
      }));
      await api.updateUserAccount(userProfile);
    } catch (error) {
      console.error('[Country] Failed to update country:', error);
      toast.error('Failed to update country!');
    }
  };

  const changeTheme = async (theme: Theme) => {
    setTheme(theme);
    setUserProfile( prev => ({
      ...prev, theme:theme
    }) )
    await api.updateUserAccount( userProfile );
  }
  const changeLanguage = async (lang: Language) => {
    try {
      setLanguage(lang);
      setUserProfile(prev => ({
        ...prev,
        language: lang
      }));
      setUserProgress(prev => ({
        ...prev,
      }));
      await api.updateUserProgress( userProgress);
    } catch (error) {
      console.error('[Language] Failed to update:', error);
      toast.error('Failed to update language!');
    }
  };

  const resetDailyStreak = async () => {
    try {
      setUserProgress(prev => {
        const newProgress = {
          ...prev,
          streak: 0,
        };
        api.updateUserProgress( newProgress).catch(error => {
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
    setUserProgress(prev => {
      if( prev.completedQuizzes == undefined ){
        return {
          ...prev,
          completedQuizzes: [...[], quizId],
        };
      } 
      const completedQuizzes = prev.completedQuizzes || [];
      if (completedQuizzes.includes(quizId)) {
        return prev;
      }
      
      return {
        ...prev,
        completedQuizzes: [...prev.completedQuizzes, quizId],
      };
    });
  };
  const resetUserProgress = () => {
    var userProgress = defaultUserProgress;
    userProgress.userId = user==null ? "1" : user?.uid;
    api.updateUserProgress( userProgress ).catch(error => {
      console.error('[API] Failed to reset user progress:', error);
      // toast.warning('Streak reset locally - will sync when online');
    });
  }

  // --- Context Value ---
  const value: AppContextType = {
    country,
    language,
    theme,
    changeTheme,
    changeLanguage,
    userProgress,
    userProfile,
    setUserProfile,
    updateCountry,
    updateQuizMedal,
    incrementDailyStreak,
    resetDailyStreak,
    addCompletedQuiz,
    resetUserProgress,
  };
  

  const mergeUserProfile = (defaultProfile: UserProfile, apiProfile: any): UserProfile => {
    // Ensure the apiProfile is not null/undefined
    const safeApiProfile = apiProfile || {};

    // Merge fields, prioritizing the apiProfile but falling back to defaults
    return {
      ...defaultProfile,
      ...safeApiProfile,
      // Override specific fields only if present in apiProfile
      id: safeApiProfile.id || defaultProfile.id,
      createdAt: safeApiProfile.createdAt || defaultProfile.createdAt,
      updatedAt: safeApiProfile.updatedAt || new Date().toISOString(),
      language: safeApiProfile.language || defaultProfile.language,
      country: safeApiProfile.country || defaultProfile.country,
      email: safeApiProfile.email || defaultProfile.email,
      username: safeApiProfile.username || defaultProfile.username,
      rank: safeApiProfile.rank || defaultProfile.rank,
      totalMedals: safeApiProfile.totalMedals || defaultProfile.totalMedals,
      globalRank: safeApiProfile.globalRank || defaultProfile.globalRank,
      countryRank: safeApiProfile.countryRank || defaultProfile.countryRank,
      lastActive: safeApiProfile.lastActive || defaultProfile.lastActive,
      theme: safeApiProfile.theme || defaultProfile.theme
    };
  }

  const  mergeProgress = (defaultProgress: UserProgress, apiProgress: any): UserProgress => {
    const safeApiProgress = apiProgress || {};
      return {
          ...defaultProgress,
          ...safeApiProgress,
          userId: safeApiProgress.userId || defaultProgress.userId,
          medals: safeApiProgress.medals || defaultProgress.medals,
          streak: safeApiProgress.streak || defaultProgress.streak,
          completedQuizzes: safeApiProgress.completedQuizzes || defaultProgress.completedQuizzes,
          lastCompletedDaily: safeApiProgress.lastCompletedDaily || defaultProgress.lastCompletedDaily,
          vocabularySets: safeApiProgress.vocabularySets || defaultProgress.vocabularySets,
          weeklyQuizzes: safeApiProgress.weeklyQuizzes || defaultProgress.weeklyQuizzes,
          updatedAt: safeApiProgress.updatedAt || new Date().toISOString(),
      };
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};