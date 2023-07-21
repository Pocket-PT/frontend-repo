/* eslint-disable react/prop-types */
import { ActivityComponentType, useStack } from '@stackflow/react';
import axios from 'axios';
import EditModal from 'components/EditModal';
import Layout from 'components/Layout';
import Message from 'components/Message';
import { FOOTER_HEIGHT, HEADER_HEIGHT } from 'constants/global';
import useInput from 'hooks/useInput';
import useSocket from 'hooks/useSocket';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

interface CanvasData {
  canvasURL: string;
  canvasWidth: number;
  canvasHeight: number;
}

type ChatRoomPageProps = {
  id: string;
};

const ChatRoomPage: ActivityComponentType<ChatRoomPageProps> = ({ params }) => {
  console.log(params);
  const [message, onChangeMessage, setMessage] = useInput('');
  const { handleSubmit } = useForm();
  const [socket] = useSocket('sleact');
  const stack = useStack();

  const { data: chatData, mutate } = useSWR(
    'http://localhost:3095/api/workspaces/sleact/dms/1/chats?perPage=20&page=1',
    fetcher,
    { dedupingInterval: 2000 },
  );

  useEffect(() => {
    console.log('ChatRoomPage', stack);
    // console.log('현재 쌓여진 액티비티들:', stack.activities);
    // console.log('전체 전환 상태:', stack.globalTransitionState);
    // console.log(
    //   '초기에 설정된 Transition Duration 옵션',
    //   stack.transitionDuration,
    // );
  }, [stack]);

  useEffect(() => {
    console.log('socket:', socket);
    socket?.emit('login', { id: 1, channels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] });
  }, [socket]);

  const id = '1';
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  };

  const onValid = () => {
    console.log(message);

    if (message.trim()) {
      axios
        .post(
          `http://localhost:3095/api/workspaces/sleact/dms/${id}/chats`,
          {
            content: message,
          },
          { withCredentials: true },
        )
        .then((res) => {
          console.log(res);
          mutate();
          setMessage('');
        })
        .catch((error) => console.log(error));
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  const onCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const [canvasData, setCanvasData] = useState<CanvasData>({
    canvasURL: '',
    canvasWidth: 0,
    canvasHeight: 0,
  });

  const handleCapture = useCallback(
    (ref: RefObject<HTMLVideoElement> | null) => {
      const playerElement = ref?.current;
      const scale = 0.5;
      if (playerElement) {
        const canvas = document.createElement('canvas');
        const canvas2d = canvas.getContext('2d');
        canvas.width = playerElement.videoWidth * scale;
        canvas.height = playerElement.videoHeight * scale;
        canvas2d?.drawImage(playerElement, 0, 0, canvas.width, canvas.height);

        const img = document.createElement('img');
        img.src = canvas.toDataURL();
        console.log(canvas.toDataURL());
        setCanvasData({
          canvasURL: canvas.toDataURL(),
          canvasWidth: canvas.width,
          canvasHeight: canvas.height,
        });
      }
      setModalOpen(true);
    },
    [],
  );

  const videoTest = [1, 2, 3].map((v) => {
    return {
      number: v,
      //ref callback으로 수정해야함
      ref: useRef<HTMLVideoElement>(null),
    };
  });

  return (
    <Layout title={`회원넘버 : ${params.id}`} hasFooter={false}>
      <div className="box-border w-full mx-auto mt-2 overflow-hidden bg-white">
        <Scrollbars
          autoHide
          autoHeight
          autoHeightMin={`calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px - 8px)`}
        >
          {chatData &&
            [...chatData].reverse()?.map((item) => (
              <div className="mb-2 mr-4" key={item.id}>
                <Message message={item.content} />
              </div>
            ))}
          {videoTest.map((v) => (
            <Message
              key={v.number}
              message=""
              videoSrc="sample-baduck.mp4"
              handleCapture={() => handleCapture(v.ref)}
              videoRef={v.ref}
            />
          ))}
        </Scrollbars>
        {modalOpen ? (
          <EditModal canvasData={canvasData} onCloseModal={onCloseModal} />
        ) : null}
        <form
          className="fixed inset-x-0 bottom-0 h-10 mx-auto"
          onSubmit={handleSubmit(onValid)}
          name="message"
        >
          <input
            type="text"
            className="w-full h-full pl-6 bg-lightGray"
            value={message}
            onChange={onChangeMessage}
          />
          <button
            onClick={onClick}
            className="absolute inset-y-0 flex text-xl bg-none left-2 place-items-center text-gray hover:text-dark"
          >
            +
          </button>
          <div className="absolute inset-y-0 right-0 flex">
            <button
              type="submit"
              className="px-3 text-white text-md bg-mainPurple focus:ring-2 focus:ring-offset-2 focus:ring-mainPurple hover:bg-mainPurple"
            >
              &rarr;
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChatRoomPage;
