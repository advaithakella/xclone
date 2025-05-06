import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Button, Avatar } from '@/components/ui';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { getProfile, updateProfile, uploadAvatar, getFollowers, getFollowing } from '@/lib/api/profiles';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState<any[]>([]);
  const [following, setFollowing] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const fetchProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      const { profile, error } = await getProfile(user.id);
      
      if (!error && profile) {
        setProfile(profile);
        setUsername(profile.username || '');
        setBio(profile.bio || '');
        
        // Fetch followers and following
        const { followers } = await getFollowers(user.id);
        const { following } = await getFollowing(user.id);
        
        setFollowers(followers || []);
        setFollowing(following || []);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const handleEditProfile = async () => {
    if (!user || !profile) return;
    
    setSaving(true);
    
    try {
      const { error } = await updateProfile(user.id, {
        username,
        bio,
        updated_at: new Date().toISOString(),
      });
      
      if (error) {
        Alert.alert('Error', 'Failed to update profile. Please try again.');
      } else {
        setIsEditing(false);
        fetchProfile();
        Alert.alert('Success', 'Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleChangeAvatar = async () => {
    if (!user) return;
    
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        const { error } = await uploadAvatar(user.id, result.assets[0].uri);
        
        if (error) {
          Alert.alert('Error', 'Failed to upload avatar. Please try again.');
        } else {
          fetchProfile();
        }
      }
    } catch (error) {
      console.error('Error changing avatar:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00FFB2" />
      </SafeAreaView>
    );
  }

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
        <Text style={{ color: '#00FFB2', fontSize: 24, fontWeight: 'bold' }}>Profile</Text>
        <Button variant="ghost" onPress={() => router.push('/settings')}>
          <IconSymbol name="gearshape" size={24} color="#00FFB2" />
        </Button>
      </View>
      
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <TouchableOpacity onPress={handleChangeAvatar}>
              <Avatar 
                src={profile?.avatar_url || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 10)}`} 
                alt="Profile" 
                size="large"
              />
              <View style={{ 
                position: 'absolute', 
                bottom: 0, 
                right: 0, 
                backgroundColor: '#00FFB2',
                borderRadius: 20,
                padding: 8,
              }}>
                <IconSymbol name="camera" size={16} color="#000" />
              </View>
            </TouchableOpacity>
            
            {isEditing ? (
              <View style={{ width: '100%', marginTop: 16 }}>
                <TextInput
                  style={{ 
                    color: '#fff', 
                    fontSize: 16,
                    padding: 12,
                    backgroundColor: '#111',
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#00FFB2',
                    marginBottom: 12,
                  }}
                  placeholder="Username"
                  placeholderTextColor="#666"
                  value={username}
                  onChangeText={setUsername}
                />
                <TextInput
                  style={{ 
                    color: '#fff', 
                    fontSize: 16,
                    padding: 12,
                    backgroundColor: '#111',
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#00FFB2',
                    minHeight: 100,
                    textAlignVertical: 'top',
                  }}
                  placeholder="Bio"
                  placeholderTextColor="#666"
                  multiline
                  value={bio}
                  onChangeText={setBio}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                  <Button 
                    variant="ghost" 
                    onPress={() => setIsEditing(false)}
                    disabled={saving}
                  >
                    <Text style={{ color: '#00FFB2' }}>Cancel</Text>
                  </Button>
                  <Button 
                    onPress={handleEditProfile}
                    disabled={saving}
                  >
                    {saving ? (
                      <ActivityIndicator size="small" color="#000" />
                    ) : (
                      <Text style={{ color: '#000', fontWeight: 'bold' }}>Save</Text>
                    )}
                  </Button>
                </View>
              </View>
            ) : (
              <>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
                  {profile?.username || 'User'}
                </Text>
                <Text style={{ color: '#666', marginTop: 4 }}>
                  {profile?.bio || 'No bio yet'}
                </Text>
                <Button 
                  variant="ghost" 
                  onPress={() => setIsEditing(true)}
                  style={{ marginTop: 16 }}
                >
                  <Text style={{ color: '#00FFB2' }}>Edit Profile</Text>
                </Button>
              </>
            )}
          </View>
          
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-around',
            marginBottom: 24,
            paddingVertical: 16,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#222',
          }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                {following.length}
              </Text>
              <Text style={{ color: '#666' }}>Following</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                {followers.length}
              </Text>
              <Text style={{ color: '#666' }}>Followers</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                {profile?.posts_count || 0}
              </Text>
              <Text style={{ color: '#666' }}>Posts</Text>
            </View>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button variant="ghost" onPress={() => {}}>
              <IconSymbol name="grid" size={24} color="#00FFB2" />
            </Button>
            <Button variant="ghost" onPress={() => {}}>
              <IconSymbol name="bookmark" size={24} color="#00FFB2" />
            </Button>
            <Button variant="ghost" onPress={() => {}}>
              <IconSymbol name="heart" size={24} color="#00FFB2" />
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 