import { useQuery, UseQueryOptions } from 'react-query';
import { getServerInstance } from './instance';
import { AxiosResponse } from 'axios';

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
}

const useMessagesQuery = (
  id: number,
  options?: Omit<
    UseQueryOptions<
      AxiosResponse,
      unknown,
      AxiosResponse<IMessage>,
      (string | number)[]
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  const serverInstance = getServerInstance();
  const result = useQuery(
    ['messages', id],
    () => serverInstance.get(`/api/v1/chatting/rooms/${id}/messages?size=100`),
    {
      select: (response) => response.data,
      staleTime: 1000 * 60 * 60 * 24,
      ...options,
    },
  );
  console.log(result);
  return result;
};

export default useMessagesQuery;
