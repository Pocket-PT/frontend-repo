/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import { ActivityComponentType } from '@stackflow/react';
import EditModal from 'components/EditModal';
import Layout from 'components/Layout';
import Message from 'components/Message';
import { FOOTER_HEIGHT, HEADER_HEIGHT, PUB_URL } from 'constants/global';
import useInput from 'hooks/useInput';
import {
  KeyboardEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useForm } from 'react-hook-form';
import useMessagesQuery from 'apis/useMessagesQuery';
import useSocket from 'hooks/useSocket';
import React from 'react';
import useMessageStore from 'stores/message';
import { useAccountQuery } from 'apis/useAccountQuery';

interface CanvasData {
  canvasURL: string;
  canvasWidth: number;
  canvasHeight: number;
}

type ChatRoomPageProps = {
  id: string;
};

type CreateMessageProps = {
  publish: (url: string, message: string) => void;
};

const CreateMessage = React.memo(function CreateMessage({
  publish,
}: CreateMessageProps) {
  const [message, onChangeMessage, setMessage] = useInput('');
  const { handleSubmit } = useForm();
  const onValid = useCallback(() => {
    if (message.trim() === '') return;
    publish(`${PUB_URL}/1`, JSON.stringify({ content: message }));
    setMessage('');
  }, [message]);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
    },
    [],
  );
  const handleKeyPress = (e: KeyboardEvent) => {
    if (!e.nativeEvent.isComposing && e.key === 'Enter') {
      if (message.trim() === '') return;
      console.log(e.nativeEvent.isComposing);
      e.preventDefault();
      handleSubmit(onValid)();
    }
  };

  return (
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
        onKeyDown={handleKeyPress}
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
  );
});

const ChatRoomPage: ActivityComponentType<ChatRoomPageProps> = ({ params }) => {
  const { data: messageData, refetch } = useMessagesQuery(+params.id);
  const { data: myData } = useAccountQuery();
  const { messages: newMessageData, resetMessages } = useMessageStore();
  const scrollbarRef = useRef<Scrollbars>(null);
  console.log('message: ', messageData);
  console.log('newMessageData: ', newMessageData);

  const { client, publish } = useSocket();
  const clientRef = useRef<unknown>(null);

  useEffect(() => {
    // 웹소켓 연결이 없는 경우에만 새로운 웹소켓을 생성하고 연결합니다.
    if (!clientRef.current) {
      console.log('create new websocket');
      client?.activate();
      clientRef.current = client;
      refetch();
    }

    //컴포넌트가 언마운트되면 웹소켓 연결을 종료합니다.
    return () => {
      if (clientRef.current) {
        client?.deactivate();
        resetMessages();
      }
    };
  }, [publish]);

  //로딩 및 메세지 추가시 스크롤바를 맨 아래로 이동시킵니다.
  useEffect(() => {
    if (
      messageData?.data &&
      messageData.data.chattingMessageGetResponseList.length >= 1
    ) {
      scrollbarRef.current?.scrollToBottom();
    }
  }, [messageData, newMessageData]);

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
          ref={scrollbarRef}
        >
          {messageData?.data?.chattingMessageGetResponseList.map(
            (item, idx) => (
              <div className="mb-2 mr-4" key={idx}>
                <Message
                  message={item.content}
                  myId={myData?.data.accountId}
                  chatId={item.chattingAccountId}
                  createAt={item.updatedAt}
                  fileUrl={item.fileUrl}
                />
              </div>
            ),
          )}
          {newMessageData.map((item, idx) => (
            <div className="mb-2 mr-4" key={idx}>
              <Message
                message={item.message}
                myId={myData?.data.accountId}
                chatId={item.chattingAccountId}
                createAt={item.createAt}
                fileUrl={null}
              />
            </div>
          ))}
          {/* {videoTest.map((v) => (
            <Message
              key={v.number}
              message={null}
              fileUrl="sample-baduck.mp4"
              handleCapture={() => handleCapture(v.ref)}
              videoRef={v.ref}
            />
          ))} */}
        </Scrollbars>
        {modalOpen ? (
          <EditModal canvasData={canvasData} onCloseModal={onCloseModal} />
        ) : null}
        <CreateMessage publish={publish} />
      </div>
    </Layout>
  );
};

export default React.memo(ChatRoomPage);
