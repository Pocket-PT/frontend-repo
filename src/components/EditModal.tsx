import { COLOR_PLATE } from 'constants/global';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { saveAsImage } from 'utils/saveImage';
import EraseIcon from 'icons/EraseIcon';
import UndoIcon from 'icons/UndoIcon';
import RedoIcon from 'icons/RedoIcon';
import { Slider } from 'antd';
import MenuIcon from 'icons/MenuIcon';

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
  const divRef = useRef<HTMLDivElement>(null);
  const [lineWidth, setLineWidth] = useState(5);
  const [canvasSize, setCanvasSize] = useState({
    width: canvasData.canvasWidth,
    height: canvasData.canvasHeight,
  });
  const [isColorMode, setIsColorMode] = useState(false);
  const [color, setColor] = useState('#000000');
  const img = document.createElement('img');

  useEffect(() => {
    img.src = canvasData.canvasURL;
  }, [canvasData.canvasURL, img]);

  const onLineWidthChange = (e: number) => {
    console.log(e);
    setLineWidth(Number(e));
  };

  const onColorPlateClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsColorMode(true);
    setColor(e.currentTarget.style.backgroundColor);
  };

  // const onDeleteAll = () => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas?.getContext('2d');

  //   if (canvas && ctx) {
  //     canvas.width = canvasData.canvasWidth;
  //     canvas.height = canvasData.canvasHeight;
  //     ctx.lineWidth = lineWidth;
  //   }
  // };

  const onSubmit = () => {
    const divElement = divRef.current;
    if (divElement) {
      html2canvas(divElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        console.log(imgData);
        saveAsImage(imgData, 'test.png');
      });
    }
  };

  const onErase = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      console.log('erase');
      ctx.globalCompositeOperation = 'destination-out';
    }
  };

  const onDrawMode = () => {
    const canvas = canvasRef.current;
    setIsColorMode(false);
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.globalCompositeOperation = 'source-over';
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      console.log('hi');
      canvas.width = canvasData.canvasWidth;
      canvas.height = canvasData.canvasHeight;
      //ctx.drawImage(img, 0, 0, canvasData.canvasWidth, canvasData.canvasHeight);
    }

    let isPainting = false;
    const onMove = (e: MouseEvent | PointerEvent) => {
      if (isPainting && ctx) {
        const rect = canvas?.getBoundingClientRect();
        if (rect && canvas) {
          let x = e.clientX - rect.left;
          let y = e.clientY - rect.top;
          x = x * (canvas.width / rect.width);
          y = y * (canvas.height / rect.height);
          ctx?.lineTo(x, y);
          ctx?.stroke();
          return;
        }
      }
      //ctx?.moveTo(e.offsetX, e.offsetY);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isPainting) {
        const rect = canvas?.getBoundingClientRect();
        if (rect && canvas) {
          let x = e.touches[0].clientX - rect.left;
          let y = e.touches[0].clientY - rect.top;
          x = x * (canvas.width / rect.width);
          y = y * (canvas.height / rect.height);
          ctx?.lineTo(x, y);
          ctx?.stroke();
          return;
        }
      }
      //ctx?.moveTo(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onMoveDown = () => {
      isPainting = true;
    };
    const cancelPainting = () => {
      isPainting = false;
      ctx?.beginPath();
    };

    // 컴포넌트 마운트 시에 이벤트 리스너 등록
    canvas?.addEventListener('mousemove', onMove);
    canvas?.addEventListener('mousedown', onMoveDown);
    canvas?.addEventListener('mouseup', cancelPainting);
    canvas?.addEventListener('mouseleave', cancelPainting);
    canvas?.addEventListener('touchmove', onTouchMove);
    canvas?.addEventListener('touchstart', onMoveDown);
    canvas?.addEventListener('touchend', cancelPainting);
    // 컴포넌트 언마운트 시에 이벤트 리스너 제거
    return () => {
      canvas?.removeEventListener('mousemove', onMove);
      canvas?.removeEventListener('mousedown', onMoveDown);
      canvas?.removeEventListener('mouseup', cancelPainting);
      canvas?.removeEventListener('mouseleave', cancelPainting);
      canvas?.removeEventListener('touchmove', onTouchMove);
      canvas?.removeEventListener('touchstart', onMoveDown);
      canvas?.removeEventListener('touchend', cancelPainting);
    };
  }, [canvasData.canvasWidth, canvasData.canvasHeight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.lineWidth = lineWidth;
    }
  }, [lineWidth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
    }
  }, [color]);

  useEffect(() => {
    const handleResize = () => {
      // 리사이즈 이벤트 발생 시 실행되는 로직을 작성합니다.
      setCanvasSize({
        width: divRef.current?.clientWidth || 0,
        height: divRef.current?.clientHeight || 0,
      });
      console.log(canvasSize.width, canvasSize.height);
    };

    // 컴포넌트가 마운트될 때 이벤트 리스너를 추가합니다.
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasSize.width, canvasSize.height]);

  return (
    <div className="fixed top-0 z-50 w-full h-full pt-5 pl-5 overflow-hidden bg-dark">
      <button
        onClick={onCloseModal}
        className="w-11 h-11 bg-white rounded-full shadow items-center justify-center gap-2.5 flex"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.89705 4.05379L3.96967 3.96967C4.23594 3.7034 4.6526 3.6792 4.94621 3.89705L5.03033 3.96967L10 8.939L14.9697 3.96967C15.2359 3.7034 15.6526 3.6792 15.9462 3.89705L16.0303 3.96967C16.2966 4.23594 16.3208 4.6526 16.1029 4.94621L16.0303 5.03033L11.061 10L16.0303 14.9697C16.2966 15.2359 16.3208 15.6526 16.1029 15.9462L16.0303 16.0303C15.7641 16.2966 15.3474 16.3208 15.0538 16.1029L14.9697 16.0303L10 11.061L5.03033 16.0303C4.76406 16.2966 4.3474 16.3208 4.05379 16.1029L3.96967 16.0303C3.7034 15.7641 3.6792 15.3474 3.89705 15.0538L3.96967 14.9697L8.939 10L3.96967 5.03033C3.7034 4.76406 3.6792 4.3474 3.89705 4.05379L3.96967 3.96967L3.89705 4.05379Z"
            fill="#212121"
          />
        </svg>
      </button>
      <div className="w-[65px] absolute right-5 top-5 h-11 px-5 py-3 bg-white rounded-full shadow justify-start items-start gap-2.5 inline-flex">
        <div
          className="text-sm font-semibold leading-tight text-center"
          onClick={onSubmit}
          onKeyDown={onSubmit}
          role="presentation"
        >
          완료
        </div>
      </div>
      <div
        ref={divRef}
        style={{
          backgroundImage: `url(${canvasData.canvasURL})`,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          width: canvasData.canvasWidth,
          height: canvasData.canvasHeight,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          maxWidth: '95vw',
          maxHeight: '68vh',
          borderRadius: '20px',
          marginTop: '20px',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: `${canvasSize.width}px`,
            height: `${canvasSize.height}px`,
            maxWidth: '95vw',
            maxHeight: '68vh',
          }}
        ></canvas>
        <div className="w-full">
          <ColorAndLineModal
            isColorMode={isColorMode}
            lineWidth={lineWidth}
            onLineWidthChange={onLineWidthChange}
            onColorPlateClick={onColorPlateClick}
          />
        </div>
        <BottomButtons
          onDrawMode={onDrawMode}
          onErase={onErase}
          setIsColorMode={setIsColorMode}
        />
      </div>
    </div>
  );
};

