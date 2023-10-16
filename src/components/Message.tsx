/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import { cls } from 'utils/cls';
import VideoMessage from './VideoMessage';
import React, {
  ForwardedRef,
  MutableRefObject,
  PropsWithChildren,
  RefObject,
  forwardRef,
} from 'react';
import dayjs from 'dayjs';
import Scrollbars from 'react-custom-scrollbars-2';
import { classifyUrl } from 'utils/classifyUrl';
import { animated } from '@react-spring/web';
import usePan, { PanReturnType } from 'hooks/usePan';
import useChatRoomModalStore from '../stores/firstRender';
import { SENDING_MEDIA } from 'constants/global';
import useMessageStore from 'stores/message';
import { ChatRoomPageProps } from 'apps/Chat/ChatRoom';

type MessageProps = {
  message: string | null;
  fileUrl: string | null;
  myId: number | undefined;
  chatId: number;
  chattingRoomId: number;
  chatMessageId: number;
  isDeleted: boolean;
  isBookmarked: boolean;
  createAt: string;
  publish: (destination: string, body: string) => void;
  videoRef?: React.RefObject<HTMLVideoElement> | null;
  messageRef?: React.RefObject<
    HTMLVideoElement | HTMLImageElement | HTMLAnchorElement | HTMLDivElement
  >;
  handleCapture?: (
    ref: React.RefObject<
      HTMLVideoElement | HTMLDivElement | HTMLImageElement | HTMLAnchorElement
    >,
  ) => void;
  postFile?: (file: FormData) => void;
  scrollbarRef?: MutableRefObject<Scrollbars | null>;
  isScrollTop?: boolean;
  onPressFn: () => void;
  scrollDownref: RefObject<HTMLDivElement>;
  stepPush: (params: ChatRoomPageProps, options?: object | undefined) => void;
};

interface MessageWrapperProps extends PropsWithChildren {
  isMyMessage: boolean;
  createAt: string;
  isBookmarked: boolean;
  scrollbarRef?: React.ForwardedRef<Scrollbars>;
  scale: PanReturnType['scale'];
  bindPress: PanReturnType['bindPress'];
  content?: string | null;
}

