import Cookies from 'js-cookie';

import { EnumTokens } from '@/services/auth.service';

export const checkAuth = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const currentUser = getCurrentUser();

  return !accessToken || !currentUser || !refreshToken;
};

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
  return accessToken || null;
};

export const getRefreshToken = () => {
  const refreshToken = Cookies.get(EnumTokens.REFRESH_TOKEN);
  return refreshToken || null;
};

export const getCurrentUser = () => {
  const currentUserJSON = Cookies.get(EnumTokens.CURRENT_USER);
  const currentUser = JSON.parse(currentUserJSON || '{}');
  return currentUser as User;
};

export const saveAccessTokenToStorage = (accessToken: string) => {
  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    localhost: 'localhost',
    sameSite: 'strict',
    expires: 1,
  });
};

export const saveCurrentUserToStorage = (user: User) => {
  Cookies.set('currentUser', JSON.stringify(user), {
    localhost: 'localhost',
    sameSite: 'strict',
    expires: 1,
  });
};

export const saveRefreshTokenToStorage = (refreshToken: string) => {
  Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, {
    localhost: 'localhost',
    sameSite: 'strict',
    expires: 7,
  });
};

export const removeAccessTokenFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN);
};

export const removeRefreshTokenFromStorage = () => {
  Cookies.remove(EnumTokens.REFRESH_TOKEN);
};

export const removeCurrentUserFromStorage = () => {
  Cookies.remove(EnumTokens.CURRENT_USER);
};
