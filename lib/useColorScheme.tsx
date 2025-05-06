import { useColorScheme as useNativeColorScheme } from 'react-native';

export function useColorScheme() {
  const colorScheme = useNativeColorScheme() ?? 'dark';
  const isDark = colorScheme === 'dark';

  const setColorScheme = (scheme: 'light' | 'dark') => {
    // This is a no-op in React Native as the system theme is used
    console.log('Setting color scheme to', scheme);
  };

  const toggleColorScheme = () => {
    setColorScheme(isDark ? 'light' : 'dark');
  };

  return {
    colorScheme,
    isDark,
    setColorScheme,
    toggleColorScheme,
  };
} 