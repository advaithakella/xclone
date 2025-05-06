import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Home, Search, PlusCircle, User, UserCircle, Settings, X, Image, List, Map, Smile, MessageCircle, Repeat, Heart, BarChart, Share, MapPin, Link, Twitter, HelpCircle } from 'lucide-react-native';

type IconSymbolProps = {
  name: string;
  size: number;
  color: string;
  style?: StyleProp<ViewStyle>;
};

export function IconSymbol({ name, size, color, style }: IconSymbolProps) {
  // Map SF Symbols names to Lucide icon components
  const iconMap: Record<string, React.ComponentType<any>> = {
    'house': Home,
    'magnifyingglass': Search,
    'plus.circle.fill': PlusCircle,
    'person': User,
    'person.circle.fill': UserCircle,
    'gearshape': Settings,
    'xmark': X,
    'photo': Image,
    'gif': Image,
    'list.bullet': List,
    'map': Map,
    'face.smiling': Smile,
    'bubble.left': MessageCircle,
    'arrow.2.squarepath': Repeat,
    'heart': Heart,
    'chart.bar': BarChart,
    'square.and.arrow.up': Share,
    'location': MapPin,
    'link': Link,
    'bird': Twitter,
  };

  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent size={size} color={color} style={style} />;
} 