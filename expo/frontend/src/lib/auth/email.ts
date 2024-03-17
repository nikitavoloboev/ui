import { useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../config/supabase';

export function useEmailAuth() {
  const [isLoading, setIsLoading] = useState(false);

  async function signInWithEmail(email: string, password: string) {
    setIsLoading(true);
    if (!email || !password) {
      Alert.alert('Please enter both an email and password');
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setIsLoading(false);
  }

  async function signUpWithEmail(email: string, password: string) {
    setIsLoading(true);
    if (!email || !password) {
      Alert.alert('Please enter both an email and password');
      return;
    }
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert('Please check your inbox for email verification!');
    setIsLoading(false);
  }

  return {
    signUpWithEmail,
    signInWithEmail,
    isLoading,
  };
}
