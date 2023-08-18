import { messageKeys } from 'constants/querykey';
import {
  InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
  useQueryClient,
} from 'react-query';
import { getServerInstance } from './instance';
import { createRef, useEffect, useState } from 'react';
import usePushToPage from 'hooks/usePushToPage';
import useMessageStore from 'stores/message';
import { AxiosResponse } from 'axios';

export interface IMessage {
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
  isBookmarked: boolean;
  notViewCount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  ref: React.RefObject<HTMLVideoElement>;
}

const useMessageInfiniteQuery = (
  id: number,
): UseInfiniteQueryResult<IMessage> => {
  console.log('useInfiniteQuery');
  const serverInstance = getServerInstance();
  const queryClient = useQueryClient();
  const { replaceTo } = usePushToPage();
  const { resetMessages } = useMessageStore();
  const [page] = useState(0);
  const result = useInfiniteQuery(
    messageKeys.message(id),
    ({ pageParam = page }) =>
      serverInstance.get(
        `/api/v1/chatting/rooms/${id}/messages?page=${pageParam}`,
      ),
    {
      onSettled: () => {
        queryClient.cancelQueries(messageKeys.message(id));
      },
      onSuccess: () => {
        resetMessages();
      },
      select: (data: InfiniteData<AxiosResponse<AxiosResponse<IMessage>>>) => {
        return {
          pages: data.pages
            .reverse()
            .map((page) => page.data.data)
            .map((item) => {
              return {
                ...item,
                chattingMessageGetResponseList:
                  item.chattingMessageGetResponseList
                    .map((value) => {
                      return { ...value, ref: createRef<HTMLVideoElement>() };
                    })
                    .sort((a, b) => a.chattingMessageId - b.chattingMessageId),
              };
            }),
          pageParams: data.pages.map((page) => page.data.data.pageNum),
        };
      },
      getNextPageParam: (lastPage) => {
        const { data } = lastPage;
        if (!data.data.hasNextPage) return undefined;
        return data.data.pageNum + 1;
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

export default useMessageInfiniteQuery;
