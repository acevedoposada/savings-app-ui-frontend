import { StyleSheet } from 'react-native';
import theme from '../ui/theme';

export const styles = StyleSheet.create({
  root: {
    height: theme.spacing(10),
    borderWidth: 1,
    borderColor: theme.colors.black.main,
    alignSelf: 'stretch',

    borderRadius: theme.spacing(2),
    position: 'relative',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    paddingHorizontal: theme.spacing(3),
    fontFamily: 'Outfit',
    fontWeight: 300,
  },
  label: {
    userSelect: 'none',
    position: 'absolute',
    left: theme.spacing(4),
    backgroundColor: theme.colors.white.main,
    fontFamily: 'Outfit',
    fontWeight: 300,
  },
  passwordButton: {
    height: theme.spacing(10) - 2,
    width: theme.spacing(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing(2),
  },
  passwordIcon: {},
});
