/* eslint-disable jsx-a11y/media-has-caption */
import React, { ForwardedRef, forwardRef } from 'react';

const VideoMessage = forwardRef(
  (
    { handleCapture }: { handleCapture: (() => void) | undefined },
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
      <div className="w-full h-full">
        <video ref={ref} src="/sample-baduck.mp4" controls autoPlay />
        <button onClick={handleCaptureAndPause}>캡처하기</button>
      </div>
    );
  },
);
VideoMessage.displayName = 'VideoMessage';

export default VideoMessage;
