import React from 'react';
import { NavLink } from 'react-router-dom';
import { SignOutButton } from 'src/features/auth/signOut/ui/SignOutButton';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';

import style from './navigation.module.scss';
import { DarkThemeButton } from 'src/features/theme/changeTheme/DarkThemeButton/DarkThemeButton';
import { LightThemeButton } from 'src/features/theme/changeTheme/LightThemeButton/LightThemeButton';

export const getNavLinkStyle = ({ isActive }: { isActive: boolean }) => {
  return {
    fontWeight: isActive ? 'bold' : 'normal',
  };
};

export const Navigation = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = !!token;

  return (
    <div className={style.gap}>
      <div className={style['inner-block']}>
        {isAuthenticated ? (
          <>
            <NavLink to={'/operations'} className={style['nav-btn']} style={getNavLinkStyle}>
              Operations
            </NavLink>
            <NavLink to={'/categories'} className={style['nav-btn']} style={getNavLinkStyle}>
              Categories
            </NavLink>
            <NavLink to={'/profile'} className={style['nav-btn']} style={getNavLinkStyle}>
              Profile
            </NavLink>
            <SignOutButton className={style['nav-btn']} />
          </>
        ) : (
          <>
            <NavLink to={'/'} className={style['nav-btn']} style={getNavLinkStyle} end>
              Home
            </NavLink>
            <NavLink to={'/signin'} className={style['nav-btn']} style={getNavLinkStyle}>
              Sign In
            </NavLink>
            <NavLink to={'/signup'} className={style['nav-btn']} style={getNavLinkStyle}>
              Sign Up
            </NavLink>
          </>
        )}
      </div>
      <div className={style['inner-block']}>
        <DarkThemeButton className={style['nav-btn']} />
        <LightThemeButton className={style['nav-btn']} />
      </div>
    </div>
  );
};
