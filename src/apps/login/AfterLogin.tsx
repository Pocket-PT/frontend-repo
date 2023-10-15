import { useEffect } from 'react';
import useHashLocation from 'hooks/useHashLocation';
import usePushToPage from 'hooks/usePushToPage';
import useTokenStore from '../../stores/token';
import LoadingSpinner from 'components/common/LoadingSpinner';

const AfterLogin = () => {
  const { token, setToken } = useTokenStore();
  const { params } = useHashLocation();
  const { replaceTo } = usePushToPage();

  useEffect(() => {
    if (!token) {
      console.log('setToken실행', params.accessToken);
      setToken(params.accessToken ?? '');
    }
    if (token) {
      replaceTo('CheckSignup');
    }
  }, [token]);

  return (
    <div>
      <LoadingSpinner />
    </div>
  );
};

export default AfterLogin;
