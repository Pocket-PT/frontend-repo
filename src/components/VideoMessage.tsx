/* eslint-disable jsx-a11y/media-has-caption */
import EditIcon from 'icons/EditIcon';
import React, { forwardRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { cls } from 'utils/cls';

const VideoMessage = forwardRef(
  (
    {
      scrollTop,
      scrollbarsRef,
      isMyMessage,
      handleCapture,
      src,
    }: {
      scrollTop?: boolean;
      scrollbarsRef?: React.RefObject<Scrollbars>;
      isMyMessage: boolean;
      handleCapture: (() => void) | undefined;
      src?: string;
    },
    ref: React.ForwardedRef<
      HTMLVideoElement | HTMLImageElement | HTMLAnchorElement | HTMLDivElement
    >,
  ) => {
    const pauseVideo = () => {
      if (typeof ref === 'object' && ref?.current instanceof HTMLVideoElement) {
        ref?.current?.pause();
      }
    };

    const handleCaptureAndPause = () => {
      handleCapture?.();
      pauseVideo();
    };

    console.log('videoMessageRef: ', ref);
    return (
      <div className="relative w-full h-full">
        <video
          onLoadedData={() => {
            if (!scrollTop) scrollbarsRef?.current?.scrollToBottom();
          }}
          crossOrigin="anonymous"
          ref={ref}
          src={src}
          controls
          className="rounded-lg"
        />
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
