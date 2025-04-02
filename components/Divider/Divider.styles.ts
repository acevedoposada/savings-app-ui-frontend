import { StyleSheet } from 'react-native';

import theme from '@theme';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 0.5,
    flex: 1,
    backgroundColor: theme.colors.grey[50],
  },
  dividerText: {
    fontFamily: 'Outfit',
    fontWeight: 300,
    lineHeight: theme.spacing(3),
    fontSize: theme.spacing(3),
    color: theme.colors.grey[500],
  },
  hasDividerText: {
    gap: theme.spacing(4),
  },
});
