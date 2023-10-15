import { messageKeys } from 'constants/querykey';
import {
  InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
  useQueryClient,
} from 'react-query';
import { getServerInstance } from './instance';
import { createRef, useEffect } from 'react';
import usePushToPage from 'hooks/usePushToPage';
import { AxiosResponse } from 'axios';
import { classifyUrl } from 'utils/classifyUrl';

export interface IMessage {
  chattingMessageWithBookmarkGetResponses: MessageData[];
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
  ref: React.RefObject<
    HTMLVideoElement | HTMLImageElement | HTMLAnchorElement | HTMLDivElement
  >;
}

const useBookmarkInfiniteQuery = (
  chatRoomId: number,
): UseInfiniteQueryResult<IMessage> => {
  const serverInstance = getServerInstance();
  const queryClient = useQueryClient();
  const { replaceTo } = usePushToPage();
  const result = useInfiniteQuery(
    messageKeys.bookmark(chatRoomId),
    ({ pageParam = 0 }) =>
      serverInstance.get(
        `/api/v1/chatting/rooms/${chatRoomId}/bookmarks?page=${pageParam}&size=20`,
      ),
    {
      onSettled: () => {
        queryClient.cancelQueries(messageKeys.message(chatRoomId));
      },
      select: (data: InfiniteData<AxiosResponse<AxiosResponse<IMessage>>>) => {
        return {
          pages: data.pages
            .reverse()
            .map((page) => page.data.data)
            .map((item) => {
              return {
                ...item,
                chattingMessageWithBookmarkGetResponses:
                  item.chattingMessageWithBookmarkGetResponses
                    .sort((a, b) => a.chattingMessageId - b.chattingMessageId)
                    .map((value) => {
                      return {
                        ...value,
                        ref:
                          classifyUrl(value.fileUrl, value.content) === 'image'
                            ? createRef<HTMLImageElement>()
                            : classifyUrl(value.fileUrl, value.content) ===
                              'video'
                            ? createRef<HTMLVideoElement>()
                            : classifyUrl(value.fileUrl, value.content) ===
                              'file'
                            ? createRef<HTMLAnchorElement>()
                            : createRef<HTMLDivElement>(),
                      };
                    }),
              };
            }),
          pageParams: data.pages.map((page) => page.data.data.pageNum),
        };
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

export default useBookmarkInfiniteQuery;
