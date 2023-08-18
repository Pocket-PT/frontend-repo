import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import Scrollbars, { positionValues } from 'react-custom-scrollbars-2';
import LoadingSpinner from './common/LoadingSpinner';
import {
  InfiniteQueryObserverIdleResult,
  InfiniteQueryObserverSuccessResult,
} from 'react-query';
import { IMessage } from 'apis/useMessageInfiniteQuery';
import Message from './Message';
import { AxiosResponse } from 'axios';
import { AccountData } from 'apis/useAccountQuery';
import useMessageStore from 'stores/message';

interface Props {
  userData: AxiosResponse<AccountData> | undefined;
  postFile: (file: FormData) => void;
  messageData:
    | InfiniteQueryObserverIdleResult<IMessage, unknown>
    | InfiniteQueryObserverSuccessResult<IMessage, unknown>;
  fileContainerOpen: boolean;
  setCanvasData: React.Dispatch<
    React.SetStateAction<{
      canvasURL: string;
      canvasWidth: number;
      canvasHeight: number;
    }>
  >;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatList = ({
  userData,
  fileContainerOpen,
  messageData,
  setCanvasData,
  setModalOpen,
  postFile,
}: Props) => {
  const [isScrollTop, setIsScrollTop] = useState(false);
  const { messages: newMessageData } = useMessageStore();
  const scrollbarRef = useRef<Scrollbars>(null);

  const onScroll = useCallback(
    (values: positionValues) => {
      if (values.scrollTop === 0 && messageData.hasNextPage) {
        console.log('가장 위');
        messageData.fetchNextPage();
        setIsScrollTop(true);
      }
    },
    [scrollbarRef, messageData.hasNextPage, messageData.fetchNextPage],
  );

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
      scrollbarRef.current?.scrollTop(
        element?.getBoundingClientRect().y - element?.scrollHeight - 16,
      );
    }
  }, [messageData.data]);

  const videoTest = [
    { number: 1, url: 'sample-baduck.mp4' },
    {
      number: 2,
      url: 'https://d2skf4k4569cnz.cloudfront.net/chatting/1/0365b708-c3ab-4aa6-8940-6c975722113e/test.mov',
    },
    {
      number: 3,
      url: 'https://cdn.pocketpt.shop/demo.mp4',
    },
  ].map((v) => {
    return {
      number: v.number,
      url: v.url,
      //ref callback으로 수정해야함
      ref: useRef<HTMLVideoElement>(null),
    };
  });

  const handleCapture = useCallback(
    (ref: RefObject<HTMLVideoElement> | null) => {
      const playerElement = ref?.current;
      const scale = 0.5;
      if (playerElement) {
        const canvas = document.createElement('canvas');
        const canvas2d = canvas.getContext('2d');
        canvas.width = playerElement.videoWidth * scale;
        canvas.height = playerElement.videoHeight * scale;
        canvas2d?.drawImage(playerElement, 0, 0, canvas.width, canvas.height);

        console.log(canvas.toDataURL());
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
  // console.log('inView: ', inView);

  //로딩 및 메세지 추가시 스크롤바를 맨 아래로 이동시킵니다.
  useEffect(() => {
    if (
      messageData.data &&
      messageData.data.pages[0].chattingMessageGetResponseList.length >= 1
    ) {
      scrollbarRef.current?.scrollToBottom();
    }
  }, [newMessageData, fileContainerOpen]);

  return (
    <div className="w-full h-full">
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
        {messageData.isLoading ?? <LoadingSpinner />}
        {messageData.data?.pages.map((page) => {
          return page.chattingMessageGetResponseList.map((item, idx) => {
            return (
              <div key={idx} id={`${item.chattingMessageId}`}>
                <Message
                  message={item.content}
                  myId={userData?.data.accountId}
                  chatId={item.chattingAccountId}
                  createAt={item.updatedAt}
                  fileUrl={item.fileUrl}
                  postFile={postFile}
                  handleCapture={() => handleCapture(item.ref)}
                  videoRef={item.ref}
                  scrollbarRef={scrollbarRef}
                  isScrollTop={isScrollTop}
                />
              </div>
            );
          });
        })}
        {newMessageData.map((item, idx) => (
          <Message
            key={idx}
            message={item.message}
            myId={userData?.data.accountId}
            chatId={item.chattingAccountId}
            createAt={item.createAt}
            fileUrl={null}
            postFile={postFile}
          />
        ))}
        {videoTest.map((v) => (
          <Message
            key={v.number}
            myId={userData?.data.accountId}
            chatId={v.number}
            createAt={'null'}
            message={null}
            fileUrl={v.url}
            handleCapture={() => handleCapture(v.ref)}
            videoRef={v.ref}
          />
        ))}
      </Scrollbars>
    </div>
  );
};

export default ChatList;
