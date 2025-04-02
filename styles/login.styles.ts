import { StyleSheet } from 'react-native';
import { COLORS } from '@colors';
import theme from '@theme';

export const styles = StyleSheet.create({
  appNameContainer: {
    backgroundColor: theme.colors.secondary.main,
    position: 'relative',
  },
  appName: {
    fontFamily: theme.typography.main,
    fontSize: theme.spacing(6),
    marginHorizontal: theme.spacing(5),
    fontWeight: 'bold',
    color: theme.colors.primary[900],
  },
  content: {
    padding: theme.spacing(5),
    flex: 1,
    backgroundColor: COLORS.primary.main,
    justifyContent: 'center',
    gap: theme.spacing(5),
  },
  formTitle: {
    fontFamily: theme.typography.title,
    fontSize: theme.spacing(10),
  },
});
