import { useEffect } from 'react';
import useTokenStore from '../stores/token';
import usePushToPage from './usePushToPage';
import { useCheckSignupQuery } from 'apis/useCheckSignupQuery';

const useUser = () => {
  const { data, isLoading, isError, isSuccess } = useCheckSignupQuery();
  const { token } = useTokenStore();
  const { replaceTo } = usePushToPage();

  console.log('useUser 실행!');
  useEffect(() => {
    if (!token && !isLoading) {
      console.log('isLoading', isLoading);
      replaceTo('SignInPage', false);
    }
    if (!data?.data.isAccountSignedUp && !isLoading) {
      console.log('2차 회원가입 안됨');
      replaceTo('BeforeLogin', false);
    }
  }, [data?.data.isAccountSignedUp, isLoading]);

  return { data, isError, isLoading, isSuccess };
};

export default useUser;
