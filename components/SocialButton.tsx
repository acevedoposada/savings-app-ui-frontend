import { TextStyle, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import FacebookIcon from '@/assets/images/svgs/facebook-icon';
import GoogleIcon from '@/assets/images/svgs/google-icon';
import AppleIcon from '@/assets/images/svgs/apple-icon';
import { SvgIcon } from '@/assets/images/svgs/common';
import theme from '@theme';

import Button, { ButtonProps } from './Button';
import { ThemedText } from './ThemedText';

enum SocialNetworks {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
  APPLE = 'apple',
}

enum ButtonType {
  TITLE = 'title',
  LOGO = 'logo',
}

export interface SocialButtonProps extends ButtonProps {
  socialNetwork: `${SocialNetworks}`;
  type?: `${ButtonType}`;
}

const ICON_SIZE = theme.spacing(6);

const icons: Record<SocialNetworks, SvgIcon> = {
  [SocialNetworks.FACEBOOK]: FacebookIcon,
  [SocialNetworks.GOOGLE]: GoogleIcon,
  [SocialNetworks.APPLE]: AppleIcon,
};

const titles: Record<SocialNetworks, string> = {
  [SocialNetworks.FACEBOOK]: 'Facebook',
  [SocialNetworks.GOOGLE]: 'Google',
  [SocialNetworks.APPLE]: 'Apple',
};

export default function SocialButton({
  socialNetwork,
  type = ButtonType.LOGO,
  styles = {},
  ...props
}: SocialButtonProps) {
  const { t } = useTranslation();
  const Icon = icons[socialNetwork];
  const socialName = titles[socialNetwork];

  const isTitleButton = type === ButtonType.TITLE;

  const buttonRootStyle: ViewStyle = {
    borderColor: 'black',
    paddingHorizontal: 10,
    alignSelf: isTitleButton ? 'stretch' : undefined,
    justifyContent: isTitleButton ? 'flex-start' : undefined,
    ...styles.root,
  };

  const labelStyle: TextStyle = {
    alignSelf: 'stretch',
    ...styles.label,
  };

  return (
    <Button
      variant='outlined'
      styles={{
        root: buttonRootStyle,
        label: labelStyle,
        ...styles,
      }}
      {...props}
    >
      <View
        style={{
          alignSelf: 'stretch',
          flexDirection: 'row',
          gap: theme.spacing(2),
        }}
      >
        <Icon height={ICON_SIZE} width={ICON_SIZE} />
        {isTitleButton && (
          <ThemedText>
            {t('common:labels.continue_with', { social: socialName })}
          </ThemedText>
        )}
      </View>
    </Button>
  );
}
