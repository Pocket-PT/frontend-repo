import { AxiosError } from 'axios';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { getServerInstance } from 'apis/instance';
import { messageKeys } from 'constants/querykey';
import useMessageInfiniteQuery from 'apis/useMessageInfiniteQuery';
//import useMessagesQuery from 'apis/useMessagesQuery';

export default function usePostFile(
  chattingRoomId: number,
): UseMutationResult<FormData, AxiosError, FormData> {
  const serverInstance = getServerInstance();
  serverInstance.defaults.headers['Content-Type'] = 'multipart/form-data';
  const queryClient = useQueryClient();
  const { refetch } = useMessageInfiniteQuery(chattingRoomId);
  return useMutation(
    (data) => {
      return serverInstance.post(
        `/api/v1/chatting/rooms/${chattingRoomId}/messages/files`,
        data,
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(messageKeys.messageFiles(chattingRoomId));
        queryClient.invalidateQueries(messageKeys.message(chattingRoomId));
        refetch();
      },
      onError: (error) => {
        // mutation 이 에러가 났을 경우 error를 받을 수 있다.
        console.error(error);
      },
    },
  );
}
