import React from 'react';
import { View } from 'react-native';
import { useColorScheme } from '../lib/useColorScheme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useColorScheme();

  return (
    <View style={{ flex: 1 }}>
      {children}
    </View>
  );
} 