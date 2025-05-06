import { View, Text, TouchableOpacity, Alert, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Button } from '@/components/ui';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function SettingsScreen() {
  const { user, signOut } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/auth/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (!user) return;
            
            setLoading(true);
            
            try {
              // Delete user data from Supabase
              const { error } = await supabase
                .from('profiles')
                .delete()
                .eq('id', user.id);
              
              if (error) {
                throw error;
              }
              
              // Delete user authentication
              const { error: authError } = await supabase.auth.admin.deleteUser(user.id);
              
              if (authError) {
                throw authError;
              }
              
              // Sign out the user
              await signOut();
              router.replace('/auth/sign-in');
            } catch (error) {
              console.error('Error deleting account:', error);
              Alert.alert('Error', 'Failed to delete account. Please try again.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const SettingItem = ({ 
    icon, 
    title, 
    value, 
    onPress, 
    showSwitch = false, 
    switchValue = false, 
    onSwitchChange = () => {} 
  }: { 
    icon: string; 
    title: string; 
    value?: string; 
    onPress?: () => void; 
    showSwitch?: boolean; 
    switchValue?: boolean; 
    onSwitchChange?: (value: boolean) => void; 
  }) => (
    <TouchableOpacity 
      style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#222',
      }}
      onPress={onPress}
      disabled={showSwitch}
    >
      <IconSymbol name={icon} size={24} color="#00FFB2" />
      <Text style={{ color: '#fff', marginLeft: 16, flex: 1 }}>{title}</Text>
      {value && <Text style={{ color: '#666', marginRight: 8 }}>{value}</Text>}
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#333', true: '#00FFB2' }}
          thumbColor={switchValue ? '#fff' : '#666'}
        />
      ) : (
        <IconSymbol name="chevron.right" size={20} color="#666" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#00FFB2',
      }}>
        <Button variant="ghost" onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color="#00FFB2" />
        </Button>
        <Text style={{ color: '#00FFB2', fontSize: 24, fontWeight: 'bold' }}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: '#666', fontSize: 14, marginLeft: 16, marginBottom: 8 }}>
            ACCOUNT
          </Text>
          
          <SettingItem 
            icon="person" 
            title="Profile" 
            onPress={() => router.push('/profile')} 
          />
          <SettingItem 
            icon="lock" 
            title="Privacy" 
            onPress={() => {}} 
          />
          <SettingItem 
            icon="bell" 
            title="Notifications" 
            showSwitch 
            switchValue={notifications} 
            onSwitchChange={setNotifications} 
          />
          <SettingItem 
            icon="moon" 
            title="Dark Mode" 
            showSwitch 
            switchValue={darkMode} 
            onSwitchChange={setDarkMode} 
          />
        </View>
        
        <View style={{ marginTop: 24 }}>
          <Text style={{ color: '#666', fontSize: 14, marginLeft: 16, marginBottom: 8 }}>
            SUPPORT
          </Text>
          
          <SettingItem 
            icon="questionmark.circle" 
            title="Help Center" 
            onPress={() => {}} 
          />
          <SettingItem 
            icon="envelope" 
            title="Contact Us" 
            onPress={() => {}} 
          />
          <SettingItem 
            icon="doc.text" 
            title="Terms of Service" 
            onPress={() => {}} 
          />
          <SettingItem 
            icon="hand.raised" 
            title="Privacy Policy" 
            onPress={() => {}} 
          />
        </View>
        
        <View style={{ marginTop: 24, marginBottom: 32 }}>
          <Text style={{ color: '#666', fontSize: 14, marginLeft: 16, marginBottom: 8 }}>
            DANGER ZONE
          </Text>
          
          <SettingItem 
            icon="arrow.right.square" 
            title="Sign Out" 
            onPress={handleSignOut} 
          />
          <SettingItem 
            icon="trash" 
            title="Delete Account" 
            onPress={handleDeleteAccount} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 