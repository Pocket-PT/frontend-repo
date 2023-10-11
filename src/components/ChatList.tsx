import { RefObject, useCallback, useEffect, useState } from 'react';
import LoadingSpinner from './common/LoadingSpinner';
import {
  InfiniteQueryObserverIdleResult,
  InfiniteQueryObserverSuccessResult,
} from 'react-query';
import { IMessage } from 'apis/useMessageInfiniteQuery';
import { AxiosResponse } from 'axios';
import { AccountData } from 'apis/useAccountQuery';
import useMessageStore from 'stores/message';
import EditModal from './EditModal';
import Scrollbars from 'react-custom-scrollbars-2';
import Message from './Message';

interface Props {
  isScrollTop: boolean;
  scrollbarRef: RefObject<Scrollbars | null>;
  userData: AxiosResponse<AccountData> | undefined;
  postFile?: (file: FormData) => void;
  messageData:
    | InfiniteQueryObserverIdleResult<IMessage, unknown>
    | InfiniteQueryObserverSuccessResult<IMessage, unknown>;
  fileContainerOpen?: boolean;
  onPressFn: () => void;
  scrollDownref: RefObject<HTMLDivElement>;
}
interface CanvasData {
  canvasURL: string;
  canvasWidth: number;
  canvasHeight: number;
}

const ChatList = ({
  isScrollTop,
  scrollbarRef,
  userData,
  messageData,
  postFile,
  onPressFn,
  scrollDownref,
}: Props) => {
  const { messages: newMessageData } = useMessageStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [canvasData, setCanvasData] = useState<CanvasData>({
    canvasURL: '',
    canvasWidth: 0,
    canvasHeight: 0,
  });

  useEffect(() => {
    scrollbarRef?.current?.scrollToBottom();
  }, []);

  const onCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleCapture = useCallback(
    (
      ref: RefObject<
        HTMLVideoElement | HTMLDivElement | HTMLImageElement | HTMLAnchorElement
      > | null,
    ) => {
      const playerElement = ref?.current;
      const scale = 0.5;
      if (playerElement && playerElement instanceof HTMLVideoElement) {
        const canvas = document.createElement('canvas');
        const canvas2d = canvas.getContext('2d');

        canvas.width = playerElement.videoWidth * scale;
        canvas.height = playerElement.videoHeight * scale;
        canvas2d?.drawImage(playerElement, 0, 0, canvas.width, canvas.height);

        //canvas2d?.drawImage(playerElement, 0, 0, canvas.width, canvas.height);

        console.log('canvas dataURL:', canvas.toDataURL());
        setCanvasData({
          canvasURL: canvas.toDataURL(),
          canvasWidth: canvas.width,
          canvasHeight: canvas.height,
        });
      }
      setModalOpen(true);
    },
    [],
  );

  return (
    <div className="w-full h-full">
      {messageData.isLoading ?? <LoadingSpinner />}
      {messageData.data?.pages.map((page) => {
        return page.chattingMessageWithBookmarkGetResponses.map((item, idx) => {
          return (
            <div
              key={idx}
              id={`${item.chattingMessageId}`}
              className="w-full h-fit"
            >
              <Message
                message={item.content}
                myId={userData?.data.accountId}
                chatId={item.chattingAccountId}
                chatMessageId={item.chattingMessageId}
                createAt={item.updatedAt}
                isDeleted={item.isDeleted}
                isBookmarked={item.isBookmarked}
                fileUrl={item.fileUrl}
                postFile={postFile}
                handleCapture={() => handleCapture(item.ref)}
                scrollbarRef={scrollbarRef}
                isScrollTop={isScrollTop}
                ref={item.ref}
                onPressFn={onPressFn}
                scrollDownref={scrollDownref}
              />
            </div>
          );
        });
      })}
      {newMessageData.map((item, idx) => (
        <Message
          key={idx}
          message={item.message}
          chatMessageId={item.chatMessageId}
          myId={userData?.data.accountId}
          chatId={item.chattingAccountId}
          createAt={item.createAt}
          isDeleted={false}
          isBookmarked={false}
          fileUrl={null}
          postFile={postFile}
          onPressFn={onPressFn}
          scrollDownref={scrollDownref}
        />
      ))}
      {modalOpen ? (
        <EditModal
          postFile={postFile}
          canvasData={canvasData}
          onCloseModal={onCloseModal}
          setCanvasData={setCanvasData}
        />
      ) : null}
    </div>
  );
};

export default ChatList;
