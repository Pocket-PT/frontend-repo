import { cls } from 'utils/cls';
import VideoMessage from './VideoMessage';

type MessageProps = {
  message: string;
  videoSrc?: string;
  videoRef?: React.RefObject<HTMLVideoElement> | null;
  handleCapture?: () => void;
};

const Message = ({
  message,
  videoSrc,
  videoRef,
  handleCapture,
}: MessageProps) => {
  const isMyMessage = true;
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
        {videoSrc && (
          <VideoMessage handleCapture={handleCapture} ref={videoRef} />
        )}
        <p className="break-words whitespace-normal">{message}</p>
      </div>
    </div>
  );
};

export default Message;
