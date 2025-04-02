import { Pressable, PressableProps, TextStyle, ViewStyle } from 'react-native';
import { ReactElement, ReactNode } from 'react';
import { ThemedText } from './ThemedText';
import { COLORS } from './ui/colors';
import { StyleProp } from 'react-native';

enum ButtonVariants {
  CONTAINED = 'contained',
  LINK = 'link',
  OUTLINED = 'outlined',
}

enum ButtonColors {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  children?: ReactElement | ReactNode;
  variant?: `${ButtonVariants}`;
  color?: `${ButtonColors}`;
  onPress?: () => void;
  styles?: {
    root?: ViewStyle;
    label?: StyleProp<TextStyle>;
  };
}

const Button = ({
  children,
  variant = ButtonVariants.CONTAINED,
  color = ButtonColors.PRIMARY,
  onPress,
  styles: componentStyles,
  ...props
}: ButtonProps) => {
  const getContainerStyle = (pressed: boolean): ViewStyle => {
    const baseStyle: ViewStyle = {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      borderWidth: variant === ButtonVariants.OUTLINED ? 1 : 0,
      borderColor:
        variant === ButtonVariants.OUTLINED
          ? COLORS[color].main
          : 'transparent',
      backgroundColor:
        variant === ButtonVariants.CONTAINED
          ? pressed
            ? COLORS[color][900]
            : COLORS[color].main
          : 'transparent',
      opacity: pressed ? 0.9 : 1,
    };
    return { ...baseStyle, ...componentStyles?.root };
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontSize: 16,
      color:
        variant === ButtonVariants.CONTAINED
          ? COLORS[color].textContrast
          : COLORS[color].main,
      fontWeight: variant === ButtonVariants.CONTAINED ? 600 : 'normal',
    };
    return baseTextStyle;
  };

  return (
    <Pressable
      style={({ pressed }) => getContainerStyle(pressed)}
      onPress={onPress}
      {...props}
    >
      <ThemedText style={[getTextStyle(), componentStyles?.label]}>
        {children}
      </ThemedText>
    </Pressable>
  );
};

export default Button;
