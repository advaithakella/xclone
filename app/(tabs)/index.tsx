import { View, Text, ScrollView, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Button, Card, Avatar } from '@/components/ui';
import { useState, useEffect } from 'react';
import { getPosts, likePost, unlikePost, isPostLikedByUser } from '@/lib/api/posts';
import { useAuth } from '@/lib/auth-context';

export default function HomeScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const fetchPosts = async () => {
    setLoading(true);
    const { posts, error } = await getPosts();
    if (!error) {
      setPosts(posts);
      
      // Check which posts are liked by the current user
      const likedMap: Record<string, boolean> = {};
      for (const post of posts) {
        const { isLiked } = await isPostLikedByUser(post.id, user?.id || '');
        likedMap[post.id] = isLiked;
      }
      setLikedPosts(likedMap);
    }
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    if (!user) return;
    
    const isLiked = likedPosts[postId];
    
    if (isLiked) {
      await unlikePost(postId);
      setLikedPosts({ ...likedPosts, [postId]: false });
    } else {
      await likePost(postId);
      setLikedPosts({ ...likedPosts, [postId]: true });
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
        <Text style={{ color: '#00FFB2', fontSize: 24, fontWeight: 'bold' }}>Supa</Text>
        <Button variant="ghost" size="icon" onPress={() => {}}>
          <IconSymbol name="sparkles" size={24} color="#00FFB2" />
        </Button>
      </View>
      
      <ScrollView 
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#00FFB2"
          />
        }
      >
        {/* For You / Following Tabs */}
        <View style={{ 
          flexDirection: 'row', 
          borderBottomWidth: 1, 
          borderBottomColor: '#222',
          marginBottom: 8,
          paddingHorizontal: 16,
        }}>
          <Button 
            variant="ghost" 
            className="flex-1 pt-2 border-b-2 border-[#00FFB2]"
            onPress={() => {}}
          >
            <Text style={{ 
              color: '#00FFB2', 
              fontWeight: 'bold',
              fontSize: 16,
              textAlign: 'center',
              height: 24,
              lineHeight: 24,
            }}>For You</Text>
          </Button>
          <Button 
            variant="ghost" 
            className="flex-1 pt-2"
            onPress={() => {}}
          >
            <Text style={{ 
              color: '#666', 
              fontWeight: 'bold',
              fontSize: 16,
              textAlign: 'center',
              height: 24,
              lineHeight: 24,
            }}>Following</Text>
          </Button>
        </View>
        
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <ActivityIndicator size="large" color="#00FFB2" />
          </View>
        ) : posts.length === 0 ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: '#666', fontSize: 16 }}>No posts yet. Be the first to post!</Text>
          </View>
        ) : (
          posts.map((post) => (
            <Card 
              key={post.id}
              className="mb-3 border-[#00FFB2] bg-black"
              onPress={() => {}}
            >
              <View style={{ padding: 12 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Avatar 
                    src={post.profiles?.avatar_url || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 10)}`} 
                    alt="Profile" 
                  />
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                        {post.profiles?.username || 'User'}
                      </Text>
                      <Text style={{ color: '#666', marginLeft: 4 }}>
                        @{post.profiles?.username?.toLowerCase() || 'user'}
                      </Text>
                      <Text style={{ color: '#666', marginLeft: 4 }}>· 2h</Text>
                    </View>
                    <Text style={{ color: '#fff', marginTop: 4 }}>
                      {post.content}
                    </Text>
                    
                    {post.image_url && (
                      <View style={{ 
                        marginTop: 8, 
                        borderRadius: 12, 
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderColor: '#00FFB2',
                      }}>
                        <Image 
                          source={{ uri: post.image_url }} 
                          style={{ width: '100%', height: 200 }}
                          resizeMode="cover"
                        />
                      </View>
                    )}
                    
                    <View style={{ 
                      flexDirection: 'row', 
                      justifyContent: 'space-between',
                      marginTop: 12,
                    }}>
                      <Button variant="ghost" size="icon" onPress={() => {}}>
                        <IconSymbol name="message" size={18} color="#666" />
                        <Text style={{ color: '#666', marginLeft: 4 }}>24</Text>
                      </Button>
                      <Button variant="ghost" size="icon" onPress={() => {}}>
                        <IconSymbol name="repeat" size={18} color="#666" />
                        <Text style={{ color: '#666', marginLeft: 4 }}>12</Text>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onPress={() => handleLike(post.id)}
                      >
                        <IconSymbol 
                          name="heart" 
                          size={18} 
                          color={likedPosts[post.id] ? '#00FFB2' : '#666'} 
                        />
                        <Text style={{ color: '#666', marginLeft: 4 }}>48</Text>
                      </Button>
                      <Button variant="ghost" size="icon" onPress={() => {}}>
                        <IconSymbol name="chart.bar" size={18} color="#666" />
                        <Text style={{ color: '#666', marginLeft: 4 }}>1.2K</Text>
                      </Button>
                      <Button variant="ghost" size="icon" onPress={() => {}}>
                        <IconSymbol name="square.and.arrow.up" size={18} color="#666" />
                      </Button>
                    </View>
                  </View>
                </View>
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

