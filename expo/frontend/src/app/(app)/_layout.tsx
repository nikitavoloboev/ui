import { Redirect, SplashScreen, Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { ActivityIndicator, View, Platform } from 'react-native';

import { useAuth } from '@/lib/auth/auth-context';
import { COLORS } from '@/theme/colors';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { user, isLoading } = useAuth();
  const { colorScheme } = useColorScheme();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator
          size="small"
          color={colorScheme === 'dark' ? COLORS.white : COLORS.black}
        />
      </View>
    );
  } else {
    SplashScreen.hideAsync();
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!user) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // TODO: if user exists, but onboarding is not complete, redirect to onboarding
  // if (!user.onboardingComplete) {
  //   return <Redirect href="/onboarding" />;
  // }

  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen
        name="buttons-screen"
        options={{
          title: 'Buttons',
          headerTransparent: Platform.OS === 'ios',
          headerBlurEffect: colorScheme,
        }}
      />
      <Stack.Screen
        name="typography-screen"
        options={{
          title: 'Typography',
          headerTransparent: Platform.OS === 'ios',
          headerBlurEffect: colorScheme,
        }}
      />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
