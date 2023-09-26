/* eslint-disable react/prop-types */
import { ActivityComponentType, useActivity } from '@stackflow/react';
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
import { cls } from 'utils/cls';
import usePan from 'hooks/usePan';
import RightSideBar from 'components/RightSidebar';

type ChatRoomPageProps = {
  id: string;
};

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
  const accountId = chatRoomData?.accountId;
  const { data: userData } = result;
  const { messages: newMessageData, resetMessages } = useMessageStore();
  const { mutate } = usePostFile(+params.id);
  const [fileContainerOpen, setFileContainerOpen] = useState(false);
  const [isScrollTop, setIsScrollTop] = useState(false);
  const {
    isOpen: isRightSideBarOpen,
    setIsOpen: setisRightSideBarOpen,
    bindPanRight,
  } = usePan();
  const { pop } = usePushToPage();
  const scrollbarRef = useRef<Scrollbars>(null);
  const { client, publish } = useSocket(+params.id, chatRoomData?.accountId);
  const clientRef = useRef<unknown>(null);
  const sideBarRef = useRef<HTMLDivElement>(null);

  // console.log('params: ', params.id);
  // console.log('chatRoomData: ', chatRoomData);
  // console.log('userData: ', userData);
  // console.log('messageData: ', messageData);
  // console.log('newMessageData: ', newMessageData);

  useEffect(() => {
    if (newMessageData.length === 0) return;
    console.log('scrollToBottom 실행_1');
    scrollbarRef.current?.scrollToBottom();
  }, [newMessageData, fileContainerOpen]);

  useEffect(() => {
    if (!messageData.isLoading) return;
    console.log('isLoading, scrollToBottom 실행!_2');
    scrollbarRef.current?.scrollToBottom();
  }, [messageData.isLoading]);

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
      console.log('scrollToBottom 실행!_3');
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

  const handleRightSideBarOpen = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent,
  ) => {
    console.log('handleRightSideBarOpen');
    setisRightSideBarOpen(true);
    e.stopPropagation();
  };

  const handleRightSideBarClose = () => {
    console.log('handleRightSideBarClose');
    setisRightSideBarOpen(false);
  };

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

  const handleSideBarOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent,
  ) => {
    if (sideBarRef.current) {
      e.stopPropagation();
      console.log('handleSideBarOutsideClick');
      setisRightSideBarOpen(false);
    }
  };

  if (messageData.isError) {
    return <div>에러가 발생했습니다. 캐시된 데이터입니다</div>;
  }

  if (messageData.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="overflow-hidden max-w-[100vw] h-full relative">
      <RightSideBar
        isRightSideBarOpen={isRightSideBarOpen}
        handleRightSideBarClose={handleRightSideBarClose}
        bindPanRight={bindPanRight}
        ref={sideBarRef}
      >
        <RightSideBox />
      </RightSideBar>
      <div
        className="box-border relative w-full mx-auto overflow-hidden"
        onClick={(e) => handleSideBarOutsideClick(e)}
        onKeyDown={(e) => handleSideBarOutsideClick(e)}
        role="presentation"
      >
        <div className="flex flex-row items-center w-full h-16 px-5 bg-hoverGray">
          <button
            className="w-6 h-6"
            onClick={() => {
              pop();
            }}
          >
            <BackIcon />
          </button>
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
          <div
            className="absolute w-6 h-6 right-5"
            onClick={(e) => handleRightSideBarOpen(e)}
            onKeyDown={(e) => handleRightSideBarOpen(e)}
            role="presentation"
          >
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
        <div className="fixed bottom-0 w-full pb-1">
          <CreateMessage
            id={+params.id}
            accountId={accountId}
            postFile={postFile}
            publish={publish}
            fileContainerOpen={fileContainerOpen}
            setFileContainerOpen={setFileContainerOpen}
          />
        </div>
      </div>
    </div>
  );
};

