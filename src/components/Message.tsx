import { cls } from 'utils/cls';
import VideoMessage from './VideoMessage';
import React, { MutableRefObject } from 'react';
import dayjs from 'dayjs';
import Scrollbars from 'react-custom-scrollbars-2';

type MessageProps = {
  message: string | null;
  fileUrl: string | null;
  myId: number | undefined;
  chatId: number;
  createAt: string;
  videoRef?: React.RefObject<HTMLVideoElement> | null;
  handleCapture?: () => void;
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

const Message = ({
  message,
  myId,
  chatId,
  createAt,
  fileUrl,
  handleCapture,
  videoRef,
  scrollbarRef,
  isScrollTop,
}: MessageProps) => {
  const isMyMessage = myId === chatId;

  const classifyUrl = (url: string | null) => {
    const imageRegex = /\.(png|jpg|jpeg|gif)$/i; // 대소문자 구분 없이 이미지 확장자 매칭
    const videoRegex = /\.(mp4|avi|mov|wmv)$/i;
    if (imageRegex.test(url ?? '')) {
      return 'image';
    }
    if (videoRegex.test(url ?? '')) {
      return 'video';
    }
    if (message === null) {
      return 'file';
    }
  };

  const uri = classifyUrl(fileUrl);

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
          handleCapture={handleCapture}
          ref={videoRef}
        />
      )}
      {uri === 'image' && (
        <img
          src={fileUrl ?? ''}
          alt="img"
          className="w-full h-auto rounded-xl"
          loading="lazy"
          onLoad={() => {
            if (!isScrollTop) scrollbarRef?.current?.scrollToBottom();
          }}
        />
      )}
    </MediaMessageWrapper>
  ) : (
    <MessageWrapper isMyMessage={isMyMessage} createAt={createAt}>
      <p className="break-words whitespace-normal">{message}</p>
    </MessageWrapper>
  );
};

export default React.memo(Message);
