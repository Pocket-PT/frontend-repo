import { messageKeys } from 'constants/querykey';
import {
  InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
  useQueryClient,
} from 'react-query';
import { getServerInstance } from './instance';
import { useEffect } from 'react';
import usePushToPage from 'hooks/usePushToPage';
import { AxiosResponse } from 'axios';

export interface IChatRoomFileMessage {
  chattingMessageGetResponseList: MessageData[];
  pageSize: number;
  pageNum: number;
  totalRecord: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface MessageData {
  chattingRoomId: number;
  chattingAccountId: number;
  chattingAccountName: string;
  chattingAccountProfilePictureUrl: string;
  chattingMessageId: number;
  content: string | null;
  fileUrl: string | null;
  isEdited: boolean;
  notViewCount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const useChatRoomFileQuery = (
  chattingRoomId: number,
): UseInfiniteQueryResult<IChatRoomFileMessage> => {
  const serverInstance = getServerInstance();
  const queryClient = useQueryClient();
  const { replaceTo } = usePushToPage();
  const result = useInfiniteQuery(
    messageKeys.messageFiles(chattingRoomId),
    ({ pageParam = 0 }) =>
      serverInstance.get(
        `/api/v1/chatting/rooms/${chattingRoomId}/messages/files?page=${pageParam}&size=10`,
      ),
    {
      retry: 0,
      staleTime: 1000 * 60 * 60 * 24,
      onSettled: () => {
        queryClient.cancelQueries(messageKeys.messageFiles(chattingRoomId));
      },
      select: (
        data: InfiniteData<AxiosResponse<AxiosResponse<IChatRoomFileMessage>>>,
      ) => {
        return {
          pages: data.pages.reverse().map((page) => page.data.data),
          pageParams: data.pages.map((page) => page.data.data.pageNum),
        };
      },
      onError: (error) => {
        console.log('messageError', error);
        replaceTo('SignInPage', false);
      },
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.data?.hasNextPage) {
          return lastPage.data.data.pageNum + 1;
        }
        return undefined;
      },
    },
  );
  useEffect(() => {
    if (result.isError) {
      replaceTo('SignInPage', false);
    }
  }, [result.isError]);
  return result;
};

export default useChatRoomFileQuery;
