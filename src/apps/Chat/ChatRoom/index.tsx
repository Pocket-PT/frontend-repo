/* eslint-disable react/prop-types */
import { ActivityComponentType } from '@stackflow/react';
import { PUB_URL } from 'constants/global';
import useInput from 'hooks/useInput';
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSocket from 'hooks/useSocket';
import React from 'react';
import useMessageStore from 'stores/message';
import ArrowUpIcon from 'icons/ArrowUpIcon';
import MyDropzone from 'components/MyDropzone';
import ImageIcon from 'icons/ImageIcon';
import usePostFile from 'hooks/usePostFile';
import BackIcon from 'icons/BackIcon';
import MenuIcon from 'icons/MenuIcon';
import useMessageInfiniteQuery from 'apis/useMessageInfiniteQuery';
import ChatList from 'components/ChatList';
import usePushToPage from 'hooks/usePushToPage';
import LoadingSpinner from 'components/common/LoadingSpinner';
import Scrollbars, { positionValues } from 'react-custom-scrollbars-2';
import useChatRoomQuery from 'apis/useChatRoomQuery';
import MyLayout from 'components/MyLayout';
import { AccountQueryResult } from 'apis/useAccountQuery';

type ChatRoomPageProps = {
  id: string;
};

type CreateMessageProps = {
  postFile: (file: FormData) => void;
  publish: (url: string, message: string) => void;
  fileContainerOpen: boolean;
  setFileContainerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateMessage = React.memo(function CreateMessage({
  publish,
  postFile,
  fileContainerOpen,
  setFileContainerOpen,
}: CreateMessageProps) {
  const [message, onChangeMessage, setMessage] = useInput('');
  const { handleSubmit } = useForm();
  const onValid = useCallback(() => {
    if (message.trim() === '') return;
    publish(`${PUB_URL}/1`, JSON.stringify({ content: message }));
    setMessage('');
  }, [message]);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setFileContainerOpen(!fileContainerOpen);
    },
    [fileContainerOpen],
  );

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!e.nativeEvent.isComposing && e.key === 'Enter') {
      if (message.trim() === '') return;
      e.preventDefault();
      handleSubmit(onValid)();
    }
  };

  return (
    <div className="w-full pt-2 bg-white">
      <form
        className="flex flex-row w-full h-auto"
        onSubmit={handleSubmit(onValid)}
        name="message"
      >
        <button
          onClick={onClick}
          className="flex items-center justify-center w-12 h-12 text-white rounded-full bg-[#FAFAFA]"
        >
          <div className="w-6 h-6 text-gray">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.8834 3.00673L12 3C12.5128 3 12.9355 3.38604 12.9933 3.88338L13 4V11H20C20.5128 11 20.9355 11.386 20.9933 11.8834L21 12C21 12.5128 20.614 12.9355 20.1166 12.9933L20 13H13V20C13 20.5128 12.614 20.9355 12.1166 20.9933L12 21C11.4872 21 11.0645 20.614 11.0067 20.1166L11 20V13H4C3.48716 13 3.06449 12.614 3.00673 12.1166L3 12C3 11.4872 3.38604 11.0645 3.88338 11.0067L4 11H11V4C11 3.48716 11.386 3.06449 11.8834 3.00673L12 3L11.8834 3.00673Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </button>
        <input
          type="text"
          className="w-[80%] h-12 ml-3 bg-hoverGray rounded-[30px] pl-4"
          value={message}
          onChange={onChangeMessage}
          onKeyDown={handleKeyPress}
          placeholder="채팅 입력"
        />
        <button
          type="submit"
          className="rounded-full absolute right-8 top-4 w-8 h-8 bg-[#EEEEEE] flex justify-center items-center"
        >
          <div className="text-white">
            <ArrowUpIcon />
          </div>
        </button>
      </form>
      {fileContainerOpen && (
        <div className="box-border w-full p-3 bg-white h-44">
          <MyDropzone postFile={postFile}>
            <div className="w-14 h-14">
              <div className="flex items-center justify-center w-full h-full pl-px text-white rounded-full bg-mainBlue">
                <ImageIcon />
              </div>
              <div className="mt-1 text-sm text-center">앨범</div>
            </div>
          </MyDropzone>
        </div>
      )}
    </div>
  );
});

const ChatRoomPageWrapper: ActivityComponentType<ChatRoomPageProps> = ({
  params,
}) => {
  return (
    <MyLayout hasFooter={false}>
      <ChatRoomPage params={params} />
    </MyLayout>
  );
};

type Props = {
  params: { id: string };
  result: AccountQueryResult;
};

