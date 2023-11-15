import { UseQueryOptions, useQuery } from 'react-query';
import { getServerInstance } from './instance';
import { ITrainerCodeKeys, trainerCodeKeys } from 'constants/querykey';
import { AxiosError, AxiosResponse } from 'axios';

interface TrainerData {
  trainerAccountId: number;
  monthlyPtPriceList: {
    monthlyPtPriceId: number;
    period: number;
    price: number;
  }[];
}

export interface ITrainerCodeData {
  code: string;
  message: string;
  data: TrainerData;
}

export interface ITrainerErrorData {
  code: string;
  message: string;
  errors: [];
}

type TrainerCodeReturnType<T extends (code: string) => unknown> = ReturnType<T>;
type TrainerCodeKeyReturnType = TrainerCodeReturnType<
  ITrainerCodeKeys['trainerCode']
>;

const useTrainerCodeQuery = <T = ITrainerCodeData>(
  trainerCode: string,
  options?: Omit<
    UseQueryOptions<
      AxiosResponse<ITrainerCodeData>,
      AxiosError<ITrainerErrorData>,
      T,
      TrainerCodeKeyReturnType
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  const serverInstance = getServerInstance();
  const result = useQuery(
    trainerCodeKeys.trainerCode(trainerCode),
    () =>
      serverInstance.get(`/api/v1/account/price?trainerCode=${trainerCode}`),
    {
      ...options,
      select: (response: AxiosResponse) => response.data,
      staleTime: 0,
      retry: 0,
    },
  );

  return result;
};

export default useTrainerCodeQuery;
