import React from 'react';
import { Image, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { cn } from '../../lib/utils';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

interface AvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  fallback?: React.ReactNode;
}

export function Avatar({ src, alt, className, fallback }: AvatarProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(1) }],
    };
  });

  if (!src && !fallback) {
    return null;
  }

  return (
    <AnimatedView
      style={[animatedStyle]}
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className
      )}
    >
      {src ? (
        <AnimatedImage
          source={{ uri: src }}
          alt={alt}
          className="aspect-square h-full w-full"
        />
      ) : (
        <AnimatedView className="flex h-full w-full items-center justify-center rounded-full bg-muted">
          {fallback}
        </AnimatedView>
      )}
    </AnimatedView>
  );
} 