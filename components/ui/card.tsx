import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { cn } from '../../lib/utils';

const AnimatedView = Animated.createAnimatedComponent(View);

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

export function Card({ children, className, onPress }: CardProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(1) }],
    };
  });

  return (
    <AnimatedView
      style={[animatedStyle]}
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
    >
      {children}
    </AnimatedView>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return (
    <View className={cn('flex flex-col space-y-1.5 p-6', className)}>
      {children}
    </View>
  );
}

export function CardTitle({ children, className }: CardProps) {
  return (
    <View
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        className
      )}
    >
      {children}
    </View>
  );
}

export function CardDescription({ children, className }: CardProps) {
  return (
    <View className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </View>
  );
}

export function CardContent({ children, className }: CardProps) {
  return <View className={cn('p-6 pt-0', className)}>{children}</View>;
}

export function CardFooter({ children, className }: CardProps) {
  return (
    <View
      className={cn('flex flex-row items-center p-6 pt-0', className)}
    >
      {children}
    </View>
  );
} 