const MessageWrapper = ({
  isMyMessage,
  children,
  createAt,
  isBookmarked,
  bindPress,
  scale,
  content,
}: MessageWrapperProps) => {
  return (
    <div
      id="message"
      className={cls(
        'flex flex-row items-start space-x-2 mt-3 mb-2 mx-5 max-w-full overflow-hidden relative h-auto',
        isMyMessage ? 'flex-row-reverse space-x-reverse' : 'space-x-2',
      )}
    >
      <div className="relative flex flex-col">
        <animated.div
          {...bindPress()}
          style={{ scale, touchAction: 'none' }}
          className={cls(
            'w-auto h-auto p-4 relative max-w-[70vw] justify-center items-center gap-2.5 inline-flex',
            isMyMessage && content === SENDING_MEDIA
              ? 'text-white bg-gray bg-opacity-40 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br'
              : isMyMessage && content !== SENDING_MEDIA
              ? ' text-white bg-mainBlue rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br'
              : ' bg-[#d7d7d9] rounded-tl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl ',
          )}
        >
          {children}
          <div
            className={cls(
              isMyMessage
                ? 'absolute bottom-0 -left-12'
                : 'absolute bottom-0 -right-12',
            )}
          >
            <div className="h-full text-xs font-normal leading-none text-gray">
              <div className="flex flex-col items-end h-full">
                {content === SENDING_MEDIA
                  ? null
                  : dayjs(createAt).add(9, 'hour').format('h:mm A')}
              </div>
            </div>
          </div>
        </animated.div>
        {isBookmarked ? (
          <div className="relative w-full h-7">
            <div
              className={cls(
                'absolute top-[2px] transform duration-300',
                isMyMessage ? 'right-1' : 'left-1',
              )}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="10" cy="10" r="10" fill="#f9f118" />
                <path
                  d="M10 12.635L12.075 13.89C12.455 14.12 12.92 13.78 12.82 13.35L12.27 10.99L14.105 9.40001C14.44 9.11001 14.26 8.56001 13.82 8.52501L11.405 8.32001L10.46 6.09C10.29 5.685 9.71001 5.685 9.54001 6.09L8.59501 8.31501L6.18001 8.52C5.74001 8.555 5.56001 9.105 5.89501 9.395L7.73001 10.985L7.18001 13.345C7.08001 13.775 7.54501 14.115 7.92501 13.885L10 12.635Z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const MediaMessageWrapper = ({
  children,
  isMyMessage,
  createAt,
  isBookmarked,
  scale,
  bindPress,
}: MessageWrapperProps) => {
  return (
    <div
      id="message"
      className={cls(
        'flex flex-row items-end space-x-2 mt-3 mb-2 px-5 w-[100vw] relative h-auto',
        isMyMessage ? 'flex-row-reverse space-x-reverse' : 'space-x-2',
      )}
    >
      <animated.div
        {...bindPress()}
        style={{ scale, touchAction: 'none' }}
        className="relative w-auto h-full max-w-[70%]"
      >
        {children}
      </animated.div>
      <div className={cls('w-full max-w-[30%] relative')}>
        <div
          className={cls(
            'h-full text-xs font-normal leading-none text-gray',
            isMyMessage ? 'text-right' : 'text-left',
          )}
        >
          {isBookmarked ? '북마크됨' : ''}
          {dayjs(createAt).add(9, 'hour').format('h:mm A')}
        </div>
      </div>
    </div>
  );
};

const Message = forwardRef(
  (
    {
      isScrollTop,
      message,
      myId,
      chatId,
      chattingRoomId,
      chatMessageId,
      createAt,
      isDeleted,
      isBookmarked,
      fileUrl,
      handleCapture,
      onPressFn,
      scrollbarRef, //isScrollTop,
      scrollDownref,
      stepPush,
    }: MessageProps,
    ref: ForwardedRef<
      HTMLVideoElement | HTMLImageElement | HTMLAnchorElement | HTMLDivElement
    >,
  ) => {
    const isMyMessage = myId === chatId;
    const uri = classifyUrl(fileUrl, message);
    const {
      messages,
      nextMessageId,
      removeLoadingMessage,
      setModalFileUrl,
      setModalOpen,
    } = useMessageStore();
    const { setChattingMessageId } = useChatRoomModalStore();
    const onMessagePress = () => {
      console.log('message pressed');
      console.log('chatMessageId', chatMessageId);
      setChattingMessageId(chatMessageId);
      if (isDeleted) return;
      onPressFn();
    };
    const imgOnLoad = () => {
      console.log('scroll관련 messages', messages);
      if (!isScrollTop && messages.length > 0 && isMyMessage) {
        scrollbarRef?.current?.scrollToBottom();
        scrollDownref.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
      if (!isScrollTop && messages?.length === 0) {
        console.log('img로드될때 실행되는 scrollToBottom');
        scrollbarRef?.current?.scrollToBottom();
        scrollDownref.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
      if (chatMessageId === nextMessageId) {
        removeLoadingMessage();
      }
    };
    const { scale, bindPress } = usePan(onMessagePress);

    const reloadWhenError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      console.log('image reloadWhenError');
      setTimeout(() => {
        e.currentTarget.src = fileUrl ?? '';
      }, 1000);
    };

    return uri === 'image' || uri === 'video' ? (
      <MediaMessageWrapper
        scrollbarRef={scrollbarRef}
        isMyMessage={isMyMessage}
        isBookmarked={isBookmarked}
        createAt={createAt}
        scale={scale}
        bindPress={bindPress}
      >
        {uri === 'video' && (
          <VideoMessage
            isScrollTop={isScrollTop}
            scrollbarRef={scrollbarRef}
            scrollDownref={scrollDownref}
            isMyMessage={isMyMessage}
            src={fileUrl ?? ''}
            chatMessageId={chatMessageId}
            handleCapture={
              handleCapture
                ? () => {
                    handleCapture(ref);
                  }
                : undefined
            }
            ref={ref}
          />
        )}
        {uri === 'image' && (
          <button
            onClick={() => {
              setModalOpen(true);
              setModalFileUrl(fileUrl ?? '');
              stepPush({ id: String(chattingRoomId), title: 'imageModal' });
              console.log('imageClick', fileUrl);
            }}
          >
            <img
              width={'100%'}
              height={'auto'}
              src={fileUrl ?? ''}
              alt="img"
              className="rounded-xl"
              onLoad={imgOnLoad}
              crossOrigin="anonymous"
              onError={(e) => reloadWhenError(e)}
            />
          </button>
        )}
      </MediaMessageWrapper>
    ) : (
      <MessageWrapper
        isMyMessage={isMyMessage}
        createAt={createAt}
        isBookmarked={isBookmarked}
        scale={scale}
        bindPress={bindPress}
        content={message}
      >
        {message === SENDING_MEDIA ? (
          <div className="w-full flex justify-center items-center min-w-[70vw] max-w-[70vw] h-auto py-6">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <p
            className="break-words whitespace-normal"
            style={{ wordBreak: 'break-all' }}
          >
            {message}
          </p>
        )}
      </MessageWrapper>
    );
  },
);

Message.displayName = 'Message';

export default React.memo(Message);
