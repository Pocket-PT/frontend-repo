import { UseQueryOptions, useQuery } from 'react-query';
import { getServerInstance } from './instance';
import { IOtherProfileKeys, otherProfileKeys } from 'constants/querykey';
import { AxiosResponse } from 'axios';

type OtherProfileReturnType<T extends (id: number) => unknown> = ReturnType<T>;
type MyProfileKeyReturnType = OtherProfileReturnType<
  IOtherProfileKeys['otherProfile']
>;

interface IOtherProfileData {
  role: string;
  name: string;
  profilePictureUrl: string;
  introduce: string;
  purposeDtoList: {
    purposeId: number;
    title: string;
    content: string;
    targetDate: string;
    dday: number;
  }[];
  careerDtoList: {
    careerId: number;
    type: string;
    title: string;
    date: string;
  }[];
}

const useOtherProfileQuery = <T = IOtherProfileData>(
  accountId: number,
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
    otherProfileKeys.otherProfile(accountId),
    () => serverInstance.get(`/api/v1/account/profile/${accountId}`),
    {
      select: (response: AxiosResponse) => response.data.data,
      staleTime: 300000,
      ...options,
      retry: 0,
    },
  );

  return result;
};

export default useOtherProfileQuery;
