import { useMutation, useQueryClient } from 'react-query';
import { getServerInstance } from 'apis/instance';
import { messageKeys } from 'constants/querykey';
import useMessageStore from 'stores/message';

export default function useDeleteChatBookmarkMutation(
  chattingRoomId: number,
  chattingMessageId: number,
) {
  const serverInstance = getServerInstance();
  const queryClient = useQueryClient();
  const { resetMessages } = useMessageStore();
  return useMutation(
    () => {
      return serverInstance.delete(
        `/api/v1/chatting/rooms/${chattingRoomId}/messages/${chattingMessageId}/bookmarks`,
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('myprofile');
        queryClient.refetchQueries(messageKeys.message(chattingRoomId));
        resetMessages();
      },
      onError: (error) => {
        // mutation 이 에러가 났을 경우 error를 받을 수 있다.
        resetMessages();
        console.error(error);
      },
    },
  );
}
