import React from 'react';
import { View } from 'react-native';
import { OverlayProvider } from '@gluestack-ui/overlay';
import { ToastProvider } from '@gluestack-ui/toast';

export function GluestackUIProvider({
  mode = 'light',
  children,
}: {
  mode?: 'light' | 'dark' | 'system';
  children?: React.ReactNode;
}) {
  return (
    <View style={{ flex: 1 }}>
      <OverlayProvider>
        <ToastProvider>{children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
} 