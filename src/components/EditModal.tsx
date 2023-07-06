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
      <div className="fixed inset-0 z-50 flex pt-6 justify-center bg-white rounded max-w-[540px] max-h-screen w-[90%] h-[90%] m-auto shadow">
        <div className="flex flex-col">
          <div className={`w-full h-full`}>
            <Image
              width={canvasData.canvasWidth}
              height={canvasData.canvasHeight}
              src={canvasData.canvasURL}
              alt="image"
            />
          </div>
          <button onClick={onCloseModal}>닫기</button>
        </div>
      </div>
      <div className="fixed inset-0 z-40 opacity-50 bg-dark"></div>
    </>
  );
};

export default EditModal;
