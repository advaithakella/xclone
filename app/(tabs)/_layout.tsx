import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Pressable, View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        header: () => null,
        headerTitle: '',
        headerStyle: {
          height: 0,
        },
        headerTitleStyle: {
          display: 'none',
        },
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: '#00FFB2',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#00FFB2',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarItemStyle: {
          padding: 4,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          headerShown: false,
          header: () => null,
          headerTitle: '',
          headerStyle: {
            height: 0,
          },
          headerTitleStyle: {
            display: 'none',
          },
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <IconSymbol name="house" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: '',
          headerShown: false,
          header: () => null,
          headerTitle: '',
          headerStyle: {
            height: 0,
          },
          headerTitleStyle: {
            display: 'none',
          },
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <IconSymbol name="magnifyingglass" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: '',
          headerShown: false,
          header: () => null,
          headerTitle: '',
          headerStyle: {
            height: 0,
          },
          headerTitleStyle: {
            display: 'none',
          },
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <IconSymbol name="plus.circle.fill" size={size} color={color} />
            </View>
          ),
          tabBarButton: (props: any) => (
            <Pressable
              onPress={props.onPress}
              style={{
                top: -20,
                backgroundColor: '#000',
                borderRadius: 30,
                padding: 8,
                borderWidth: 2,
                borderColor: '#00FFB2',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <IconSymbol
                name="plus.circle.fill"
                size={32}
                color="#00FFB2"
              />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          headerShown: false,
          header: () => null,
          headerTitle: '',
          headerStyle: {
            height: 0,
          },
          headerTitleStyle: {
            display: 'none',
          },
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <IconSymbol name="person" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
