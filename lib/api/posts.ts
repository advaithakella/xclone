import { supabase } from '../supabase';
import { Post } from '../database.types';

export async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id (username, avatar_url)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], error };
  }

  return { posts: data, error: null };
}

export async function getPostById(id: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id (username, avatar_url)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return { post: null, error };
  }

  return { post: data, error: null };
}

export async function createPost(content: string, imageUrl?: string) {
  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        content,
        image_url: imageUrl,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating post:', error);
    return { post: null, error };
  }

  return { post: data, error: null };
}

export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting post:', error);
    return { error };
  }

  return { error: null };
}

export async function likePost(postId: string) {
  const { error } = await supabase
    .from('likes')
    .insert([
      {
        post_id: postId,
      },
    ]);

  if (error) {
    console.error('Error liking post:', error);
    return { error };
  }

  return { error: null };
}

export async function unlikePost(postId: string) {
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('post_id', postId);

  if (error) {
    console.error('Error unliking post:', error);
    return { error };
  }

  return { error: null };
}

export async function getLikesForPost(postId: string) {
  const { data, error } = await supabase
    .from('likes')
    .select('*')
    .eq('post_id', postId);

  if (error) {
    console.error('Error fetching likes:', error);
    return { likes: [], error };
  }

  return { likes: data, error: null };
}

export async function isPostLikedByUser(postId: string, userId: string) {
  const { data, error } = await supabase
    .from('likes')
    .select('*')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking if post is liked:', error);
    return { isLiked: false, error };
  }

  return { isLiked: !!data, error: null };
} 