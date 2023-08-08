import { UseQueryResult, useQuery } from 'react-query';
import { getServerInstance } from './instance';
import { AxiosResponse } from 'axios';

interface AccountData {
  accountId: number;
  role: string;
  provider: string;
  email: string;
  name: string;
  phoneNumber: string;
  nickname: string;
  profilePictureUrl: string;
  gender: null;
  birthdate: null;
}

//useAccountQuery 훅의 반환 타입을 정의
type AccountQueryResult = UseQueryResult<AxiosResponse<AccountData>, unknown>;

export const useAccountQuery = (): AccountQueryResult => {
  const serverInstance = getServerInstance();
  const result = useQuery(
    ['myprofile', 'account'],
    () => serverInstance.get('/api/v1/account/detail'),
    {
      select: (response: AxiosResponse) => response.data,
      staleTime: 1000 * 60 * 60 * 24,
      retry: 0,
    },
  );

  return result;
};
