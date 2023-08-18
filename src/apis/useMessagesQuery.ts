import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { getServerInstance } from './instance';
import { AxiosResponse } from 'axios';
import { createRef, useEffect } from 'react';
import usePushToPage from 'hooks/usePushToPage';
import { IMessageKeys, messageKeys } from 'constants/querykey';
import useMessageStore from 'stores/message';

interface IMessage {
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

type MessageReturnType<T extends (id: number) => unknown> = ReturnType<T>;
type MessageKeyReturnType = MessageReturnType<IMessageKeys['message']>;

const useMessagesQuery = (
  id: number,
  options?: Omit<
    UseQueryOptions<
      AxiosResponse,
      unknown,
      AxiosResponse<IMessage>,
      MessageKeyReturnType
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  console.log('useMessagesQuery');
  const serverInstance = getServerInstance();
  const { replaceTo } = usePushToPage();
  const { resetMessages } = useMessageStore();
  const queryClient = useQueryClient();

  const result = useQuery(
    messageKeys.message(id),
    () => serverInstance.get(`/api/v1/chatting/rooms/${id}/messages?size=100`),
    {
      onSettled: () => {
        queryClient.cancelQueries(messageKeys.message(id));
      },
      select: (response) => {
        return {
          ...response.data,
          data: {
            ...response.data.data,
            chattingMessageGetResponseList:
              response.data.data.chattingMessageGetResponseList.map(
                (item: MessageData) => {
                  return {
                    ...item,
                    ref: createRef<HTMLVideoElement>(),
                    // fileUrl: item.fileUrl?.replace(
                    //   'https://pocket-pt.s3.ap-northeast-2.amazonaws.com',
                    //   'https://d17o7gmb1q6fmh.cloudfront.net',
                    // ),
                  };
                },
              ),
          },
        };
      },

      //   staleTime: 1000 * 60 * 60 * 24,
      ...options,
      onSuccess: () => {
        resetMessages();
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

export default useMessagesQuery;
