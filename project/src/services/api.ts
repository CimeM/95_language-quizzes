import { toast } from 'react-toastify';
import { API_URL, Language, ThemeQuiz, UserProgress, VocabularySet } from '../types';
import { UserProfile } from '../types';

export const updateUserProgress = async (userP: UserProgress) => {
  try {
    console.log("updateUserProgress userP: ", userP)
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

import { allquizzes as allFRquizzes } from '../data/fr/aggregator';
import { allquizzes as allITAquizzes } from '../data/ita/aggregator';

export const fetchWeeklyQuizzes = async (language: Language) : Promise<ThemeQuiz[]> =>{
  
  let now = new Date();
  let onejan = new Date(now.getFullYear(), 0, 1);
  let weekNumber = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);

  if(language.includes('fr') ){
    const datasetNumber = weekNumber % allFRquizzes.length ; //random integer 
    return allFRquizzes[datasetNumber]; // rotates between all options weekly
  }
  else if(language.includes("ita")){
    const datasetNumber = weekNumber % allITAquizzes.length ; //random integer 
    return allITAquizzes[datasetNumber]; // rotates between all options weekly
  }
  else{
    console.log("falling back to default language. language set to : ", language)
    const datasetNumber = weekNumber % allFRquizzes.length ; //random integer
    return allFRquizzes[datasetNumber]; // rotates between all options weekly
  }
}

export const fetchDailyChallenge = async (language: Language) : Promise<ThemeQuiz> =>{
  let now = new Date();
  let onejan = new Date(now.getFullYear(), 0, 1);
  let daysSinceJan = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1));
  
  if(language.includes('fr')){
    let selectedDatasetNumber = daysSinceJan%dailyChallenges.length;
    return dailyChallenges[selectedDatasetNumber]
  }
  else if(language.includes('ita')){
    let selectedDatasetNumber = daysSinceJan%dailyITAChallenges.length;
    return dailyITAChallenges[selectedDatasetNumber]
  }
  else{ // fallback to french option
    console.log("falling back to default language. language set to : ", language)
    let selectedDatasetNumber = daysSinceJan%dailyChallenges.length;
    return dailyChallenges[selectedDatasetNumber];
  }
}


import { allModulesVocabulary as allFRvocabullaryDatasets } from '../data/fr/aggregator';
import { allModulesVocabulary as allITAvocabullaryDatasets } from '../data/ita/aggregator';

export const fetchVocabularies = async (language: Language) : Promise<VocabularySet[]> =>{
  
  if(language.includes('fr') ){
    return allFRvocabullaryDatasets.filter(x => x.language == language); // rotates between all options weekly
  }
  else if(language.includes("ita")){
    return allITAvocabullaryDatasets.filter(x => x.language == language); // rotates between all options weekly
  }
  else{}
}