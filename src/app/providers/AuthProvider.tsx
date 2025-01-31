import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

import { fakeProfile } from 'src/shared/services/authService';
import { setToken } from 'src/features/authSlice';
import { setProfile } from 'src/features/profileSlice';
import { initializeApp } from 'src/features/appSlice';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAppInitialized } = useSelector((state: RootState) => state.app);
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAppInitialized) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        fakeProfile(token).then((data) => {
          if (data) {
            dispatch(setToken(data.token));
            dispatch(setProfile(data));
          }
        });
      }

      dispatch(initializeApp());
    }
  }, [dispatch, isAppInitialized, token]);

  return <>{children}</>;
};
