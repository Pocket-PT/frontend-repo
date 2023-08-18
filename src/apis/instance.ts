import axios from 'axios';
import useTokenStore from 'stores/token';

const mockInstance = axios.create({
  baseURL: 'https://6aa0968e-27a3-4d55-ade1-a51d88001e05.mock.pstmn.io',
  timeout: 3000,
  headers: {
    Authorization: '',
    'Content-Type': 'application/json',
  },
});

export const getMockInstance = () => {
  const { token } = useTokenStore();
  mockInstance.defaults.headers.Authorization = `Bearer ${token}`;
  return mockInstance;
};

const serverInstance = axios.create({
  baseURL: process.env.GATSBY_HOST_URL,
  timeout: 3000,
  headers: {
    Authorization: '',
    'Content-Type': 'application/json',
  },
});

export const getServerInstance = () => {
  const { token } = useTokenStore();
  serverInstance.defaults.headers.Authorization = `Bearer ${token}`;
  serverInstance.defaults.headers['Access-Control-Allow-Origin'] = '*';
  return serverInstance;
};