type ChatRoomSelectedDataProps = {
  accountId: number;
  accountNickName: string;
  accountProfilePictureUrl: string;
  isHost: boolean;
  isDeleted: boolean;
  createdAt: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChatRoomPage: React.FC<any> = ({ params, result }: Props) => {
  const messageData = useMessageInfiniteQuery(+params.id);
  const { data: chatRoomData } = useChatRoomQuery<ChatRoomSelectedDataProps>({
    select: (res) => {
      return res.data.data.filter(
        (item) => item.chattingRoomId === +params.id,
      )[0].chattingParticipantResponseList[0];
    },
  });

  const { data: userData } = result;
  const { messages: newMessageData, resetMessages } = useMessageStore();
  const { mutate } = usePostFile(+params.id);
  const [fileContainerOpen, setFileContainerOpen] = useState(false);
  const [isScrollTop, setIsScrollTop] = useState(false);
  const { pop } = usePushToPage();
  const scrollbarRef = useRef<Scrollbars>(null);
  const { client, publish } = useSocket();
  const clientRef = useRef<unknown>(null);

  useEffect(() => {
    console.log('scrollToBottom 실행!');
    scrollbarRef.current?.scrollToBottom();
  }, [newMessageData, fileContainerOpen]);

  //로드 시 스크롤바 유지
  useEffect(() => {
    if (
      !messageData.data?.pageParams ||
      messageData.data?.pageParams.length <= 1
    )
      return;
    const id =
      messageData.data?.pages[1].chattingMessageGetResponseList[0]
        .chattingMessageId;

    const element = document.getElementById(`${id}`);
    if (element) {
      console.log(
        '로드 시 스크롤바 유지: ',
        element,
        messageData.data.pageParams,
      );
      scrollbarRef.current?.scrollTop(
        element?.getBoundingClientRect().y - element?.scrollHeight - 16,
      );
    }
  }, [messageData.data?.pageParams]);

  useEffect(() => {
    // 웹소켓 연결이 없는 경우에만 새로운 웹소켓을 생성하고 연결합니다.
    if (!clientRef.current) {
      console.log('create new websocket');
      client?.activate();
      clientRef.current = client;
      messageData.refetch();
      scrollbarRef.current?.scrollToBottom();
    }

    //컴포넌트가 언마운트되면 웹소켓 연결을 종료합니다.
    return () => {
      if (clientRef.current) {
        client?.deactivate();
        resetMessages();
      }
    };
  }, [publish]);
  console.log('ChatRoom hasNextPage: ', messageData.hasNextPage);
  console.log('ChatRoom isLoading: ', messageData.isLoading);

  const postFile = useCallback((file: FormData) => {
    mutate(file);
  }, []);

  const onScroll = useCallback(
    (values: positionValues) => {
      if (values.scrollTop === 0 && messageData.hasNextPage) {
        console.log('가장 위', messageData);
        messageData.fetchNextPage();
        setIsScrollTop(true);
      }
    },
    [scrollbarRef, messageData.hasNextPage, messageData.fetchNextPage],
  );

  if (messageData.isError) {
    return <div>에러가 발생했습니다. 캐시된 데이터입니다</div>;
  }

  if (messageData.isLoading) {
    return (
      <MyLayout>
        <LoadingSpinner />
      </MyLayout>
    );
  }

  return (
    <div className="box-border w-full mx-auto overflow-hidden">
      <div className="flex flex-row items-center w-full h-16 px-5 bg-hoverGray">
        <div
          className="w-6 h-6"
          onClick={() => pop()}
          onKeyDown={() => pop()}
          role="presentation"
        >
          <BackIcon />
        </div>
        <img
          className="ml-5 rounded-full w-11 h-11"
          src={chatRoomData?.accountProfilePictureUrl}
          alt="#"
        />
        <div className="ml-3 space-y-1">
          <div className="text-base font-bold leading-tight">
            {chatRoomData?.accountNickName}
          </div>
        </div>
        <div className="absolute w-6 h-6 text-gray text-opacity-40 right-5">
          <MenuIcon />
        </div>
      </div>
      <Scrollbars
        style={{ backgroundColor: '#FAFAFA' }}
        autoHide
        onScrollFrame={onScroll}
        autoHeight
        autoHeightMin={
          fileContainerOpen
            ? `calc(100vh - ${52}px - 176px - 16px - 64px)`
            : `calc(100vh - ${52}px - 16px - 64px)`
        }
        ref={scrollbarRef}
      >
        <ChatList
          scrollbarRef={scrollbarRef}
          isScrollTop={isScrollTop}
          userData={userData}
          messageData={messageData}
          postFile={postFile}
          fileContainerOpen={fileContainerOpen}
        />
      </Scrollbars>
      <div className="fixed bottom-0 w-full transition-all">
        <CreateMessage
          postFile={postFile}
          publish={publish}
          fileContainerOpen={fileContainerOpen}
          setFileContainerOpen={setFileContainerOpen}
        />
      </div>
    </div>
  );
};

export default React.memo(ChatRoomPageWrapper);
