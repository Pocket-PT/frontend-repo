import { UseMutationResult, useMutation, useQueryClient } from 'react-query';
import { getServerInstance } from 'apis/instance';
import { AxiosError } from 'axios';

type PatchData = {
  rejectReason: string;
};

export default function usePatchPTManagementMutation(
  id: number,
  accept: boolean,
): UseMutationResult<PatchData, AxiosError, PatchData> {
  const serverInstance = getServerInstance();
  const queryClient = useQueryClient();

  return useMutation(
    (rejectReason) => {
      if (accept) {
        console.log('accept : ', accept);
        return serverInstance.patch(`/api/v1/matching/trainer/accept/${id}`);
      }
      console.log('reject : ', accept);
      return serverInstance.patch(
        `/api/v1/matching/trainer/reject/${id}`,
        rejectReason,
      );
    },
    {
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
