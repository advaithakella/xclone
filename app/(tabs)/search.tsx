import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Button, Input, Card } from '@/components/ui';

export default function SearchScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={{ padding: 16 }}>
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          backgroundColor: '#111', 
          borderRadius: 25,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderWidth: 1,
          borderColor: '#00FFB2',
        }}>
          <IconSymbol name="magnifyingglass" size={20} color="#00FFB2" />
          <Input
            placeholder="Search Supa"
            placeholderTextColor="#666"
            className="ml-2 flex-1 bg-transparent border-transparent text-base text-[#00FFB2]"
          />
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <Text style={{ color: '#00FFB2', fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
            Trending
          </Text>
          {/* Trending Topics */}
          {['#SupaApp', '#ReactNative', '#Expo', '#TypeScript'].map((topic, index) => (
            <Card 
              key={index}
              className="mb-3 border-[#00FFB2] bg-black"
              onPress={() => {}}
            >
              <View style={{ padding: 12 }}>
                <Text style={{ color: '#666', fontSize: 13 }}>Trending in Technology</Text>
                <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>{topic}</Text>
                <Text style={{ color: '#00FFB2', fontSize: 13 }}>50.4K posts</Text>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 