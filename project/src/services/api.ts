import { toast } from 'react-toastify';
import { API_URL, Language, ThemeQuiz, UserProgress, VocabularySet } from '../types';
import { UserProfile } from '../types';

export const updateUserProgress = async (userP: UserProgress) => {
  try {
    // console.log("updateUserProgress userP: ", userP)
    const response = await fetch(API_URL+'/api/user-progress' + '/'+ userP.userId , {
      method: 'POST',
      headers: {
        'Authorization': `Bearer TOKEN`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( userP ),
    });

    if (!response.ok) {
      throw new Error('Failed to update progress');
    }

    // console.log('[API] Progress updated successfully:', { userId, medals, streak, language, lastCompletedDaily  });
    return await response.json();
  } catch (error) {
    console.error('[API] Error updating progress:', error);
    throw error;
  }
};

export const retriveUserProgress = async (userId: string) => {
    try {
      const response = await fetch(API_URL+'/api/user-progress?userId='+ userId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to update progress');
      }
  
      console.log('[API] Progress updated successfully:' );
      return await response.json();
    } catch (error) {
      console.error('[API] Error updating progress:', error);
      throw error;
    }
};

export const validateSubscription = async (username: string) => {
    try {
      const response = await fetch(API_URL+'/api/subscription-status?username='+ username, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to validate subscription');
      }

      const data = await response.json();
      
      // Optionally, log or process the data here
      //   console.log('[API] Subscription status:', data);
  
      // The data will be in the format:
      // { active: boolean, planId: string, createdAt, startsAt: string ,expiresAt: string, daysLeft: number }
      // Or if not found: 
      // { active: false, reason: 'Unknown plan or missing duration.' }
      return data;
    } catch (error) {
      console.error('[API] Error validating subscription:', error);
      throw error;
    }
};

export const updateUserAccount = async (acc: UserProfile ) => {
  try {
    const response = await fetch(API_URL+ '/api/user-account/'+ acc.id, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer TOKEN`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( acc ),
    });

    if (!response.ok) {
      throw new Error('Failed to update user account');
    }

    // console.log('[API] Progress updated successfully:', { userId, medals, streak, language, lastCompletedDaily  });
    return await response.json();
  } catch (error) {
    console.error('[API] Error updating progress:', error);
    throw error;
  }
};

export const getUserAccount = async (userId: string) : Promise<UserProfile> => {
  try {
    const response = await fetch(API_URL+'/api/user-account?userId='+ userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to validate subscription');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[API] Error retriving user account:', error);
    throw error;
  }
};


import { weeklyQuizzes } from '../data/fr/preplexity-adjectives.ts';
import { weeklyQuizzes as weeklyQuizzes1 } from '../data/fr/preplexity-adverbs.ts';
import { weeklyQuizzes as weeklyQuizzes2 } from '../data/fr/preplexity-articles.ts';
import { weeklyQuizzes as weeklyQuizzes3 } from '../data/fr/preplexity-conjugation.ts';
import { weeklyQuizzes as weeklyQuizzes4 } from '../data/fr/preplexity-interrogatives.ts';
import { weeklyQuizzes as weeklyQuizzes5 } from '../data/fr/preplexity-negation.ts';
import { weeklyQuizzes as weeklyQuizzes6 } from '../data/fr/preplexity-nounandgender.ts';
import { weeklyQuizzes as weeklyQuizzes7 } from '../data/fr/preplexity-prepositions.ts';
import { weeklyQuizzes as weeklyQuizzes8 } from '../data/fr/preplexity-pronouns.ts';
import { weeklyQuizzes as weeklyQuizzes9 } from '../data/fr/preplexity-verbs-essential.ts';
import { weeklyQuizzes as weeklyQuizzes10 } from '../data/fr/preplexity-verbs-essential.ts';
import { weeklyQuizzes as weeklyQuizzes11 } from '../data/fr/preplexity-verbs-essential-2.ts';
import { weeklyQuizzes as weeklyQuizzes12 } from '../data/fr/preplexity-verbs-essential-3.ts';
import { dailyChallenges } from '../data/fr/preplexity-daily.ts';

const allFRquizzes = [
    weeklyQuizzes, 
    weeklyQuizzes1, 
    weeklyQuizzes2, 
    weeklyQuizzes3, 
    weeklyQuizzes4, 
    weeklyQuizzes5, 
    weeklyQuizzes6, 
    weeklyQuizzes7, 
    weeklyQuizzes8, 
    weeklyQuizzes9, 
    weeklyQuizzes10, 
    weeklyQuizzes11,
    weeklyQuizzes12 
  ]

export const fetchWeeklyQuizzes = async (language: Language) : Promise<ThemeQuiz[]> =>{
  
  let now = new Date();
  let onejan = new Date(now.getFullYear(), 0, 1);
  let weekNumber = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);

  if(language=='french'){
    const datasetNumber = weekNumber % allFRquizzes.length ; //random integer from 0 to 10:
    return allFRquizzes[datasetNumber]; // rotates between all options weekly
  }else{
    const datasetNumber = weekNumber % allFRquizzes.length ; //random integer from 0 to 10:
    return allFRquizzes[datasetNumber]; // rotates between all options weekly
  }
}

export const fetchDailyChallenge = async (language: Language) : Promise<ThemeQuiz> =>{
  let now = new Date();
  let onejan = new Date(now.getFullYear(), 0, 1);
  let daysSinceJan = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1));
  
  if(language=='french'){
    let selectedDatasetNumber = daysSinceJan%dailyChallenges.length;
    console.log("fetchDailyChallenge", language, selectedDatasetNumber);
    return dailyChallenges[selectedDatasetNumber]
    
  }else{ // fallback to french option
    let selectedDatasetNumber = daysSinceJan%dailyChallenges.length;
    return dailyChallenges[selectedDatasetNumber];
  }
    
}

import { vocabullaryDatasets } from '../data/fr/preplexity-vocab00.ts';
import { vocabullaryDatasets as vocabullaryDatasets0 } from '../data/fr/preplexity-vocab0';
import { vocabullaryDatasets as vocabullaryDatasets1 } from '../data/fr/preplexity-vocab1';
import { vocabullaryDatasets as vocabullaryDatasets2 } from '../data/fr/preplexity-vocab2';
import { vocabullaryDatasets as vocabullaryDatasets3 } from '../data/fr/preplexity-vocab3';
import { vocabullaryDatasets as vocabullaryDatasets4 } from '../data/fr/preplexity-vocab4';
import { vocabullaryDatasets as vocabullaryDatasets5 } from '../data/fr/preplexity-vocab5';
import { vocabullaryDatasets as vocabullaryDatasets6 } from '../data/fr/preplexity-vocab6';
import { vocabullaryDatasets as vocabullaryDatasets7 } from '../data/fr/preplexity-vocab7';
import { vocabullaryDatasets as vocabullaryDatasets8 } from '../data/fr/preplexity-vocab8';
import { vocabullaryDatasets as vocabullaryDatasets9 } from '../data/fr/preplexity-vocab9';
import { vocabullaryDatasets as vocabullaryDatasets10 } from '../data/fr/preplexity-vocab10';

const allFRvocabullaryDatasets = [
    vocabullaryDatasets, 
    vocabullaryDatasets0,
    vocabullaryDatasets1,
    vocabullaryDatasets2,
    vocabullaryDatasets3,
    vocabullaryDatasets4,
    vocabullaryDatasets5,
    vocabullaryDatasets6,
    vocabullaryDatasets7,
    vocabullaryDatasets8,
    vocabullaryDatasets9,
    vocabullaryDatasets10,
];

export const fetchVocabularies = async (language: Language) : Promise<VocabularySet[]> =>{
  
  return allFRvocabullaryDatasets.filter(x => x.language == language); // rotates between all options weekly
  
}