type ColorAndLineModalProps = {
  isColorMode: boolean;
  lineWidth: number;
  onLineWidthChange: (e: number) => void;
  onColorPlateClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const ColorAndLineModal = ({
  isColorMode,
  lineWidth,
  onLineWidthChange,
  onColorPlateClick,
}: ColorAndLineModalProps) => {
  console.log('isColorMode: ', isColorMode);
  return (
    <div className="w-full mt-5 h-[7vh] bg-hoverGray bg-opacity-20 rounded-xl backdrop-blur-[80px]">
      {isColorMode ? (
        <div className="flex flex-row items-center w-full h-full gap-2">
          {COLOR_PLATE.map((color) => {
            return (
              <div
                role="presentation"
                onClick={(e) => onColorPlateClick(e)}
                key={color}
                style={{ backgroundColor: color }}
                className="w-6 h-6 border border-white rounded-full border-opacity-40"
              />
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full gap-4">
          <div className="w-7 h-7 p-2 bg-white rounded-full shadow justify-start items-start gap-2.5 inline-flex">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.89705 2.05379L1.96967 1.96967C2.23594 1.7034 2.6526 1.6792 2.94621 1.89705L3.03033 1.96967L6 4.939L8.96967 1.96967C9.26256 1.67678 9.73744 1.67678 10.0303 1.96967C10.3232 2.26256 10.3232 2.73744 10.0303 3.03033L7.061 6L10.0303 8.96967C10.2966 9.23594 10.3208 9.6526 10.1029 9.94621L10.0303 10.0303C9.76406 10.2966 9.3474 10.3208 9.05379 10.1029L8.96967 10.0303L6 7.061L3.03033 10.0303C2.73744 10.3232 2.26256 10.3232 1.96967 10.0303C1.67678 9.73744 1.67678 9.26256 1.96967 8.96967L4.939 6L1.96967 3.03033C1.7034 2.76406 1.6792 2.3474 1.89705 2.05379L1.96967 1.96967L1.89705 2.05379Z"
                fill="#212121"
              />
            </svg>
          </div>
          <div className="w-[70%] h-1/2 mt-1">
            <Slider
              defaultValue={lineWidth}
              max={10}
              min={1}
              step={0.1}
              value={lineWidth}
              tooltip={{
                open: false,
              }}
              style={{
                display: 'flex',
                margin: 'auto 0',
              }}
              handleStyle={{
                width: '24px',
                height: '24px',
                background: 'white',
                border: '3px solid #212121',
                borderRadius: '9999px',
              }}
              trackStyle={{
                backgroundColor: '#212121',
                marginTop: '2px',
                height: '12px',
                borderRadius: '9999px',
              }}
              railStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.24)',
                marginTop: '2px',
                height: '12px',
                borderRadius: '9999px',
              }}
              onChange={(e) => onLineWidthChange(e)}
            />
          </div>
          <div className="w-4 h-4">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.6001 3.60001C1.6001 3.3791 1.77918 3.20001 2.0001 3.20001H14.0001C14.221 3.20001 14.4001 3.3791 14.4001 3.60001C14.4001 3.82093 14.221 4.00001 14.0001 4.00001H2.0001C1.77918 4.00001 1.6001 3.82093 1.6001 3.60001ZM1.6001 11.6C1.6001 10.9373 2.13736 10.4 2.8001 10.4H13.2001C13.8628 10.4 14.4001 10.9373 14.4001 11.6C14.4001 12.2628 13.8628 12.8 13.2001 12.8H2.8001C2.13736 12.8 1.6001 12.2628 1.6001 11.6ZM2.4001 6.40001C1.95827 6.40001 1.6001 6.75818 1.6001 7.20001C1.6001 7.64184 1.95827 8.00001 2.4001 8.00001H13.6001C14.0419 8.00001 14.4001 7.64184 14.4001 7.20001C14.4001 6.75818 14.0419 6.40001 13.6001 6.40001H2.4001Z"
                fill="#212121"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

type BottomButtonsProps = {
  setIsColorMode: React.Dispatch<React.SetStateAction<boolean>>;
  onDrawMode: () => void;
  onErase: () => void;
};

const BottomButtons = ({
  setIsColorMode,
  onDrawMode,
  onErase,
}: BottomButtonsProps) => {
  return (
    <div className="w-full mt-2 h-[9vh] bg-hoverGray bg-opacity-20 rounded-xl backdrop-blur-[80px] flex flex-row items-center justify-between gap-2 px-4">
      <div className="flex flex-row gap-2">
        <button
          onClick={onDrawMode}
          className="flex items-center justify-center w-10 h-10 border-2 border-white rounded-full bg-mainBlue"
        >
          <div
            className="w-4 h-4 bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: "url('paintButton.png')",
            }}
          />
        </button>
        <button
          onClick={onErase}
          className="flex items-center justify-center w-10 h-10 bg-white rounded-full"
        >
          <EraseIcon />
        </button>
      </div>
      <div className="flex flex-row gap-2">
        <button className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
          <UndoIcon />
        </button>
        <button className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
          <RedoIcon />
        </button>
      </div>
      <div className="flex flex-row gap-2">
        <button className="flex items-center justify-center w-10 h-10 p-3 bg-white rounded-full">
          <MenuIcon />
        </button>
        <button
          onClick={() => setIsColorMode(true)}
          className="flex items-center justify-center w-10 h-10 rounded-full"
        >
          <div
            className="w-10 h-10 bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: "url('colorPalette.png')",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default EditModal;
