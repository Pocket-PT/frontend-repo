import { AxiosError, AxiosResponse } from 'axios';
import {
  InfiniteData,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { getServerInstance } from 'apis/instance';
import { messageKeys } from 'constants/querykey';
import useMessageInfiniteQuery, {
  IMessage,
} from 'apis/useMessageInfiniteQuery';
import useMessageStore from '../../stores/message';
import useLoadingObj from 'hooks/useLoadingObj';

//import useMessagesQuery from 'apis/useMessagesQuery';

export default function usePostFileMutation(
  chattingRoomId: number,
  chattingAccountId: number | undefined,
): UseMutationResult<FormData, AxiosError, FormData> {
  const serverInstance = getServerInstance();
  serverInstance.defaults.headers['Content-Type'] = 'multipart/form-data';
  const queryClient = useQueryClient();
  const { setMessages } = useMessageStore();
  const { refetch } = useMessageInfiniteQuery(chattingRoomId);
  const { loadingMessage } = useLoadingObj(chattingAccountId);
  return useMutation(
    (data) => {
      return serverInstance.post(
        `/api/v1/chatting/rooms/${chattingRoomId}/messages/files`,
        data,
      );
    },
    {
      onMutate: async () => {
        //refetch 메서드가 사용되지 않도록 미리 막아둠.
        await queryClient.cancelQueries({
          queryKey: messageKeys.messageFiles(chattingRoomId),
        });
        await queryClient.cancelQueries({
          queryKey: messageKeys.message(chattingRoomId),
        });

        const oldData = queryClient.getQueryData<AxiosResponse<unknown>>(
          messageKeys.messageFiles(chattingRoomId),
        );
        const chatOldData = queryClient.getQueryData<
          InfiniteData<AxiosResponse<AxiosResponse<IMessage>>>
        >(messageKeys.message(chattingRoomId));
        console.log('filemutationChatOldData: ', chatOldData);
        console.log('filemutationoldData:', oldData);
        setMessages(loadingMessage);
        console.log('fileTest: ', chatOldData);
      },
      onSettled: () => {
        queryClient.invalidateQueries(messageKeys.messageFiles(chattingRoomId));
        queryClient.invalidateQueries(messageKeys.message(chattingRoomId));
        console.log('postfilemutation onSettled reset');
      },
      onSuccess: () => {
        console.log('postfilemutation onSuccess reset');
        refetch();
      },
      onError: (error) => {
        // mutation 이 에러가 났을 경우 error를 받을 수 있다.
        console.error(error);
      },
    },
  );
}
