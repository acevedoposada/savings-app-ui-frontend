import { Image, Text, View, useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useRef } from 'react';
import {
  BottomSheetBackdropProps,
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import Character1BubbleSvg from '@/assets/images/svgs/character-1-bubble';
import Character2BubbleSvg from '@/assets/images/svgs/character-2-bubble';

import BackdropBlur from '@/components/ui/BackdropBlur';
import SocialButton from '@/components/SocialButton';
import FormField from '@/components/FormField';
import Divider from '@/components/Divider';
import Button from '@/components/Button';
import theme from '@theme';

import { styles } from '@/styles/login.styles';

export default function LoginPage() {
  const loginSheetRef = useRef<BottomSheetModal>(null);
  const signupSheetRef = useRef<BottomSheetModal>(null);

  const { width: windowWidth } = useWindowDimensions();
  const { t } = useTranslation();
  const snapPoints = useMemo(() => ['90%'], []);

  const handleOpenLogin = () => {
    loginSheetRef.current?.present();
  };

  const handleCloseLogin = () => {
    loginSheetRef.current?.dismiss();
  };

  const handleOpenSignup = () => {
    signupSheetRef.current?.present();
  };

  const handleClosenSignup = () => {
    signupSheetRef.current?.dismiss();
  };

  const handleSignUp = () => {
    handleCloseLogin();
    const timeout = setTimeout(() => {
      handleOpenSignup();
      clearTimeout(timeout);
    }, 300);
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps, closeFunction: () => void) => (
      <BackdropBlur {...props} onPress={closeFunction} tint='dark' />
    ),
    [handleCloseLogin]
  );

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.appNameContainer} edges={['top']}>
          <Text style={styles.appName}>{t('common:appname')}</Text>
        </SafeAreaView>
        <View style={{ height: windowWidth }}>
          <Image
            source={require('@/assets/images/login-splash.png')}
            style={{ width: windowWidth, height: windowWidth }}
          />
        </View>
        <View style={styles.content}>
          <Button color='secondary' onPress={handleOpenLogin}>
            {t('login:login')}
          </Button>
          <Button color='secondary' variant='link' onPress={handleOpenSignup}>
            {t('login:signup_subtitle')}{' '}
            <Text style={{ fontWeight: 'bold' }}>{t('login:signup')}</Text>
          </Button>
        </View>
        <BottomSheetModal
          ref={loginSheetRef}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={(props) => renderBackdrop(props, handleCloseLogin)}
        >
          <BottomSheetView style={styles.modalContent}>
            <View style={{ alignItems: 'center' }}>
              <Character1BubbleSvg height={180} width={180} />
              <Text style={styles.formTitle}>
                {t('login:forms.login.title')}
              </Text>
            </View>
            <View style={{ alignSelf: 'stretch', gap: theme.spacing(5) }}>
              <FormField
                label={t('login:forms.login.field_email')}
                keyboardType='email-address'
                autoCapitalize='none'
              />
              <FormField
                label={t('login:forms.login.field_password')}
                secureTextEntry
              />
              <Button color='tertiary'>{t('login:forms.login.button')}</Button>
            </View>
            <Divider text={t('login:forms.separator_label')} />
            <View style={{ flexDirection: 'row', gap: 30 }}>
              <SocialButton socialNetwork='facebook' />
              <SocialButton socialNetwork='google' />
              <SocialButton socialNetwork='apple' />
            </View>
            <View>
              <Button
                variant='link'
                styles={{ label: { color: theme.colors.grey[700] } }}
                onPress={handleSignUp}
              >
                {t('login:signup_subtitle')}{' '}
                <Text
                  style={{ fontWeight: 'bold', color: theme.colors.grey[900] }}
                >
                  {t('login:signup')}
                </Text>
              </Button>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
        <BottomSheetModal
          ref={signupSheetRef}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={(props) =>
            renderBackdrop(props, handleClosenSignup)
          }
        >
          <BottomSheetView style={styles.modalContent}>
            <View style={{ alignItems: 'center' }}>
              <Character2BubbleSvg height={180} width={180} />
              <Text
                style={[
                  styles.formTitle,
                  {
                    width: windowWidth * 0.6,
                    textAlign: 'center',
                    lineHeight: theme.spacing(10),
                  },
                ]}
              >
                {t('login:forms.signup.title')}
              </Text>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
