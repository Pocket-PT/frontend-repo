import Image from 'next/image';

const EditModal = ({
  onCloseModal,
  canvasData,
}: {
  onCloseModal: () => void;
  canvasData: {
    canvasURL: string;
    canvasWidth: number;
    canvasHeight: number;
  };
}) => {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-white rounded max-w-[540px] max-h-screen w-[90%] h-[90%] m-auto shadow">
        <div className="w-full h-full">
          <div
            className={`box-border flex flex-row relative justify-center pt-11 max-h-screen  mx-auto`}
          >
            <button
              className="absolute flex items-center justify-center w-8 h-8 border rounded-full top-1 right-2 right text-gray border-gray"
              onClick={onCloseModal}
            >
              X
            </button>
            <div className="relative flex justify-center">
              <Image
                style={{
                  objectFit: 'contain',
                  maxWidth: 'auto',
                  maxHeight: '70vh',
                }}
                width={canvasData.canvasWidth}
                height={canvasData.canvasHeight}
                src={canvasData.canvasURL}
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 z-40 opacity-50 bg-dark"></div>
    </>
  );
};

export default EditModal;
