import 'expo-dev-client';
import '../../global.css';

import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthProvider } from '@/lib/auth/auth-context';
import { queryClient, trpcQuery, trpcQueryClient } from '@/lib/config/api';
import ToastProvider from '@/lib/shared/toast';
import { NAV_THEME } from '@/theme';

import * as Supabase from '@/lib/config/supabase';

// Initialze any services

Supabase.init();

export {
  // Catch any errors thrown by the Layout component
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present
  initialRouteName: 'index',
};

function Root() {
  const { colorScheme } = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <trpcQuery.Provider client={trpcQueryClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NavThemeProvider value={NAV_THEME[colorScheme]}>
              <Slot />
              <ToastProvider />
            </NavThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </trpcQuery.Provider>
    </GestureHandlerRootView>
  );
}

export default Root;
