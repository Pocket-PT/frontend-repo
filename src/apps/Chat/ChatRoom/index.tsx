/* eslint-disable react/prop-types */
import { ActivityComponentType, useActivity } from '@stackflow/react';
import { PUB_URL } from 'constants/global';
import useInput from 'hooks/useInput';
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSocket from 'hooks/useSocket';
import React from 'react';
import useMessageStore, { INewMessage } from '../../../stores/message';
import ArrowUpIcon from 'icons/ArrowUpIcon';
import MyDropzone from 'components/MyDropzone';
import ImageIcon from 'icons/ImageIcon';
import usePostFileMutation from 'hooks/mutation/usePostFileMutation';
import BackIcon from 'icons/BackIcon';
import MenuIcon from 'icons/MenuIcon';
import useMessageInfiniteQuery from 'apis/useMessageInfiniteQuery';
import ChatList from 'components/ChatList';
import usePushToPage from 'hooks/usePushToPage';
import LoadingSpinner from 'components/common/LoadingSpinner';
import Scrollbars, { positionValues } from 'react-custom-scrollbars-2';
import useChatRoomQuery from 'apis/useChatRoomQuery';
import MyLayout from 'components/MyLayout';
import { useAccountQuery } from 'apis/useAccountQuery';
import { cls } from 'utils/cls';
import usePan from 'hooks/usePan';
import RightSideBar from 'components/RightSidebar';
import BottomModal from 'components/common/BottomModal';
import useChatRoomModalStore from '../../../stores/firstRender';
import useDeleteChatMutation from 'hooks/mutation/useDeleteChatMutation';
import usePostChatBookmarkMutation from 'hooks/mutation/usePostChatBookmarkMutation';
import useDeleteChatBookmarkMutation from 'hooks/mutation/useDeleteChatBookmarkMutation';
import ChatRoomRightSideBox from 'components/ChatRoomRightSideBox';
import useMyActivity from 'hooks/useMyActivity';
import { useQueryClient } from 'react-query';
import { messageKeys } from 'constants/querykey';
import { useStepFlow } from 'libs/stackflow';
import truncateString from 'utils/truncateString';
import useChatRoomFileQuery from 'apis/useChatRoomFileQuery';

