import FacebookIcon from '@/assets/images/svgs/facebook-icon';
import GoogleIcon from '@/assets/images/svgs/google-icon';
import AppleIcon from '@/assets/images/svgs/apple-icon';
import { SvgIcon } from '@/assets/images/svgs/common';
import theme from '@theme';

import Button, { ButtonProps } from './Button';

enum SocialNetworks {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
  APPLE = 'apple',
}

export interface SocialButtonProps extends ButtonProps {
  socialNetwork: `${SocialNetworks}`;
}

const ICON_SIZE = theme.spacing(6);

const icons: Record<SocialNetworks, SvgIcon> = {
  [SocialNetworks.FACEBOOK]: FacebookIcon,
  [SocialNetworks.GOOGLE]: GoogleIcon,
  [SocialNetworks.APPLE]: AppleIcon,
};

export default function SocialButton({
  socialNetwork,
  styles,
  ...props
}: SocialButtonProps) {
  const Icon = icons[socialNetwork];
  return (
    <Button
      variant='outlined'
      styles={{
        root: { borderColor: 'black', paddingHorizontal: 10, ...styles?.root },
        ...styles,
      }}
      {...props}
    >
      <Icon height={ICON_SIZE} width={ICON_SIZE} />
    </Button>
  );
}
