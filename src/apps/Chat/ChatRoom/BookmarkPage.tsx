/* eslint-disable react/prop-types */
import { ActivityComponentType } from '@stackflow/react';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import BackIcon from 'icons/BackIcon';
import ChatList from 'components/ChatList';
import usePushToPage from 'hooks/usePushToPage';
import LoadingSpinner from 'components/common/LoadingSpinner';
import Scrollbars from 'react-custom-scrollbars-2';
import useChatRoomQuery from 'apis/useChatRoomQuery';
import MyLayout from 'components/MyLayout';
import { AccountQueryResult } from 'apis/useAccountQuery';
import usePan from 'hooks/usePan';
import BottomModal from 'components/common/BottomModal';
import useChatRoomModalStore from 'stores/firstRender';
import useDeleteChatMutation from 'hooks/mutation/useDeleteChatMutation';
import usePostChatBookmarkMutation from 'hooks/mutation/usePostChatBookmarkMutation';
import useDeleteChatBookmarkMutation from 'hooks/mutation/useDeleteChatBookmarkMutation';
import useBookmarkInfiniteQuery from 'apis/useBookmarkInfiniteQuery';

type BookmarkPageProps = {
  id: string;
};

const BookmarkPageWrapper: ActivityComponentType<BookmarkPageProps> = ({
  params,
}) => {
  return (
    <MyLayout hasFooter={false}>
      <BookmarkPage params={params} />
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
const BookmarkPage: React.FC<any> = ({ params, result }: Props) => {
  console.log('bookmarkParams', params);
  const chattingRoomId = +params.id;
  const messageData = useBookmarkInfiniteQuery(chattingRoomId);
  console.log('bookmarkData: ', messageData);
  const { data: chatRoomData } = useChatRoomQuery<ChatRoomSelectedDataProps>({
    select: (res) => {
      return res.data.data.filter(
        (item) => item.chattingRoomId === chattingRoomId,
      )[0].chattingParticipantResponseList[0];
    },
  });
  const { data: userData } = result;
  const [isScrollTop] = useState(false);
  const { pop } = usePushToPage();
  const scrollbarRef = useRef<Scrollbars>(null);
  const {
    isOpen: isBottomModalOpen,
    setIsOpen: setIsBottomModalOpen,
    bindPanDown,
  } = usePan();
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

  const isChatBookmarked =
    messageData.data?.pages[0].chattingMessageWithBookmarkGetResponses.find(
      (item) => item.chattingMessageId === chattingMessageId,
    )?.isBookmarked;

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

  return (
    <div className="relative w-full overflow-hidden border border-red">
      <div className="box-border relative w-full h-[100vh] mx-auto overflow-hidden">
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
        </div>
        <Scrollbars
          style={{ backgroundColor: '#FAFAFA' }}
          autoHide
          autoHeight
          autoHeightMin={`calc(100vh - 8.5rem)`}
          ref={scrollbarRef}
        >
          <ChatList
            scrollbarRef={scrollbarRef}
            isScrollTop={isScrollTop}
            userData={userData}
            messageData={messageData}
            onPressFn={onPressFn}
          />
        </Scrollbars>
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

export default React.memo(BookmarkPageWrapper);
