import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../supabase/supabase';

export function useLogin() {
  const [loading, setLoading] = useState(false);

  const login = (email: string, password: string) => {
    setLoading(true);

    supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then(({ error }) => {
        if (error) {
          Alert.alert(error.message);
        }
      })
      .finally(() => setLoading(false));
  };

  return { login, loading };
}

export function useSignUp() {
  const [loading, setLoading] = useState(false);

  const signUp = (email: string, password: string) => {
    setLoading(true);

    supabase.auth
      .signUp({
        email,
        password,
      })
      .then(({ error }) => {
        if (error) {
          Alert.alert(error.message);
        }
      })
      .finally(() => setLoading(false));
  };
  
  return { signUp, loading };
}

export function useSession() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });
  }, []);

  return { loading, session };
}