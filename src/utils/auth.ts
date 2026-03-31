import { LocalSessionKeys } from './localSessionKeys';

export const getAccessToken = () => localStorage.getItem(LocalSessionKeys.ACCESS_TOKEN);
export const getRefreshToken = () => localStorage.getItem(LocalSessionKeys.REFRESH_TOKEN);

export const setTokens = (access: string, refresh: string) => {
  localStorage.setItem(LocalSessionKeys.ACCESS_TOKEN, access);
  localStorage.setItem(LocalSessionKeys.REFRESH_TOKEN, refresh);
};

export const clearTokens = () => {
  localStorage.removeItem(LocalSessionKeys.ACCESS_TOKEN);
  localStorage.removeItem(LocalSessionKeys.REFRESH_TOKEN);
};