type CreateMessageProps = {
  id: number;
  accountId: number | undefined;
  postFile: (file: FormData) => void;
  publish: (url: string, message: string) => void;
  fileContainerOpen: boolean;
  setFileContainerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateMessage = React.memo(function CreateMessage({
  id,
  publish,
  postFile,
  fileContainerOpen,
  setFileContainerOpen,
}: CreateMessageProps) {
  const [message, onChangeMessage, setMessage] = useInput('');
  const acitvity = useActivity();
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleSubmit } = useForm();
  const onValid = useCallback(() => {
    if (message.trim() === '') return;
    publish(`${PUB_URL}/${id}`, JSON.stringify({ content: message }));
    // console.log(
    //   'chatRoomPublish',
    //   `${PUB_CHATROOM_URL}/${id}/accounts/${accountId}/messages/${lastChattingMessageId}`,
    // );
    // chatRoomPublish(
    //   `${PUB_CHATROOM_URL}/${id}/accounts/${accountId}/messages/${lastChattingMessageId}`,
    //   JSON.stringify({ content: '' }),
    // );
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

  useEffect(() => {
    if (acitvity.transitionState === 'enter-done') inputRef.current?.focus();
  }, [acitvity.transitionState]);

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
          ref={inputRef}
        />
        <button
          type="submit"
          className={cls(
            'rounded-full absolute right-8 top-4 w-8 h-8 flex justify-center items-center',
            message.trim() === '' ? 'bg-[#EEEEEE]' : 'bg-mainBlue',
          )}
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

const RightSideBox = () => {
  return (
    <div className="box-border relative z-30 w-full h-full px-4 pt-6">
      <div>
        <div className="flex flex-row justify-between w-full">
          <div className="pt-[2px] text-base font-medium flex flex-row gap-2 items-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="-mt-1"
            >
              <path
                d="M13.3333 3.33333C14.0666 3.33333 14.6666 3.93333 14.6666 4.66667V12.6667C14.6666 13.4 14.0666 14 13.3333 14H2.66665C1.93331 14 1.33331 13.4 1.33331 12.6667V4.66667C1.33331 3.93333 1.93331 3.33333 2.66665 3.33333H4.77998L5.99998 2H9.99998L11.22 3.33333H13.3333ZM13.3333 12.6667V4.66667H2.66665V12.6667H13.3333ZM9.33331 8L7.33331 10.48L5.99998 8.66667L3.99998 11.3333H12L9.33331 8Z"
                fill="black"
              />
            </svg>
            사진, 동영상
          </div>
          <button className="w-6 h-6">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.73271 2.20694C6.03263 1.92125 6.50737 1.93279 6.79306 2.23271L11.7944 7.48318C12.0703 7.77285 12.0703 8.22809 11.7944 8.51776L6.79306 13.7682C6.50737 14.0681 6.03263 14.0797 5.73271 13.794C5.43279 13.5083 5.42125 13.0336 5.70694 12.7336L10.2155 8.00047L5.70694 3.26729C5.42125 2.96737 5.43279 2.49264 5.73271 2.20694Z"
                fill="#222222"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-row gap-2 mt-2">
          {[1, 2, 3, 4].map((v) => {
            return (
              <img
                key={v}
                src="https://via.placeholder.com/64x64"
                alt="img"
                className="w-[16vw] h-[16vw] rounded bg-gray"
              />
            );
          })}
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between w-full mt-8">
          <div className="pt-[2px] flex flex-row items-center gap-2 text-base font-medium">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="-mt-1"
            >
              <path
                d="M7.54118 3.94746C6.26949 2.67576 4.21213 2.66958 2.94594 3.93578C1.67975 5.20197 1.68593 7.25933 2.95762 8.53102L7.66511 13.2385C7.86038 13.4338 8.17696 13.4338 8.37222 13.2385L13.0553 8.55824C14.3185 7.28793 14.3145 5.23634 13.0426 3.96442C11.7686 2.69045 9.7103 2.68427 8.44184 3.95273L7.99458 4.40085L7.54118 3.94746Z"
                fill="#212121"
              />
            </svg>
            즐겨찾기
          </div>
          <button className="w-6 h-6">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.73271 2.20694C6.03263 1.92125 6.50737 1.93279 6.79306 2.23271L11.7944 7.48318C12.0703 7.77285 12.0703 8.22809 11.7944 8.51776L6.79306 13.7682C6.50737 14.0681 6.03263 14.0797 5.73271 13.794C5.43279 13.5083 5.42125 13.0336 5.70694 12.7336L10.2155 8.00047L5.70694 3.26729C5.42125 2.96737 5.43279 2.49264 5.73271 2.20694Z"
                fill="#222222"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatRoomPageWrapper);
