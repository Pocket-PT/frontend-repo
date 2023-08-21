import { UseQueryOptions, useQuery } from 'react-query';
import { getServerInstance } from './instance';
import { IMyProfileKeys, myprofileKeys } from 'constants/querykey';
import { AxiosResponse } from 'axios';

export interface IChatRoomData {
  chattingRoomId: number;
  roomName: string;
  notViewCount: number;
  createdAt: string;
  chattingParticipantResponseList: [
    {
      accountId: number;
      accountNickName: string;
      accountProfilePictureUrl: string;
      isHost: boolean;
      isDeleted: boolean;
      createdAt: string;
    },
  ];
  latestChattingMessage: null;
  latestFileUrl: null;
  latestChattingMessageCreatedAt: null;
}

interface IData {
  code: string;
  message: string;
  data: IChatRoomData[];
}

type ChatRoomReturnType<T extends () => unknown> = ReturnType<T>;
type MyProfileKeyReturnType = ChatRoomReturnType<IMyProfileKeys['chatRoom']>;

const useChatRoomQuery = (
  options?: Omit<
    UseQueryOptions<AxiosResponse, unknown, IData, MyProfileKeyReturnType>,
    'queryKey' | 'queryFn'
  >,
) => {
  const serverInstance = getServerInstance();
  const result = useQuery(
    myprofileKeys.chatRoom(),
    () => serverInstance.get(`/api/v1/chatting/rooms/accounts`),
    {
      ...options,
      retry: 0,
    },
  );

  return result;
};

export default useChatRoomQuery;
