import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/lib/auth-context';
import { router } from 'expo-router';
import { Button } from '@/components/ui';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Text style={{ color: '#00FFB2', fontSize: 32, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' }}>
          Supa
        </Text>
        
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          Sign In
        </Text>
        
        <TextInput
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            backgroundColor: '#111',
            color: '#fff',
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: '#00FFB2',
          }}
        />
        
        <TextInput
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            backgroundColor: '#111',
            color: '#fff',
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: '#00FFB2',
          }}
        />
        
        <Button
          onPress={handleSignIn}
          disabled={loading}
          className="bg-[#00FFB2] pt-2"
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={{ color: '#000', fontWeight: 'bold', textAlign: 'center' }}>
              Sign In
            </Text>
          )}
        </Button>
        
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text style={{ color: '#666' }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/sign-up')}>
            <Text style={{ color: '#00FFB2' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
} 