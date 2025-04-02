import {
  TextInputFocusEventData,
  NativeSyntheticEvent,
  TouchableOpacity,
  TextInputProps,
  StyleProp,
  TextInput,
  TextStyle,
  ViewStyle,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCallback, useMemo, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import theme from '@theme';
import { styles } from './FormField.styles';

export interface FormFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  styles?: {
    root?: ViewStyle;
    input?: StyleProp<TextStyle>;
  };
}

type FocusEvent = NativeSyntheticEvent<TextInputFocusEventData>;

export default function FormField({
  styles: componentStyles,
  label,
  placeholder,
  value,
  onFocus,
  onBlur,
  onChangeText,
  secureTextEntry,
  ...props
}: FormFieldProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const labelPosition = useSharedValue(value ? 1 : 0);
  const iconOpacity = useSharedValue(1);

  const animatedLabelStyle = useAnimatedStyle(() => ({
    top: withTiming(labelPosition.value === 1 ? -8 : 10, {
      duration: 200,
    }),
    left: withTiming(labelPosition.value === 1 ? 8 : 12, {
      duration: 200,
    }),
    fontSize: withTiming(labelPosition.value === 1 ? 12 : 14, {
      duration: 200,
    }),
    paddingHorizontal: withTiming(labelPosition.value === 1 ? 4 : 0, {
      duration: 200,
    }),
  }));

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(iconOpacity.value, {
        duration: 150,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  const placeholderToShow = useMemo(() => {
    if (!label) {
      return placeholder;
    }
    return isFocused ? placeholder : '';
  }, [placeholder]);

  const handleFocus = useCallback(
    (event: FocusEvent) => {
      setIsFocused(true);
      labelPosition.value = 1;
      onFocus?.(event);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event: FocusEvent) => {
      setIsFocused(false);
      if (!inputValue) labelPosition.value = 0;
      onBlur?.(event);
    },
    [inputValue, onBlur]
  );

  const handleChange = useCallback(
    (eventValue: string) => {
      setInputValue(eventValue);
      onChangeText?.(eventValue);
    },
    [onChangeText]
  );

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prevValue) => !prevValue);
    iconOpacity.value = iconOpacity.value === 1 ? 0 : 1;
  }, []);

  return (
    <View style={[styles.root, componentStyles?.root]}>
      {label && (
        <Animated.Text style={[styles.label, animatedLabelStyle]}>
          {label}
        </Animated.Text>
      )}
      <TextInput
        {...props}
        value={inputValue}
        placeholder={placeholderToShow}
        style={[styles.input, componentStyles?.input]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleChange}
        secureTextEntry={secureTextEntry && !showPassword}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.passwordButton}
          onPress={handleTogglePassword}
        >
          <Animated.View style={{ opacity: animatedIconStyle.opacity }}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              style={styles.passwordIcon}
              size={theme.spacing(4)}
            />
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
}
