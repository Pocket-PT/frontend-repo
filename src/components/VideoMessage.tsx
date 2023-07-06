import React, { ForwardedRef, forwardRef } from 'react';

const VideoMessage = forwardRef(
  (
    { handleCapture }: { handleCapture: (() => void) | undefined },
    ref: ForwardedRef<HTMLVideoElement>,
  ) => {
    return (
      <div className="w-full h-full">
        <video ref={ref} src="/sample-baduck.mp4" controls autoPlay />
        <button onClick={handleCapture}>캡처하기</button>
      </div>
    );
  },
);

export default VideoMessage;
