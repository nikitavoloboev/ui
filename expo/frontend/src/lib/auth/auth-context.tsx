import { Session } from '@supabase/supabase-js';
import { TRPCClientError } from '@trpc/client';
import { router } from 'expo-router';
import React, { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';

import { trpc, User } from '../config/api';

import { supabase } from '../config/supabase';

const AuthContext = React.createContext<{
  signOut: () => Promise<void>;
  user: User | null;
  isLoading?: boolean;
  createNewUser: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  updateUser: (userData: User) => void;
  session: Session | null;
}>({
  signOut: () => Promise.resolve(),
  isLoading: false,
  user: null,
  createNewUser: () => Promise.resolve(),
  deleteAccount: () => Promise.resolve(),
  updateUser: () => {},
  session: null,
});

// This hook can be used to access the user info.
export function useAuth() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useAuth must be wrapped in a <AuthProvider />');
    }
  }

  return value;
}

export function AuthProvider(props: React.PropsWithChildren) {
  return <AuthProviderSupabase {...props} />;
}

function AuthProviderSupabase(props: React.PropsWithChildren) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const prevEvent = React.useRef<null | string>(null);
  const updateUser = useCallback((userData: User) => {
    setUser({
      id: userData.id,
      phoneNumber: userData.phoneNumber!,
      onboardingCompleted: userData.onboardingCompleted,
      name: userData.name,
      isPro: userData.isPro,
    });
  }, []);

  const createNewUser = useCallback(async () => {
    setIsLoading(true);
    const userData = await trpc.user.createNewUserIfRequired.mutate();
    updateUser(userData.data);
    setIsLoading(false);
  }, [updateUser]);

  const fetchAndUpdateUser = useCallback(async () => {
    setIsLoading(true);
    const userData = await trpc.user.getCurrentUser.query();
    updateUser(userData);
    setIsLoading(false);
  }, [updateUser]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();

    setUser(null);
  }, []);

  const deleteAccount = useCallback(async () => {
    await trpc.user.deleteAccount.mutate();
    await supabase.auth.signOut();

    setUser(null);
  }, []);

  useEffect(() => {
    const sub = supabase.auth.onAuthStateChange(async (_event, s) => {
      // Prevent multiple back-to-back events
      if (prevEvent.current === _event) {
        return;
      }
      prevEvent.current = _event;

      setIsLoading(true);
      if (s) {
        const createdAt = new Date(s.user.created_at!);
        const lastSignedInAt = new Date(s.user.last_sign_in_at!);

        if (lastSignedInAt.getTime() - createdAt.getTime() < 2000) {
          // User just signed up
          await createNewUser();
          setIsLoading(false);
          return;
        }
        try {
          await fetchAndUpdateUser();
          setSession(s);
          setIsLoading(false);

          router.replace('/');
        } catch (error: any) {
          if (error instanceof TRPCClientError) {
            if (error.data?.code === 400) {
              await signOut();
            }
          }
          Alert.alert('Error', error.message);
        }
      }
      setIsLoading(false);
    });

    return () => {
      sub.data.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        createNewUser,
        deleteAccount,
        signOut,
        updateUser,
        session,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
