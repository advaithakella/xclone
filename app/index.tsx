import { Redirect } from 'expo-router';
import { useAuth } from '@/lib/auth-context';

export default function Index() {
  const { user } = useAuth();
  
  // Redirect to sign-in if not authenticated, otherwise to tabs
  return <Redirect href={user ? "/(tabs)" : "/auth/sign-in"} />;
} 