export type ChatRoomPageProps = {
  title?: string;
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
  params: ChatRoomPageProps;
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
const ChatRoomPage: React.FC<any> = ({ params }: Props) => {
  const scrollDownref = useRef<HTMLDivElement>(null);
  const chattingRoomId = +params.id;
  const queryClient = useQueryClient();
  const messageData = useMessageInfiniteQuery(chattingRoomId);
  const { data: fileData } = useChatRoomFileQuery(chattingRoomId);
  const { stepPush, stepReplace } = useStepFlow('ChatRoomPage');
  const { data: chatRoomData } = useChatRoomQuery<ChatRoomSelectedDataProps>({
    select: (res) => {
      return res.data.data.filter(
        (item) => item.chattingRoomId === chattingRoomId,
      )[0].chattingParticipantResponseList[0];
    },
  });
  const { data: userData } = useAccountQuery();
  const accountId = userData?.data.accountId;
  const chattingTitleRef = useRef<HTMLDivElement>(null);
  const createMessageRef = useRef<HTMLDivElement>(null);
  const [refHeights, setRefHeights] = useState<number[]>([]);
  const [isRefLoading, setIsRefLoading] = useState<boolean>(true);
  const {
    messages: newMessageData,
    resetMessages,
    setNextMessageId,
    modalfileUrl,
  } = useMessageStore();
  const { mutate } = usePostFileMutation(+params.id, accountId);
  const [fileContainerOpen, setFileContainerOpen] = useState(false);
  const [isScrollTop, setIsScrollTop] = useState(false);
  const [isNewMessageArrived, setIsNewMessageArrived] = useState(false);
  const {
    isOpen: isRightSideBarOpen,
    setIsOpen: setisRightSideBarOpen,
    bindPanRight,
  } = usePan();
  const { pop } = usePushToPage();
  const scrollbarRef = useRef<Scrollbars>(null);
  const { client, publish } = useSocket(
    chattingRoomId,
    chatRoomData?.accountId,
  );
  const clientRef = useRef<unknown>(null);
  const sideBarRef = useRef<HTMLDivElement>(null);
  const {
    isOpen: isBottomModalOpen,
    setIsOpen: setIsBottomModalOpen,
    bindPanDown,
  } = usePan();
  const { activity } = useMyActivity();
  const { chattingMessageId } = useChatRoomModalStore();
  const { mutate: bookmarkMutate } = usePostChatBookmarkMutation(
    chattingRoomId,
    chattingMessageId,
  );
  const { mutate: deleteBookmarkMutate } = useDeleteChatBookmarkMutation(
    chattingRoomId,
    chattingMessageId,
  );
  const { mutate: deleteMutate } = useDeleteChatMutation(
    chattingRoomId,
    chattingMessageId,
  );

  const onPressFn = () => {
    setIsBottomModalOpen(true);
    console.log("i'm pressed");
    const isDeletedMessage =
      messageData.data?.pages[0].chattingMessageWithBookmarkGetResponses.find(
        (item) => item.chattingMessageId === chattingMessageId,
      )?.isDeleted;
    console.log('isDeletedMessage', chattingMessageId, isDeletedMessage);
  };
  // console.log('params: ', params.id);
  // console.log('chatRoomData: ', chatRoomData);
  // console.log('userData: ', userData);
  console.log('messageData: ', messageData);
  // console.log('newMessageData: ', newMessageData);
  useEffect(() => {
    console.log('페이지 진입할때만 실행');
    // queryClient.invalidateQueries(messageKeys.all);
    // queryClient.refetchQueries(messageKeys.all);
    queryClient.invalidateQueries(messageKeys.message(chattingRoomId));
    queryClient.refetchQueries(messageKeys.message(chattingRoomId));
    resetMessages();
    if (activity.transitionState === 'enter-done') {
      setTimeout(() => {
        handleRightSideBarClose();
      }, 300);
    }
  }, [activity]);

  useEffect(() => {
    if (chattingTitleRef.current && createMessageRef.current) {
      setRefHeights([
        chattingTitleRef.current?.clientHeight ?? 0,
        createMessageRef.current?.clientHeight ?? 0,
      ]);
      setIsRefLoading(false);
    }
  }, [chattingTitleRef.current, createMessageRef.current]);

  //새로운 메세지 도착 시 스크롤바 컨트롤
  useEffect(() => {
    if (newMessageData.length === 0) return;
    const lastChattingMessageAccountId =
      newMessageData.at(-1)?.chattingAccountId;
    if (lastChattingMessageAccountId === accountId) {
      console.log(
        'scrollToBottom 실행_내가 채팅 쳤을때만',
        lastChattingMessageAccountId,
        accountId,
      );
      scrollbarRef.current?.scrollToBottom();
    } else {
      const heightDifference = scrollbarRef.current
        ? scrollbarRef?.current?.getScrollHeight() -
          scrollbarRef?.current?.getScrollTop()
        : undefined;
      if (heightDifference && heightDifference >= 100) {
        console.log('scrollToBottom 실행_스크롤 위치 확인');
        setIsNewMessageArrived(true);
      }
      console.log(
        'scrollToBottom 실행_스크롤 위치 확인',
        scrollbarRef?.current?.getClientHeight(),
      );
    }
  }, [newMessageData]);

  const onClickNewMessageModal = () => {
    setIsNewMessageArrived(false);
    scrollDownref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  useEffect(() => {
    scrollbarRef.current?.scrollToBottom();
  }, [fileContainerOpen]);

  useEffect(() => {
    const lastMessageId = messageData.data?.pages
      .at(-1)
      ?.chattingMessageWithBookmarkGetResponses?.at(-1)?.chattingMessageId;
    setNextMessageId(lastMessageId);
    console.log('lastMessageId', lastMessageId);
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
      messageData.data?.pages[1].chattingMessageWithBookmarkGetResponses[0]
        .chattingMessageId;
    const element = document.getElementById(`${id}`);
    if (element) {
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
      console.log('resetMEssages_1');
      resetMessages();
      messageData.refetch();
      console.log('scrollToBottom 실행!_3');
      scrollbarRef.current?.scrollToBottom();
      scrollDownref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }

    //컴포넌트가 언마운트되면 웹소켓 연결을 종료합니다.
    return () => {
      if (clientRef.current) {
        client?.deactivate();
        console.log('resetMEssages_1');
        resetMessages();
      }
    };
  }, [publish]);
  const isChatBookmarked =
    messageData.data?.pages[0].chattingMessageWithBookmarkGetResponses.find(
      (item) => item.chattingMessageId === chattingMessageId,
    )?.isBookmarked;

  const handleRightSideBarOpen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
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
      console.log('scrollValues', values);
      if (0.98 <= values.top && values.top <= 1) {
        setIsNewMessageArrived(false);
      }
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

  const onClickDelete = () => {
    console.log('삭제', chattingMessageId);
    deleteMutate();
    setIsBottomModalOpen(false);
  };

  const onClickBookmark = () => {
    console.log('북마크', chattingMessageId);
    bookmarkMutate();
    setIsBottomModalOpen(false);
  };
  const onClickDeleteBookmark = () => {
    console.log('북마크 삭제', chattingMessageId);
    deleteBookmarkMutate();
    setIsBottomModalOpen(false);
  };

  if (messageData.isError) {
    return <div>에러가 발생했습니다. 캐시된 데이터입니다</div>;
  }

  if (messageData.isLoading) {
    return <LoadingSpinner />;
  }
  console.log('params', params.title);
  return (
    <div className="relative w-full overflow-hidden">
      {params.title === 'imageModal' && (
        <div className="box-border absolute z-10 w-full h-full overflow-hidden bg-dark">
          <div className="absolute z-20 flex flex-row items-center w-full gap-3 py-4 pl-4 bg-dark">
            <button
              onClick={() =>
                stepReplace({
                  id: String(chattingRoomId),
                  title: 'chatRoomPage',
                })
              }
              className="w-6 h-6 text-white"
            >
              <BackIcon />
            </button>
          </div>
          <div className="absolute top-0 z-10 flex items-center justify-center w-full h-full">
            <img
              src={modalfileUrl}
              className="object-cover w-full h-auto"
              alt={modalfileUrl}
            />
          </div>
        </div>
      )}
      <RightSideBar
        isRightSideBarOpen={isRightSideBarOpen}
        handleRightSideBarClose={handleRightSideBarClose}
        bindPanRight={bindPanRight}
        ref={sideBarRef}
      >
        <ChatRoomRightSideBox
          chatRoomId={chattingRoomId}
          fileData={fileData}
          accountName={chatRoomData?.accountNickName}
          accountProfileUrl={chatRoomData?.accountProfilePictureUrl}
        />
      </RightSideBar>
      <div
        className="box-border relative w-full h-[100vh] mx-auto overflow-hidden"
        onClick={(e) => handleSideBarOutsideClick(e)}
        onKeyDown={(e) => handleSideBarOutsideClick(e)}
        role="presentation"
      >
        <div
          ref={chattingTitleRef}
          className="flex flex-row items-center w-full h-16 px-5 bg-hoverGray"
        >
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
          <button
            className="absolute w-6 h-6 right-5"
            onClick={(e) => handleRightSideBarOpen(e)}
          >
            <MenuIcon />
          </button>
        </div>
        {isRefLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="relative">
            <Scrollbars
              style={{ backgroundColor: '#FAFAFA' }}
              autoHide
              onScrollFrame={onScroll}
              autoHeight
              autoHeightMin={
                fileContainerOpen
                  ? `calc(100vh - ${refHeights[0]}px - ${refHeights[1]}px - 11rem)`
                  : `calc(100vh - ${refHeights[0]}px - ${refHeights[1]}px)`
              }
              ref={scrollbarRef}
            >
              <ChatList
                chattingRoomId={chattingRoomId}
                scrollbarRef={scrollbarRef}
                isScrollTop={isScrollTop}
                userData={userData}
                messageData={messageData}
                postFile={postFile}
                publish={publish}
                fileContainerOpen={fileContainerOpen}
                onPressFn={onPressFn}
                scrollDownref={scrollDownref}
                stepPush={stepPush}
              />
              <div ref={scrollDownref}></div>
            </Scrollbars>
            <NewMessageArrivedModal
              isNewMessageArrived={isNewMessageArrived}
              onClickNewMessageModal={onClickNewMessageModal}
              chatRoomData={chatRoomData}
              newMessageData={newMessageData}
            />
          </div>
        )}

        <div ref={createMessageRef} className="absolute bottom-0 w-full pb-1">
          <CreateMessage
            chattingRoomId={chattingRoomId}
            accountId={accountId}
            postFile={postFile}
            publish={publish}
            fileContainerOpen={fileContainerOpen}
            setFileContainerOpen={setFileContainerOpen}
          />
        </div>
      </div>
      <BottomModal isOpen={isBottomModalOpen} bindPanDown={bindPanDown}>
        <div className="w-full bg-white">
          <button
            className="flex flex-row items-center justify-between w-full h-16 px-5 py-5"
            onClick={isChatBookmarked ? onClickDeleteBookmark : onClickBookmark}
          >
            <div className="text-base font-normal leading-tight">
              {isChatBookmarked ? '즐겨찾기 해제' : '즐겨찾기'}
            </div>
            <div className="relative w-5 h-5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.38843 4.28963C7.69278 2.57693 4.94954 2.5686 3.26122 4.2739C1.5729 5.9792 1.58114 8.75004 3.27679 10.4627L9.55368 16.8028C9.81404 17.0657 10.2362 17.0657 10.4965 16.8028L16.7408 10.4994C18.4252 8.78856 18.4199 6.02549 16.7239 4.31249C15.0252 2.59671 12.2807 2.58838 10.5894 4.29673L9.99299 4.90026L9.38843 4.28963Z"
                  fill="#212121"
                />
              </svg>
            </div>
          </button>
          <div className="flex flex-row items-center justify-between w-full h-16 px-5 py-5">
            <div className="text-base font-normal leading-tight">수정</div>
            <div className="relative w-5 h-5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8911 3.04825C17.2885 1.65064 19.5543 1.65058 20.9519 3.0481C22.3493 4.4455 22.3493 6.71112 20.952 8.10861L20.0602 9.00057L14.9995 3.93991L15.8911 3.04825ZM13.9389 5.00064L3.94103 14.9997C3.5347 15.4061 3.2491 15.9172 3.116 16.4762L2.02041 21.0777C1.96009 21.3311 2.03552 21.5976 2.21968 21.7817C2.40385 21.9659 2.67037 22.0413 2.92373 21.981L7.52498 20.8855C8.08418 20.7523 8.59546 20.4666 9.00191 20.0601L18.9996 10.0613L13.9389 5.00064Z"
                  fill="#212121"
                />
              </svg>
            </div>
          </div>
          <button
            onClick={onClickDelete}
            className="flex flex-row items-center justify-between w-full h-16 px-5 py-5"
          >
            <div className="text-base font-normal leading-tight text-red">
              삭제
            </div>
            <div className="relative w-5 h-5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 5H14C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5ZM8.5 5C8.5 3.067 10.067 1.5 12 1.5C13.933 1.5 15.5 3.067 15.5 5H21.25C21.6642 5 22 5.33579 22 5.75C22 6.16421 21.6642 6.5 21.25 6.5H19.9309L18.7589 18.6112C18.5729 20.5334 16.9575 22 15.0263 22H8.97369C7.04254 22 5.42715 20.5334 5.24113 18.6112L4.06908 6.5H2.75C2.33579 6.5 2 6.16421 2 5.75C2 5.33579 2.33579 5 2.75 5H8.5ZM10.5 9.75C10.5 9.33579 10.1642 9 9.75 9C9.33579 9 9 9.33579 9 9.75V17.25C9 17.6642 9.33579 18 9.75 18C10.1642 18 10.5 17.6642 10.5 17.25V9.75ZM14.25 9C13.8358 9 13.5 9.33579 13.5 9.75V17.25C13.5 17.6642 13.8358 18 14.25 18C14.6642 18 15 17.6642 15 17.25V9.75C15 9.33579 14.6642 9 14.25 9Z"
                  fill="#E74733"
                />
              </svg>
            </div>
          </button>
        </div>
      </BottomModal>
    </div>
  );
};

type NewMessageArrivedModalProps = {
  onClickNewMessageModal: () => void;
  isNewMessageArrived: boolean;
  chatRoomData: ChatRoomSelectedDataProps | undefined;
  newMessageData: INewMessage[];
};

const NewMessageArrivedModal = ({
  onClickNewMessageModal,
  isNewMessageArrived,
  chatRoomData,
  newMessageData,
}: NewMessageArrivedModalProps) => {
  return (
    <button
      onClick={onClickNewMessageModal}
      className={cls(
        'flex flex-row gap-1 items-center px-4 w-[90vw] mx-auto shadow py-1 text-sm text-center rounded-full bg-lightGray text-dark transform transition-all duration-300 ease-in-out',
        isNewMessageArrived
          ? `absolute bottom-4 z-10 left-1/2 -translate-x-1/2 translate-y-0`
          : `absolute -bottom-4 left-1/2 -translate-x-1/2 translate-y-full`,
      )}
    >
      <div className="flex flex-row items-center gap-1">
        <img
          src={chatRoomData?.accountProfilePictureUrl}
          width={24}
          height={24}
          style={{ objectFit: 'cover' }}
          alt="채팅보낸사람 프로필"
        />
        <div>{chatRoomData?.accountNickName}</div>
      </div>
      <div>
        {newMessageData.at(-1)?.fileUrl
          ? '미디어 파일'
          : truncateString(newMessageData.at(-1)?.message, 10)}
      </div>
      <div className="absolute right-4 text-gray">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.21967 4.46967C2.51256 4.17678 2.98744 4.17678 3.28033 4.46967L6 7.18934L8.71967 4.46967C9.01256 4.17678 9.48744 4.17678 9.78033 4.46967C10.0732 4.76256 10.0732 5.23744 9.78033 5.53033L6.53033 8.78033C6.23744 9.07322 5.76256 9.07322 5.46967 8.78033L2.21967 5.53033C1.92678 5.23744 1.92678 4.76256 2.21967 4.46967Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </button>
  );
};

type CreateMessageProps = {
  chattingRoomId: number;
  accountId: number | undefined;
  postFile: (file: FormData) => void;
  publish: (url: string, message: string) => void;
  fileContainerOpen: boolean;
  setFileContainerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateMessage = React.memo(function CreateMessage({
  chattingRoomId,
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
    publish(
      `${PUB_URL}/${chattingRoomId}`,
      JSON.stringify({ content: message }),
    );
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
    <div className="w-full py-2 bg-white">
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

export default React.memo(ChatRoomPageWrapper);
