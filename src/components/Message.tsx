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
import useChatRoomModalStore from 'stores/firstRender';
import useMessageStore from 'stores/message';
import { SENDING_MEDIA } from 'constants/global';

type MessageProps = {
  message: string | null;
  fileUrl: string | null;
  myId: number | undefined;
  chatId: number;
  chatMessageId: number;
  isDeleted: boolean;
  isBookmarked: boolean;
  createAt: string;
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
      <animated.div
        {...bindPress()}
        style={{ scale }}
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
              {isBookmarked ? (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-1"
                >
                  <path
                    d="M5.65599 2.73693C4.70219 1.75824 3.15912 1.75349 2.20944 2.72795C1.25976 3.7024 1.26439 5.28574 2.2182 6.26443L5.74895 9.8873C5.8954 10.0376 6.13284 10.0376 6.27929 9.8873L9.7917 6.28538C10.7392 5.30775 10.7362 3.72885 9.7822 2.74999C8.82669 1.76955 7.28289 1.76479 6.33151 2.74099L5.99605 3.08587L5.65599 2.73693Z"
                    fill="#3E66FB"
                  />
                </svg>
              ) : null}
              {content === SENDING_MEDIA
                ? null
                : dayjs(createAt).add(9, 'hour').format('h:mm A')}
            </div>
          </div>
        </div>
      </animated.div>
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
        style={{ scale }}
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
      chatMessageId,
      createAt,
      isDeleted,
      isBookmarked,
      fileUrl,
      handleCapture,
      onPressFn,
      scrollbarRef, //isScrollTop,
      scrollDownref,
    }: MessageProps,
    ref: ForwardedRef<
      HTMLVideoElement | HTMLImageElement | HTMLAnchorElement | HTMLDivElement
    >,
  ) => {
    const isMyMessage = myId === chatId;
    const uri = classifyUrl(fileUrl, message);
    const { setChattingMessageId } = useChatRoomModalStore();
    const { resetMessages, nextMessageId } = useMessageStore();
    const onMessagePress = () => {
      console.log('message pressed');
      console.log('chatMessageId', chatMessageId);
      setChattingMessageId(chatMessageId);
      if (isDeleted) return;
      onPressFn();
    };
    const { scale, bindPress } = usePan(onMessagePress);
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
            scrollTop={isScrollTop}
            scrollDownref={scrollDownref}
            isMyMessage={isMyMessage}
            src={fileUrl ?? ''}
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
          <>
            <img
              width={'100%'}
              height={'auto'}
              src={fileUrl ?? ''}
              alt="img"
              className="rounded-xl"
              onLoad={() => {
                if (chatMessageId === nextMessageId) {
                  console.log('resetMessages', chatMessageId, nextMessageId);
                  resetMessages();
                }
                if (!isScrollTop) scrollbarRef?.current?.scrollToBottom();
              }}
            />
          </>
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
          <p className="break-words whitespace-normal">{message}</p>
        )}
      </MessageWrapper>
    );
  },
);

Message.displayName = 'Message';

export default React.memo(Message);
