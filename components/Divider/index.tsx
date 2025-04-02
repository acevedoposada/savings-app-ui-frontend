import { Text, View } from 'react-native';
import { styles } from './Divider.styles';

interface DividerProps {
  text?: string;
}

export default function Divider({ text }: DividerProps) {
  return (
    <View style={[styles.root, text && styles.hasDividerText]}>
      <View style={styles.line} />
      {text && <Text style={styles.dividerText}>{text}</Text>}
      <View style={styles.line} />
    </View>
  );
}
