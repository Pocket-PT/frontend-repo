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
      scrollDownref,
    }: {
      scrollTop?: boolean;
      scrollbarsRef?: React.RefObject<Scrollbars>;
      isMyMessage: boolean;
      handleCapture: (() => void) | undefined;
      src?: string;
      scrollDownref: React.RefObject<HTMLDivElement>;
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

    const scrollToBottomwhenLoaded = () => {
      console.log('scrollToBottomwhenLoaded');
      if (!scrollTop) {
        scrollbarsRef?.current?.scrollToBottom();
        scrollDownref.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    };

    console.log('videoMessageRef: ', ref);
    return (
      <div className="relative w-full h-full">
        <video
          width={'100%'}
          height={'auto'}
          onLoadedData={scrollToBottomwhenLoaded}
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
