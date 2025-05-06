import { supabase } from '../supabase';
import { Profile } from '../database.types';

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return { profile: null, error };
  }

  return { profile: data, error: null };
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating profile:', error);
    return { profile: null, error };
  }

  return { profile: data, error: null };
}

export async function uploadAvatar(userId: string, uri: string) {
  try {
    // Convert URI to blob
    const response = await fetch(uri);
    const blob = await response.blob();
    
    // Upload to Supabase Storage
    const fileExt = uri.split('.').pop();
    const filePath = `${userId}/avatar.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, blob, { upsert: true });
    
    if (uploadError) {
      console.error('Error uploading avatar:', uploadError);
      return { url: null, error: uploadError };
    }
    
    // Get public URL
    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);
    
    return { url: data.publicUrl, error: null };
  } catch (error) {
    console.error('Error in uploadAvatar:', error);
    return { url: null, error };
  }
}

export async function followUser(followerId: string, followingId: string) {
  const { error } = await supabase
    .from('follows')
    .insert([
      {
        follower_id: followerId,
        following_id: followingId,
      },
    ]);

  if (error) {
    console.error('Error following user:', error);
    return { error };
  }

  return { error: null };
}

export async function unfollowUser(followerId: string, followingId: string) {
  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', followerId)
    .eq('following_id', followingId);

  if (error) {
    console.error('Error unfollowing user:', error);
    return { error };
  }

  return { error: null };
}

export async function getFollowers(userId: string) {
  const { data, error } = await supabase
    .from('follows')
    .select(`
      follower:profiles!follower_id (id, username, avatar_url)
    `)
    .eq('following_id', userId);

  if (error) {
    console.error('Error fetching followers:', error);
    return { followers: [], error };
  }

  return { followers: data.map(item => item.follower), error: null };
}

export async function getFollowing(userId: string) {
  const { data, error } = await supabase
    .from('follows')
    .select(`
      following:profiles!following_id (id, username, avatar_url)
    `)
    .eq('follower_id', userId);

  if (error) {
    console.error('Error fetching following:', error);
    return { following: [], error };
  }

  return { following: data.map(item => item.following), error: null };
}

export async function isFollowing(followerId: string, followingId: string) {
  const { data, error } = await supabase
    .from('follows')
    .select('*')
    .eq('follower_id', followerId)
    .eq('following_id', followingId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking if following:', error);
    return { isFollowing: false, error };
  }

  return { isFollowing: !!data, error: null };
} 