import { UseMutationResult, useMutation, useQueryClient } from 'react-query';
import { getServerInstance } from 'apis/instance';
import { AxiosError, AxiosResponse } from 'axios';
import { myprofileKeys } from 'constants/querykey';
import { CareerData } from 'apis/useCareerQuery';

type PatchData = {
  title: string;
  date: string;
};

interface ICareerData {
  code: string;
  message: string;
  data: CareerData;
}

export default function usePatchCareerMutation(
  id: number,
): UseMutationResult<PatchData, AxiosError, PatchData> {
  const serverInstance = getServerInstance();
  const queryClient = useQueryClient();

  return useMutation(
    (data) => {
      return serverInstance.patch(`/api/v1/account/trainer/career/${id}`, data);
    },
    {
      onMutate: async (data) => {
        // refetch 메서드가 사용되지 않도록 미리 막아둠.
        await queryClient.cancelQueries({ queryKey: myprofileKeys.all });

        const oldData = queryClient.getQueryData<AxiosResponse<ICareerData>>(
          myprofileKeys.career(),
        );
        console.log('oldData ', oldData, data);
        if (oldData) {
          queryClient.setQueryData<AxiosResponse<ICareerData>>(
            myprofileKeys.career(),
            {
              ...oldData,
              data: {
                ...oldData.data,
                data: {
                  ...oldData.data.data,
                  careerList: oldData.data.data.careerList.map((career) => {
                    if (career.careerId === id) {
                      return {
                        ...career,
                        title: data.title,
                        date: data.date,
                      };
                    }
                    return career;
                  }),
                },
              },
            },
          );
        }

        return { oldData };
      },
      onSettled: () => {
        queryClient.invalidateQueries('myprofile');
      },
      onError: (error) => {
        // mutation 이 에러가 났을 경우 error를 받을 수 있다.
        console.error('careerPatchError : ', error);
      },
    },
  );
}
