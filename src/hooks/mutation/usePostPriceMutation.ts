import { AxiosError } from 'axios';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { getServerInstance } from 'apis/instance';

interface PriceListData {
  period: number;
  price: number;
}

export default function usePostPriceMutation(): UseMutationResult<
  PriceListData,
  AxiosError,
  PriceListData
> {
  const serverInstance = getServerInstance();
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      return serverInstance.post('/api/v1/account/trainer/price', data);
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
