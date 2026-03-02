"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const keys = Object.keys(localStorage);
      const hasSession = keys.some(k => k.includes('supabase') && k.includes('auth'));
      const hasHashTokens = window.location.hash?.includes('access_token');
      return hasSession || hasHashTokens;
    } catch { return true; }
  });

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        if (window.location.hash && window.location.hash.includes('access_token')) {
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;
          setSession(data.session);
          setUser(data.session?.user || null);
          window.history.replaceState(null, '', window.location.pathname);
        } else {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) throw error;
          setSession(session);
          setUser(session?.user || null);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };
    const timeout = setTimeout(() => setLoading(false), 5000);
    getInitialSession().then(() => clearTimeout(timeout));

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user || null);
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
