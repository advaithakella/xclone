import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { cn } from '../../lib/utils';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  disabled?: boolean;
}

export function Button({
  children,
  onPress,
  variant = 'default',
  size = 'default',
  className,
  disabled = false,
}: ButtonProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(1) }],
    };
  });

  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return 'bg-primary';
      case 'destructive':
        return 'bg-destructive';
      case 'outline':
        return 'border border-input bg-background';
      case 'secondary':
        return 'bg-secondary';
      case 'ghost':
        return 'hover:bg-accent hover:text-accent-foreground';
      case 'link':
        return 'underline-offset-4 hover:underline text-primary';
      default:
        return 'bg-primary';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'default':
        return 'h-10 px-4 py-2';
      case 'sm':
        return 'h-9 rounded-md px-3';
      case 'lg':
        return 'h-11 rounded-md px-8';
      case 'icon':
        return 'h-10 w-10';
      default:
        return 'h-10 px-4 py-2';
    }
  };

  return (
    <AnimatedPressable
      style={[animatedStyle]}
      onPress={onPress}
      disabled={disabled}
      className={cn(
        'flex-row items-center justify-center rounded-md',
        getVariantStyles(),
        getSizeStyles(),
        disabled && 'opacity-50',
        className
      )}
    >
      <Text
        className={cn(
          'text-sm font-medium',
          variant === 'default' && 'text-primary-foreground',
          variant === 'destructive' && 'text-destructive-foreground',
          variant === 'outline' && 'text-foreground',
          variant === 'secondary' && 'text-secondary-foreground',
          variant === 'ghost' && 'text-foreground',
          variant === 'link' && 'text-primary'
        )}
      >
        {children}
      </Text>
    </AnimatedPressable>
  );
} 