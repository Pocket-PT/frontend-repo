import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type EditModalProps = {
  onCloseModal: () => void;
  canvasData: {
    canvasURL: string;
    canvasWidth: number;
    canvasHeight: number;
  };
};

const EditModal = ({ onCloseModal, canvasData }: EditModalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = document.createElement('img');
    img.src = canvasData.canvasURL;

    if (canvas && ctx) {
      canvas.width = canvasData.canvasWidth;
      canvas.height = canvasData.canvasHeight;
      ctx.drawImage(img, 0, 0, canvasData.canvasWidth, canvasData.canvasHeight);
    }
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-50 bg-white rounded max-w-[540px] max-h-screen w-[90%] h-[90%] m-auto shadow">
        <div className="w-full h-full">
          <div
            className={`box-border flex flex-row relative justify-center pt-11 max-h-screen mx-auto`}
          >
            <button
              className="absolute flex items-center justify-center w-8 h-8 border rounded-full top-1 right-2 right text-gray border-gray"
              onClick={onCloseModal}
            >
              X
            </button>
            <div className="relative flex justify-center">
              <canvas
                ref={canvasRef}
                style={{
                  objectFit: 'contain',
                  maxWidth: 'auto',
                  maxHeight: '70vh',
                }}
              ></canvas>
              {/* <Image
                style={{
                  objectFit: 'contain',
                  maxWidth: 'auto',
                  maxHeight: '70vh',
                }}
                width={canvasData.canvasWidth}
                height={canvasData.canvasHeight}
                src={canvasData.canvasURL}
                alt="image"
              /> */}
              {/* </canvas> */}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 z-40 opacity-50 bg-dark"></div>
    </>
  );
};

export default EditModal;
