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
//import useMessageStore from 'stores/message';
import { AxiosResponse } from 'axios';
import { classifyUrl } from 'utils/classifyUrl';

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
  ref: React.RefObject<
    HTMLVideoElement | HTMLImageElement | HTMLAnchorElement | HTMLDivElement
  >;
}

const useMessageInfiniteQuery = (
  id: number,
): UseInfiniteQueryResult<IMessage> => {
  console.log('useInfiniteQuery');
  const serverInstance = getServerInstance();
  const queryClient = useQueryClient();
  const { replaceTo } = usePushToPage();
  //const { resetMessages } = useMessageStore();
  const result = useInfiniteQuery(
    messageKeys.message(id),
    ({ pageParam = 0 }) =>
      serverInstance.get(
        `/api/v1/chatting/rooms/${id}/messages?page=${pageParam}&size=20`,
      ),
    {
      staleTime: Infinity,
      onSettled: () => {
        queryClient.cancelQueries(messageKeys.message(id));
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
      getNextPageParam: (lastPage, allpage) => {
        const { data } = lastPage;
        if (data.data.hasNextPage) {
          console.log(
            'lastPage: ',
            lastPage,
            'allpage: ',
            allpage,
            data.data.hasNextPage,
            data.data.pageNum + 1,
          );
          return data.data.pageNum + 1;
        }
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
