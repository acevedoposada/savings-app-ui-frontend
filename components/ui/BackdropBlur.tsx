import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { Pressable, StyleSheet } from 'react-native';
import { BlurTint, BlurView } from 'expo-blur';
import { useMemo } from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

export interface BackdropBlurProps extends BottomSheetBackdropProps {
  onPress?: () => void;
  tint?: BlurTint;
}

export default function BackdropBlur({
  animatedIndex,
  style,
  tint,
  onPress,
}: BackdropBlurProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const combinedStyle = useMemo(
    () => [style, animatedStyle],
    [style, animatedStyle]
  );

  return (
    <Pressable style={StyleSheet.absoluteFill} onPress={onPress}>
      <Animated.View style={combinedStyle}>
        <BlurView style={StyleSheet.absoluteFill} intensity={50} tint={tint} />
      </Animated.View>
    </Pressable>
  );
}
