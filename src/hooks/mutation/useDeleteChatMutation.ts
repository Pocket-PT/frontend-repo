import { useMutation, useQueryClient } from 'react-query';
import { getServerInstance } from 'apis/instance';
import { messageKeys } from 'constants/querykey';

export default function useDeleteChatMutation(
  chattingRoomId: number,
  chattingMessageId: number,
) {
  const serverInstance = getServerInstance();
  const queryClient = useQueryClient();
  //   const { refetch } = useMessageInfiniteQuery(chattingRoomId);

  return useMutation(
    () => {
      return serverInstance.delete(
        `/api/v1/chatting/rooms/${chattingRoomId}/messages/${chattingMessageId}`,
      );
    },
    {
      onSuccess: () => {
        queryClient.cancelQueries(messageKeys.all);
        queryClient.refetchQueries(messageKeys.message(chattingRoomId));
        console.log('채팅 삭제 성공');
      },
      onError: (error) => {
        // mutation 이 에러가 났을 경우 error를 받을 수 있다.
        console.error('chatDeleteError : ', error);
      },
    },
  );
}
