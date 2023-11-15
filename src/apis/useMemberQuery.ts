import { UseQueryOptions, useQuery } from 'react-query';
import { getServerInstance } from './instance';
import { IMyProfileKeys, myprofileKeys } from 'constants/querykey';
import { AxiosResponse } from 'axios';

export interface MemberData {
  ptMatchingId: number;
  status: string;
  subscriptionPeriod: number;
  paymentAmount: number;
  startDate: string;
  expiredDate: string;
  rejectReason: string;
  accountId: number;
  name: string;
  phoneNumber: string;
  email: string;
  profilePictureUrl: string;
}

interface IData {
  code: string;
  message: string;
  data: MemberData[];
}

type MemberReturnType<T extends () => unknown> = ReturnType<T>;
type MyProfileKeyReturnType = MemberReturnType<IMyProfileKeys['member']>;

const useMemeberQuery = <T = IData>(
  mode: string,
  options?: Omit<
    UseQueryOptions<AxiosResponse<IData>, unknown, T, MyProfileKeyReturnType>,
    'queryKey' | 'queryFn'
  >,
) => {
  const serverInstance = getServerInstance();
  const result = useQuery(
    myprofileKeys.member(),
    () => serverInstance.get(`/api/v1/matching?mode=${mode}`),
    {
      ...options,
      staleTime: Infinity,
      retry: 3,
    },
  );

  return result;
};

export default useMemeberQuery;
