import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Button } from '@/components/ui';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { createPost } from '@/lib/api/posts';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase';

export default function PostScreen() {
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    if (!user) return undefined;
    
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const fileExt = uri.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `posts/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, blob);
      
      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return undefined;
      }
      
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return undefined;
    }
  };

  const handlePost = async () => {
    if (!user) return;
    
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter some content for your post');
      return;
    }
    
    setLoading(true);
    
    try {
      let imageUrl: string | undefined = undefined;
      
      if (imageUri) {
        imageUrl = await uploadImage(imageUri);
      }
      
      const { error } = await createPost(content, imageUrl);
      
      if (error) {
        Alert.alert('Error', 'Failed to create post. Please try again.');
      } else {
        setContent('');
        setImageUri(null);
        Alert.alert('Success', 'Your post has been created!');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
        <Button variant="ghost" onPress={() => {}}>
          <Text style={{ color: '#00FFB2' }}>Cancel</Text>
        </Button>
        <Text style={{ color: '#00FFB2', fontSize: 18, fontWeight: 'bold' }}>New Post</Text>
        <Button 
          variant="ghost" 
          onPress={handlePost}
          disabled={loading || !content.trim()}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#00FFB2" />
          ) : (
            <Text style={{ 
              color: content.trim() ? '#00FFB2' : '#666',
              fontWeight: 'bold',
            }}>
              Post
            </Text>
          )}
        </Button>
      </View>
      
      <View style={{ padding: 16, flex: 1 }}>
        <TextInput
          style={{ 
            color: '#fff', 
            fontSize: 16,
            minHeight: 100,
            textAlignVertical: 'top',
          }}
          placeholder="What's happening?"
          placeholderTextColor="#666"
          multiline
          value={content}
          onChangeText={setContent}
        />
        
        {imageUri && (
          <View style={{ marginTop: 16, position: 'relative' }}>
            <Image 
              source={{ uri: imageUri }} 
              style={{ 
                width: '100%', 
                height: 200, 
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#00FFB2',
              }}
              resizeMode="cover"
            />
            <TouchableOpacity 
              style={{ 
                position: 'absolute', 
                top: 8, 
                right: 8, 
                backgroundColor: 'rgba(0,0,0,0.7)',
                borderRadius: 20,
                padding: 6,
              }}
              onPress={() => setImageUri(null)}
            >
              <IconSymbol name="xmark" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between',
          marginTop: 16,
          paddingTop: 16,
          borderTopWidth: 1,
          borderTopColor: '#222',
        }}>
          <TouchableOpacity onPress={pickImage}>
            <IconSymbol name="image" size={24} color="#00FFB2" />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconSymbol name="camera" size={24} color="#00FFB2" />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconSymbol name="map" size={24} color="#00FFB2" />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconSymbol name="face.smiling" size={24} color="#00FFB2" />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconSymbol name="gift" size={24} color="#00FFB2" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
} 