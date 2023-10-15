import { AxiosError } from 'axios';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { getServerInstance } from 'apis/instance';
import { myprofileKeys } from 'constants/querykey';
import useQueryLoadingStore from 'stores/queryLoading';

export default function usePatchAccountMutation<T>(
  role: 'trainer' | 'trainee',
): UseMutationResult<T, AxiosError, T> {
  const serverInstance = getServerInstance();
  const queryClient = useQueryClient();
  const { setSignUpLoading } = useQueryLoadingStore();
  return useMutation(
    (data) => {
      return serverInstance.patch(`/api/v1/account/signup/${role}`, data);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(myprofileKeys.all);
        setSignUpLoading(true);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(myprofileKeys.all);
        setSignUpLoading(false);
      },
      onError: (error) => {
        // mutation 이 에러가 났을 경우 error를 받을 수 있다.
        console.error(error);
      },
    },
  );
}
