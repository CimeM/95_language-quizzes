import { toast } from 'react-toastify';
import { API_URL } from '../types';

export const updateUserProgress = async (
    userId: string,
    medals: Record<string, string>, 
    streak: number,
    language: string, 
    lastCompletedDaily: string,
) => {
  try {
    const response = await fetch(API_URL+ '/api/update-user-progress', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer TOKEN`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, medals, streak, language, lastCompletedDaily }),
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

export const retriveUserProgress = async (medals: Record<string, string>, streak: number) => {
    try {
      const response = await fetch(`${API_URL}/api/functions/v1/update-user-progress`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ medals, streak }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update progress');
      }
  
      console.log('[API] Progress updated successfully:', { medals, streak });
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