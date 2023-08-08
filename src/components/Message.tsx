import { cls } from 'utils/cls';
import VideoMessage from './VideoMessage';
import React from 'react';
import dayjs from 'dayjs';

type MessageProps = {
  message: string | null;
  fileUrl: string | null;
  myId: number | undefined;
  chatId: number;
  createAt: string;
  videoSrc?: string;
  videoRef?: React.RefObject<HTMLVideoElement> | null;
  handleCapture?: () => void;
};

const Message = ({
  message,
  myId,
  chatId,
  createAt,
  fileUrl,
  videoRef,
  handleCapture,
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

  return (
    <div
      className={cls(
        'flex items-start space-x-2',
        isMyMessage ? 'flex-row-reverse space-x-reverse' : 'space-x-2',
      )}
    >
      <div
        className={cls(
          'w-auto text-sm h-auto text-dark px-3 py-1 fill-lightGray border border-gray rounded-lg',
        )}
      >
        {uri === 'video' && (
          <VideoMessage handleCapture={handleCapture} ref={videoRef} />
        )}
        {uri === 'image' && (
          <img
            src={fileUrl ?? ''}
            alt="img"
            className="w-40 h-40"
            loading="lazy"
          />
        )}
        {uri === 'file' && <div>File</div>}
        <p className="break-words whitespace-normal">{message}</p>
      </div>
      <div className="text-xs">
        {dayjs(createAt).add(9, 'hour').format('h:mm A')}
      </div>
    </div>
  );
};

export default React.memo(Message);
