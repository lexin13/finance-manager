import React, { ReactNode, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { setToken, signOut } from 'src/features/auth/authSlice';
import { initializeApp } from 'src/app/slices/appSlice';
import { tokenStorage } from 'src/shared/storage/tokenStorage';
import { useGetProfile } from 'src/features/profile/updateProfile/hooks/useGetProfile';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAppInitialized } = useSelector((state: RootState) => state.app);
  const { token } = useSelector((state: RootState) => state.auth);
  const { getProfile } = useGetProfile();

  const logout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  useEffect(() => {
    if (!isAppInitialized) {
      if (token) {
        getProfile().catch(() => logout());
      }

      dispatch(initializeApp());
    }
  }, [dispatch, logout, isAppInitialized, token]);

  useEffect(() => {
    const handleStorageChange = (newValue: string) => {
      if (newValue) {
        getProfile()
          .then(() => dispatch(setToken(newValue)))
          .catch(() => logout());
      } else {
        logout();
      }
    };

    tokenStorage.subscribe(handleStorageChange);

    return () => {
      tokenStorage.unsubscribe(handleStorageChange);
    };
  }, [logout, dispatch]);

  return <>{children}</>;
};
