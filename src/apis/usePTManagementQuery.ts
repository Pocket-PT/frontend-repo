import { UseQueryOptions, useQuery } from 'react-query';
import { getServerInstance } from './instance';
import { IMyProfileKeys, myprofileKeys } from 'constants/querykey';
import { AxiosResponse } from 'axios';

export interface IPTData {
  ptMatchingId: number;
  status: string;
  subscriptionPeriod: number;
  paymentAmount: number;
  expiredDate: string;
  accountId: number;
  name: string;
  phoneNumber: string;
  email: string;
  profilePictureUrl: string;
}

export interface IPTMangementData {
  code: string;
  message: string;
  data: IPTData[];
}

type PTManagementReturnType<T extends () => unknown> = ReturnType<T>;
type MyProfileKeyReturnType = PTManagementReturnType<
  IMyProfileKeys['ptManagement']
>;

const usePTManagementQuery = <T = IPTMangementData>(
  mode: string,
  options?: Omit<
    UseQueryOptions<
      AxiosResponse<IPTMangementData>,
      unknown,
      T,
      MyProfileKeyReturnType
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  const serverInstance = getServerInstance();
  const result = useQuery(
    myprofileKeys.ptManagement(),
    () => serverInstance.get(`/api/v1/matching?mode=${mode}`),
    {
      ...options,
      select: (response: AxiosResponse) => response.data,
      retry: 0,
    },
  );

  return result;
};

export default usePTManagementQuery;
