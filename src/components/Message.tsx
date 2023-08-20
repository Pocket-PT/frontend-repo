import { cls } from 'utils/cls';
import VideoMessage from './VideoMessage';
import React, { ForwardedRef, MutableRefObject, forwardRef } from 'react';
import dayjs from 'dayjs';
import Scrollbars from 'react-custom-scrollbars-2';
import { classifyUrl } from 'utils/classifyUrl';
//import EditIcon from 'icons/EditIcon';

type MessageProps = {
  message: string | null;
  fileUrl: string | null;
  myId: number | undefined;
  chatId: number;
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
};

type MessageWrapperProps = {
  isMyMessage: boolean;
  createAt: string;
  children: React.ReactNode;
  scrollbarRef?: React.ForwardedRef<Scrollbars>;
};

const MessageWrapper = ({
  isMyMessage,
  children,
  createAt,
}: MessageWrapperProps) => {
  return (
    <div
      className={cls(
        'flex flex-row items-start space-x-2 mt-3 mx-5 max-w-full overflow-hidden relative h-auto',
        isMyMessage ? 'flex-row-reverse space-x-reverse' : 'space-x-2',
      )}
    >
      <div
        className={cls(
          'w-auto h-auto p-4 relative max-w-[70vw] justify-center items-center gap-2.5 inline-flex',
          isMyMessage
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
            <div className="h-full">
              {dayjs(createAt).add(9, 'hour').format('h:mm A')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MediaMessageWrapper = ({
  isMyMessage,
  children,
  createAt,
}: MessageWrapperProps) => {
  return (
    <div
      className={cls(
        'flex flex-row items-end space-x-2 mt-3 px-5 w-[100vw] relative h-auto',
        isMyMessage ? 'flex-row-reverse space-x-reverse' : 'space-x-2',
      )}
    >
      <div className="relative w-auto h-full max-w-[70%]">{children}</div>
      <div className={cls('w-full max-w-[30%] relative')}>
        <div
          className={cls(
            'h-full text-xs font-normal leading-none text-gray',
            isMyMessage ? 'text-right' : 'text-left',
          )}
        >
          {dayjs(createAt).add(9, 'hour').format('h:mm A')}
        </div>
      </div>
    </div>
  );
};

const Message = forwardRef(
  (
    {
      message,
      myId,
      chatId,
      createAt,
      fileUrl,
      handleCapture,
      scrollbarRef,
      isScrollTop,
    }: MessageProps,
    ref: ForwardedRef<
      HTMLVideoElement | HTMLImageElement | HTMLAnchorElement | HTMLDivElement
    >,
  ) => {
    const isMyMessage = myId === chatId;

    const uri = classifyUrl(fileUrl, message);

    return uri === 'image' || uri === 'video' ? (
      <MediaMessageWrapper
        scrollbarRef={scrollbarRef}
        isMyMessage={isMyMessage}
        createAt={createAt}
      >
        {uri === 'video' && (
          <VideoMessage
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
              src={fileUrl ?? ''}
              alt="img"
              className="w-full h-auto rounded-xl"
              loading="lazy"
              onLoad={() => {
                if (!isScrollTop) scrollbarRef?.current?.scrollToBottom();
              }}
            />
            {/* <button
              className={cls(
                'absolute top-1/2 text-mainBlue',
                isMyMessage ? '-left-12' : '-right-12',
              )}
              // onClick={() => {
              //   handleCapture
              //     ? () => {
              //         handleCapture(ref);
              //       }
              //     : undefined;
              // }}
            >
              <div className="p-3 rounded-full bg-lightGray">
                <EditIcon />
              </div>
            </button> */}
          </>
        )}
      </MediaMessageWrapper>
    ) : (
      <MessageWrapper isMyMessage={isMyMessage} createAt={createAt}>
        <p className="break-words whitespace-normal">{message}</p>
      </MessageWrapper>
    );
  },
);

Message.displayName = 'Message';

export default React.memo(Message);
