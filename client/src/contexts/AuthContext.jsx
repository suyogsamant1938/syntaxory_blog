import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event);
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
        setProfile(null);
        setLoading(false);
      } else if (session?.user) {
        setUser(session.user);
        // Don't await this, let it load in background
        loadUserProfile(session.user.id);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const session = await authService.getSession();
      if (session?.user) {
        setUser(session.user);
        await loadUserProfile(session.user.id);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = useCallback(async (userId) => {
    try {
      console.log(`AuthContext: fetching profile for ${userId}`);
      const userProfile = await authService.getUserProfile(userId);
      console.log('AuthContext: getUserProfile success', userProfile);
      setProfile(userProfile);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }, []);

  const signUp = async (email, password, name) => {
    const data = await authService.signUp(email, password, name);
    return data;
  };

  const signIn = async (email, password) => {
    console.log('AuthContext: signIn called');
    const data = await authService.signIn(email, password);
    console.log('AuthContext: authService.signIn returned', data);
    if (data.user) {
      setUser(data.user);
      console.log('AuthContext: loading user profile (non-blocking)');
      // Don't await this, let it load in background so we don't block navigation
      loadUserProfile(data.user.id);
    }
    return data;
  };

  const signInWithGoogle = async () => {
    return await authService.signInWithGoogle();
  };

  const signInWithGithub = async () => {
    return await authService.signInWithGithub();
  };

  const signOut = async () => {
    // Fire and forget - don't await the network call
    authService.signOut().catch(err => console.error('Background signOut error:', err));
    
    // Explicitly clear local storage to prevent persistence on refresh
    localStorage.removeItem(`sb-${import.meta.env.VITE_SUPABASE_ID}-auth-token`);
    localStorage.clear(); // Clear all to be safe, or just the specific key if known

    setUser(null);
    setProfile(null);
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithGithub,
    signOut,
    refreshProfile: useCallback(() => user && loadUserProfile(user.id), [user, loadUserProfile]),
    isAuthenticated: !!user,
    isPaidUser: profile?.role === 'PAID_SUBSCRIBER',
    isAdmin: profile?.role === 'ADMIN',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
