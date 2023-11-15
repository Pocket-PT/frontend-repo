import { AxiosError, AxiosResponse } from 'axios';
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { getServerInstance } from 'apis/instance';

interface AmountBodyData {
  subscriptionPeriod: number;
  monthlyPtPriceList: {
    monthlyPtPriceId: number;
    period: number;
    price: number;
  }[];
}

interface AmountResponseData {
  code: string;
  message: string;
  data: number;
}

export type UsePostMutationReturnType = UseMutateFunction<
  AxiosResponse<AmountResponseData>,
  AxiosError,
  AmountBodyData,
  unknown
>;

export type UsePostMutationDataReturnType =
  | AxiosResponse<AmountResponseData>
  | undefined;

export default function usePostAmountMutation(): UseMutationResult<
  AxiosResponse<AmountResponseData>,
  AxiosError,
  AmountBodyData
> {
  const serverInstance = getServerInstance();
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      return serverInstance.post('/api/v1/matching/payment/amount', data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('trainerCode');
      },
      onError: (error) => {
        // mutation 이 에러가 났을 경우 error를 받을 수 있다.
        console.error('trainerCode: ', error);
      },
    },
  );
}
