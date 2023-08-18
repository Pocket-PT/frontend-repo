/* eslint-disable jsx-a11y/media-has-caption */
import EditIcon from 'icons/EditIcon';
import React, { ForwardedRef, forwardRef } from 'react';
import { cls } from 'utils/cls';

const VideoMessage = forwardRef(
  (
    {
      isMyMessage,
      handleCapture,
      src,
    }: {
      isMyMessage: boolean;
      handleCapture: (() => void) | undefined;
      src?: string;
    },
    ref: ForwardedRef<HTMLVideoElement>,
  ) => {
    const pauseVideo = () => {
      if (typeof ref === 'object') {
        ref?.current?.pause();
      }
    };

    const handleCaptureAndPause = () => {
      handleCapture?.();
      pauseVideo();
    };

    return (
      <div className="relative w-full h-full">
        <video ref={ref} src={src} controls autoPlay className="rounded-lg" />
        <button
          className={cls(
            'absolute top-1/2 text-mainBlue',
            isMyMessage ? '-left-12' : '-right-12',
          )}
          onClick={handleCaptureAndPause}
        >
          <div className="p-3 rounded-full bg-lightGray">
            <EditIcon />
          </div>
        </button>
      </div>
    );
  },
);
VideoMessage.displayName = 'VideoMessage';

export default VideoMessage;
