import useTokenStore from 'stores/token';

export const isBrowser = () => typeof window !== 'undefined';

export const isLoggedIn = () => {
  const { token } = useTokenStore();

  return !!token;
};

export const logout = (callback) => {
  const { setToken } = useTokenStore();
  setToken('');
  callback();
};
