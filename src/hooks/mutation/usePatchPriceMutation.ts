import { UseMutationResult, useMutation, useQueryClient } from 'react-query';
import { getServerInstance } from 'apis/instance';
import { AxiosError, AxiosResponse } from 'axios';
import { myprofileKeys } from 'constants/querykey';

type PatchData = {
  period: number;
  price: number;
};

interface IPriceData {
  trainerAccountId: number;
  monthlyPtPriceList: {
    monthlyPtPriceId: number;
    period: number;
    price: number;
  }[];
}

interface PriceData {
  code: string;
  message: string;
  data: IPriceData;
}

export default function usePatchPriceMutation(
  id: number,
): UseMutationResult<PatchData, AxiosError, PatchData> {
  const serverInstance = getServerInstance();
  const queryClient = useQueryClient();

  return useMutation(
    (data) => {
      return serverInstance.patch(`/api/v1/account/trainer/price/${id}`, data);
    },
    {
      onMutate: async (data) => {
        // refetch 메서드가 사용되지 않도록 미리 막아둠.
        await queryClient.cancelQueries({ queryKey: myprofileKeys.all });

        const oldData = queryClient.getQueryData<AxiosResponse<PriceData>>(
          myprofileKeys.price(),
        );

        if (oldData) {
          queryClient.setQueryData<AxiosResponse<PriceData>>(
            myprofileKeys.price(),
            {
              ...oldData,
              data: {
                ...oldData.data,
                data: {
                  ...oldData.data.data,
                  monthlyPtPriceList: oldData.data.data.monthlyPtPriceList.map(
                    (price) => {
                      if (price.monthlyPtPriceId === id) {
                        return {
                          ...price,
                          period: data.period,
                          price: data.price,
                        };
                      }
                      return price;
                    },
                  ),
                },
              },
            },
          );
        }

        console.log('oldData ', oldData, data);

        return { oldData };
      },
      onSettled: () => {
        queryClient.invalidateQueries('myprofile');
      },
      onError: (error) => {
        // mutation 이 에러가 났을 경우 error를 받을 수 있다.
        console.error('pricePatchError : ', error);
      },
    },
  );
}
