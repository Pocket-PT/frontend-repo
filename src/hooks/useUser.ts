import { useEffect } from 'react';
import useTokenStore from 'stores/token';
import usePushToPage from './usePushToPage';
import { useAccountQuery } from 'apis/useAccountQuery';

const useUser = () => {
  const { data, isError, isLoading, isSuccess } = useAccountQuery();
  const { token, setToken } = useTokenStore();
  const { replaceTo } = usePushToPage();

  console.log('user', data, 'token: ', token);
  useEffect(() => {
    if (!token && !isLoading) {
      console.log('isLoading', isLoading);
      replaceTo('SignInPage', false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError && !isLoading) {
      console.log('isError');
      setToken('');
      replaceTo('SignInPage', false);
    }
  }, [isError, isLoading]);

  return { data, isError, isLoading, isSuccess };
};

export default useUser;
