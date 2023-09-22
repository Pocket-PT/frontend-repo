import { UseQueryResult, useQuery } from 'react-query';
import { getServerInstance } from './instance';
import { AxiosResponse } from 'axios';
import { myprofileKeys } from 'constants/querykey';

export interface CareerListData {
  careerId: number;
  type: string;
  title: string;
  date: string;
}

export interface CareerData {
  trainerAccountId: number;
  careerList: CareerListData[];
}

//useAccountQuery 훅의 반환 타입을 정의
export type CareerQueryResult = UseQueryResult<
  AxiosResponse<CareerData>,
  unknown
>;

export const useCareerQuery = (id: number | undefined): CareerQueryResult => {
  const serverInstance = getServerInstance();
  const result = useQuery(
    myprofileKeys.career(),
    () => serverInstance.get(`/api/v1/account/trainer/career/${id}`),
    {
      select: (response: AxiosResponse) => response.data,
      staleTime: 300000,
      retry: 0,
    },
  );

  return result;
};
