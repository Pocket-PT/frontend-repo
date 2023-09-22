import { useMutation, useQueryClient } from 'react-query';
import { getServerInstance } from 'apis/instance';

export default function useDeleteCareerMutation(id: number) {
  const serverInstance = getServerInstance();
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      return serverInstance.delete(`/api/v1/account/trainer/career/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('myprofile');
      },
      onError: (error) => {
        // mutation 이 에러가 났을 경우 error를 받을 수 있다.
        console.error('careerDeleteError : ', error);
      },
    },
  );
}
