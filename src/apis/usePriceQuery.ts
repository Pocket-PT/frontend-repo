import { UseQueryOptions, useQuery } from 'react-query';
import { getServerInstance } from './instance';
import { IMyProfileKeys, myprofileKeys } from 'constants/querykey';
import { AxiosResponse } from 'axios';

type ChatRoomReturnType<T extends () => unknown> = ReturnType<T>;
type MyProfileKeyReturnType = ChatRoomReturnType<IMyProfileKeys['price']>;

const usePriceQuery = <T>(
  trainerCode?: string,
  options?: Omit<
    UseQueryOptions<
      AxiosResponse<AxiosResponse<T>>,
      unknown,
      T,
      MyProfileKeyReturnType
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  const serverInstance = getServerInstance();
  const result = useQuery(
    myprofileKeys.price(),
    () =>
      serverInstance.get(`/api/v1/account/price?trainerCode=${trainerCode}`),
    {
      ...options,
      retry: 0,
    },
  );
  console.log('useChatRoomQuery실행');

  return result;
};

export default usePriceQuery;
