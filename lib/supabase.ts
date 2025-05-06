import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and anon key
const supabaseUrl = 'https://qburoskiiheuskijjfym.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidXJvc2tpaWhldXNraWpqZnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNDYxNzIsImV4cCI6MjA1OTYyMjE3Mn0.tJsS67M2Vu2K0pnpnE2gMozKXrRiIU-vNRt2sDJHcI8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}); 