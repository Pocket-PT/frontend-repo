import { AxiosError, AxiosResponse } from 'axios';
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { getServerInstance } from 'apis/instance';

interface AmountBodyData {
  trainerAccountId: number;
  subscriptionPeriod: number;
  paymentAmount: number;
  startDate: string;
}

interface MatchingResponseData {
  code: string;
  message: string;
  data: {
    ptMatchingId: number;
    trainerId: number;
    trainerName: string;
    traineeId: number;
    traineeName: string;
    startDate: string;
    subscriptionPeriod: number;
    paymentAmount: number;
    status: string;
  };
}

interface MatchingErrorData {
  code: string;
  message: string;
  errors: [];
}

export type PostMatchingRequestMutateReturnType = UseMutateFunction<
  AxiosResponse<MatchingResponseData>,
  AxiosError<MatchingErrorData>,
  AmountBodyData,
  unknown
>;

export type UsePostMatchingRequestMutationDataReturnType =
  | AxiosResponse<MatchingResponseData>
  | undefined;

export default function usePostMatchingRequestMutation(): UseMutationResult<
  AxiosResponse<MatchingResponseData>,
  AxiosError<MatchingErrorData>,
  AmountBodyData
> {
  const serverInstance = getServerInstance();
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      return serverInstance.post('/api/v1/matching', data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('trainerCode');
      },
      onError: (error) => {
        // mutation 이 에러가 났을 경우 error를 받을 수 있다.
        console.error('trainerCode: ', error);
        return Promise.resolve(error);
      },
    },
  );
}
