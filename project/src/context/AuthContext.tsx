import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { UserProfile } from '../types';
import { toast } from 'react-toastify';
import { getUserAccount, updateUserAccount } from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, country: string) => Promise<void>;
  logout: () => Promise<void>;
  userProfile: UserProfile | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('[Auth] Auth state changed:', user?.email);
      setUser(user);
      if (user) {
        try {
          // TODO - mongo get the user from the db
          // const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userDoc = await getUserAccount( user.uid );
          if ( Object(userDoc).keys === undefined || !Object(userDoc).keys.includes("error") ) {
            console.log('[Auth] User profile loaded');
            setUserProfile(userDoc as UserProfile);
          }
        } catch (error) {
          console.error('[Auth] Error loading user profile:', error);
          toast.error('Failed to load user profile');
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, country: string) => {
    try {
      console.log('[Auth] Creating new account');
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await createUserProfile(user.uid, email, country);
      toast.success('Account created successfully!');
    } catch (error) {
      console.error('[Auth] Sign up failed:', error);
      toast.error('Failed to create account. Please try again.');
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('[Auth] Logging out');
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('[Auth] Logout failed:', error);
      toast.error('Failed to log out');
      throw error;
    }
  };

  const createUserProfile = async (userId: string, email: string, country: string) => {
    try {

      console.log('[Auth] Creating user profile');
      const newProfile: UserProfile = {
        id: userId,
        email: email,
        username: email.split('@')[0],
        country,
        language: 'english',
        rank: 'novice',
        totalMedals: 0,
        globalRank: 0,
        countryRank: 0,
        theme: "light",
        subscription: {
          active: false,
          id: "",
          userId: "",
          planId: "",
          startsAt: "",
          expiresAt: "",
          paymentId: "",
          createdAt: "",
          daysLeft: 0,
        },
        updatedAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
  
      updateUserAccount(newProfile)
      setUserProfile(newProfile);
      console.log('[Auth] User profile created successfully');
    } catch (error) {
      console.error('[Auth] Error creating user profile:', error);
      toast.error('Failed to create user profile');
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log('[Auth] Signing in with Google');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if this is a new user
      // TODO connect to mongodb and check if this is a new user
      const userDoc = getUserAccount(result.user.uid);
      console.log("[API], searchinbg for user. got: ", userDoc)
      if ( Object(userDoc).keys === undefined || !Object(userDoc).keys.includes("error") ) {
        await createUserProfile(
          result.user.uid,
          result.user.email!,
          'US' // Default country for Google sign-in
        );
      }
      
      toast.success('Welcome!');
    } catch (error) {
      console.error('[Auth] Google sign in failed:', error);
      toast.error('Google sign in failed. Please try again.');
      throw error;
    }
  };


  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signIn, 
      signInWithGoogle,
      signUp, 
      logout, 
      userProfile 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};





export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};