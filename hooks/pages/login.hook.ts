import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject, useEffect, useMemo, useRef } from 'react';

export function useLogin() {
  const loginSheetRef = useRef<BottomSheetModal>(null);
  const signupSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['90%'], []);

  const handleToggleBottomSheet =
    (sheetRef: RefObject<BottomSheetModal>, action: 'dismiss' | 'present') =>
    () =>
      sheetRef.current?.[action]();

  const handleSignUp = () => {
    handleToggleBottomSheet(loginSheetRef, 'dismiss')();
    const timeout = setTimeout(() => {
      handleToggleBottomSheet(signupSheetRef, 'present')();
      clearTimeout(timeout);
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      handleToggleBottomSheet(signupSheetRef, 'present');
    }, 1000);
  }, []);

  return {
    loginSheetRef,
    signupSheetRef,
    snapPoints,
    handleToggleBottomSheet,
    handleSignUp,
  };
}
