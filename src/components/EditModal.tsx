import { COLOR_PLATE } from 'constants/global';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { saveAsImage } from 'utils/saveImage';
import IconButton from './common/IconButton';
import EditIcon from 'icons/EditIcon';
import EraseIcon from 'icons/EraseIcon';
import ResetIcon from 'icons/ResetIcon';
import UndoIcon from 'icons/UndoIcon';
import RedoIcon from 'icons/RedoIcon';

type EditModalProps = {
  onCloseModal: () => void;
  canvasData: {
    canvasURL: string;
    canvasWidth: number;
    canvasHeight: number;
  };
};

type ColorAndLineModalProps = {
  lineWidth: number;
  onLineWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onColorPlateClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const ColorAndLineModal = ({
  lineWidth,
  onLineWidthChange,
  onColorPlateClick,
}: ColorAndLineModalProps) => {
  return (
    <div className="w-full">
      <input
        className="w-full"
        type="range"
        min={1}
        max={10}
        value={lineWidth}
        onChange={onLineWidthChange}
        step={0.1}
      ></input>
      <div className="flex flex-row w-full gap-2">
        {COLOR_PLATE.map((color) => {
          return (
            <div
              role="presentation"
              onClick={(e) => onColorPlateClick(e)}
              key={color}
              style={{ backgroundColor: color }}
              className={`w-6 h-6 border border-dark cursor-pointer`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

const EditModal = ({ onCloseModal, canvasData }: EditModalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [lineWidth, setLineWidth] = useState(5);
  const [canvasSize, setCanvasSize] = useState({
    width: canvasData.canvasWidth,
    height: canvasData.canvasHeight,
  });
  const [color, setColor] = useState('#000000');
  const img = document.createElement('img');

  useEffect(() => {
    img.src = canvasData.canvasURL;
  }, [canvasData.canvasURL, img]);

  const onLineWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLineWidth(Number(e.target.value));
  };

  const onColorPlateClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setColor(e.currentTarget.style.backgroundColor);
  };

  const onDeleteAll = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      canvas.width = canvasData.canvasWidth;
      canvas.height = canvasData.canvasHeight;
      ctx.lineWidth = lineWidth;
    }
  };

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
    <>
      <div className="fixed inset-0 z-50 bg-white rounded max-w-[540px] max-h-screen w-[90%] h-[90%] m-auto shadow overflow-hidden">
        <div className="w-full h-full">
          <div
            className={`box-border flex flex-row relative justify-center pt-11 max-h-screen mx-auto`}
          >
            <button
              className="absolute flex items-center justify-center w-8 h-8 top-1 right-2 right text-darkGray"
              onClick={onCloseModal}
            >
              X
            </button>
            <div
              ref={divRef}
              style={{
                backgroundImage: `url(${canvasData.canvasURL})`,
                width: canvasData.canvasWidth,
                height: canvasData.canvasHeight,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                maxWidth: 'auto',
                maxHeight: '70vh',
                border: '1px solid blue',
              }}
              className="relative flex flex-col justify-center w-full h-full"
            >
              <canvas
                ref={canvasRef}
                style={{
                  marginTop: '98px',
                  width: `${canvasSize.width}px`,
                  height: `${canvasSize.height}px`,
                  border: '3px solid black',
                  // objectFit: 'contain',
                  maxWidth: 'auto',
                  maxHeight: '70vh',
                }}
              ></canvas>
              <div className="w-full">
                <ColorAndLineModal
                  lineWidth={lineWidth}
                  onLineWidthChange={onLineWidthChange}
                  onColorPlateClick={onColorPlateClick}
                />
              </div>
              <div className="flex flex-row w-3/4 gap-4 mx-auto rounded-full shadow bg-lightGray">
                <button onClick={onDrawMode}>
                  <IconButton width={32} icon={<EditIcon />} />
                </button>
                <button onClick={onErase}>
                  <IconButton width={32} icon={<EraseIcon />} />
                </button>
                <button onClick={onDeleteAll}>
                  <IconButton width={32} icon={<ResetIcon />} />
                </button>
                <div className="w-[1px] h-3/5 my-auto bg-gray"></div>
                <IconButton width={32} icon={<UndoIcon />} />
                <IconButton width={32} icon={<RedoIcon />} />
              </div>
              <button
                className="flex items-center justify-center w-full h-10 py-2 text-white rounded-full shadow bg-mainPurple"
                onClick={onSubmit}
              >
                <div className="mt-1 font-light">전송하기</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 opacity-70 bg-dark"></div>
    </>
  );
};

export default EditModal;
