import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/lib/auth-context';
import { router } from 'expo-router';
import { Button } from '@/components/ui';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, updateProfile } = useAuth();

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password);
    
    if (error) {
      setLoading(false);
      Alert.alert('Error', error.message);
      return;
    }
    
    // Update profile with username
    const { error: profileError } = await updateProfile({ username });
    
    setLoading(false);
    
    if (profileError) {
      Alert.alert('Error', 'Account created but failed to set username');
    }
    
    Alert.alert(
      'Success', 
      'Account created! Please check your email to confirm your account.',
      [{ text: 'OK', onPress: () => router.replace('/auth/sign-in') }]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Text style={{ color: '#00FFB2', fontSize: 32, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' }}>
          Supa
        </Text>
        
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          Create Account
        </Text>
        
        <TextInput
          placeholder="Username"
          placeholderTextColor="#666"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
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
          onPress={handleSignUp}
          disabled={loading}
          className="bg-[#00FFB2] pt-2"
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={{ color: '#000', fontWeight: 'bold', textAlign: 'center' }}>
              Sign Up
            </Text>
          )}
        </Button>
        
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text style={{ color: '#666' }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/sign-in')}>
            <Text style={{ color: '#00FFB2' }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
} 