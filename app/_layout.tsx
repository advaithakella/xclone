import "@/global.css";
import React from 'react';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from 'expo-font';
import { Stack, Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ThemeProvider } from '../components/theme-provider';
import { useColorScheme } from '@/lib/useColorScheme';
import { AuthProvider, useAuth } from '@/lib/auth-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();
  const { user, loading } = useAuth();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Show nothing while loading
  if (!loaded || loading) {
    return null;
  }

  return (
    <GluestackUIProvider mode={colorScheme ?? 'light'}>
      <Stack>
        {!user ? (
          // Auth stack
          <>
            <Stack.Screen 
              name="auth/sign-in" 
              options={{ 
                headerShown: false,
                header: () => null,
              }} 
            />
            <Stack.Screen 
              name="auth/sign-up" 
              options={{ 
                headerShown: false,
                header: () => null,
              }} 
            />
            <Stack.Screen 
              name="(tabs)" 
              options={{ 
                headerShown: false,
                header: () => null,
              }} 
            />
          </>
        ) : (
          // Main app stack
          <>
            <Stack.Screen 
              name="(tabs)" 
              options={{ 
                headerShown: false,
                header: () => null,
                headerTitle: '',
                headerStyle: {
                  height: 0,
                },
                headerTitleStyle: {
                  display: 'none',
                },
              }} 
            />
            <Stack.Screen 
              name="profile/[id]" 
              options={{ 
                headerShown: false,
                presentation: 'modal',
              }} 
            />
            <Stack.Screen 
              name="settings" 
              options={{ 
                headerShown: false,
                presentation: 'modal',
              }} 
            />
            <Stack.Screen name="+not-found" />
          </>
        )}
      </Stack>
      <StatusBar style="auto" />
    </GluestackUIProvider>
  );
}

export default function AppLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </ThemeProvider>
  );
}
