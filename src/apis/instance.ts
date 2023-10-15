import axios from 'axios';
import useTokenStore from '../stores/token';
import { SERVER_URL } from 'constants/global';
import usePushToPage from 'hooks/usePushToPage';

const serverInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: Infinity,
  headers: {
    Authorization: '',
    'Content-Type': 'application/json',
  },
});

export const getServerInstance = () => {
  const { token } = useTokenStore();
  const { replaceTo } = usePushToPage();
  serverInstance.defaults.headers.Authorization = `Bearer ${token}`;
  serverInstance.defaults.headers['Access-Control-Allow-Origin'] = '*';
  serverInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        console.log('axios catch 401');
        replaceTo('SignInPage', false);
      }
    },
  );

  return serverInstance;
};
