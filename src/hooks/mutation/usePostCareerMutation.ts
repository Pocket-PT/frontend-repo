import { AxiosError } from 'axios';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { getServerInstance } from 'apis/instance';

type CareerData = {
  careerList: CareerListData[];
};

interface CareerListData {
  type: string;
  title: string;
  date: string;
}

export default function usePostCareerMutation(): UseMutationResult<
  CareerData,
  AxiosError,
  CareerData
> {
  const serverInstance = getServerInstance();
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      return serverInstance.post('/api/v1/account/trainer/career', data);
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
