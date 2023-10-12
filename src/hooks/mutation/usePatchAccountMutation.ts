import { AxiosError } from 'axios';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { getServerInstance } from 'apis/instance';

type TrainerData = {
  name: string;
  phoneNumber: string;
  monthlyPtPriceList: {
    period: number;
    price: number;
  }[];
};

export default function usePatchAccountMutation(): UseMutationResult<
  TrainerData,
  AxiosError,
  TrainerData
> {
  const serverInstance = getServerInstance();
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      return serverInstance.patch('/api/v1/account/trainer', data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('myprofile');
      },
      onError: (error) => {
        // mutation 이 에러가 났을 경우 error를 받을 수 있다.
        console.error(error);
      },
    },
  );
}
