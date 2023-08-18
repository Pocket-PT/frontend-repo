import useHashLocation from 'hooks/useHashLocation';
import usePushToPage from 'hooks/usePushToPage';
import { useEffect } from 'react';
import useTokenStore from 'stores/token';

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
      replaceTo('Main');
    }
  }, [token]);

  return (
    <div>
      <h1>AfterLogin</h1>
    </div>
  );
};

export default AfterLogin;
