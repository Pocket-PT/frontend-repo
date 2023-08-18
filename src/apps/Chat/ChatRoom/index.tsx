/* eslint-disable react/prop-types */
import { ActivityComponentType } from '@stackflow/react';
import EditModal from 'components/EditModal';
import Layout from 'components/Layout';
import { PUB_URL } from 'constants/global';
import useInput from 'hooks/useInput';
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSocket from 'hooks/useSocket';
import React from 'react';
import useMessageStore from 'stores/message';
import useUser from 'hooks/useUser';
import AddIcon from 'icons/AddIcon';
import ArrowUpIcon from 'icons/ArrowUpIcon';
import MyDropzone from 'components/MyDropzone';
import ImageIcon from 'icons/ImageIcon';
import usePostFile from 'hooks/usePostFile';
import BackIcon from 'icons/BackIcon';
import MenuIcon from 'icons/MenuIcon';
import useMessageInfiniteQuery from 'apis/useMessageInfiniteQuery';
import ChatList from 'components/ChatList';
import usePushToPage from 'hooks/usePushToPage';

interface CanvasData {
  canvasURL: string;
  canvasWidth: number;
  canvasHeight: number;
}

type ChatRoomPageProps = {
  id: string;
};

type CreateMessageProps = {
  postFile: (file: FormData) => void;
  publish: (url: string, message: string) => void;
  fileContainerOpen: boolean;
  setFileContainerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateMessage = React.memo(function CreateMessage({
  publish,
  postFile,
  fileContainerOpen,
  setFileContainerOpen,
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
      setFileContainerOpen(!fileContainerOpen);
    },
    [fileContainerOpen],
  );

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!e.nativeEvent.isComposing && e.key === 'Enter') {
      if (message.trim() === '') return;
      e.preventDefault();
      handleSubmit(onValid)();
    }
  };

  return (
    <div className="w-full bg-white -top-1">
      <form
        className="flex flex-row w-full h-auto"
        onSubmit={handleSubmit(onValid)}
        name="message"
      >
        <button
          onClick={onClick}
          className="flex items-center justify-center w-12 h-12 text-white rounded-full bg-[#FAFAFA]"
        >
          <div className="w-6 h-6 text-gray">
            <AddIcon />
          </div>
        </button>
        <input
          type="text"
          className="w-[80%] h-12 ml-3 bg-hoverGray rounded-[30px] pl-4"
          value={message}
          onChange={onChangeMessage}
          onKeyDown={handleKeyPress}
          placeholder="채팅 입력"
        />
        <button
          type="submit"
          className="rounded-full absolute right-8 top-[9px] w-8 h-8 bg-[#EEEEEE] flex justify-center items-center"
        >
          <div className="text-white">
            <ArrowUpIcon />
          </div>
        </button>
      </form>
      {fileContainerOpen && (
        <div className="box-border w-full p-3 bg-white h-44">
          <MyDropzone postFile={postFile}>
            <div className="w-14 h-14">
              <div className="flex items-center justify-center w-full h-full pl-px text-white rounded-full bg-mainBlue">
                <ImageIcon />
              </div>
              <div className="mt-1 text-sm text-center">앨범</div>
            </div>
          </MyDropzone>
        </div>
      )}
    </div>
  );
});

const ChatRoomPage: ActivityComponentType<ChatRoomPageProps> = ({ params }) => {
  // const { data: messageData, refetch, isError } = useMessagesQuery(+params.id);
  const messageData = useMessageInfiniteQuery(+params.id);
  const { data: userData } = useUser();
  const { messages: newMessageData, resetMessages } = useMessageStore();
  const { mutate } = usePostFile(+params.id);
  const [fileContainerOpen, setFileContainerOpen] = useState(false);
  const { pop } = usePushToPage();

  // console.log('message: ', messageData?.data.chattingMessageGetResponseList);
  console.log('messageInfiniteData: ', messageData.data);
  console.log('newMessageData: ', newMessageData);
  const { client, publish } = useSocket();
  const clientRef = useRef<unknown>(null);

  useEffect(() => {
    // 웹소켓 연결이 없는 경우에만 새로운 웹소켓을 생성하고 연결합니다.
    if (!clientRef.current) {
      console.log('create new websocket');
      client?.activate();
      clientRef.current = client;
      messageData.refetch();
    }

    //컴포넌트가 언마운트되면 웹소켓 연결을 종료합니다.
    return () => {
      if (clientRef.current) {
        client?.deactivate();
        resetMessages();
      }
    };
  }, [publish]);
  console.log('hasNextPage: ', messageData.hasNextPage);
  console.log('isLoading: ', messageData.isLoading);

  const [modalOpen, setModalOpen] = useState(false);

  const onCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const [canvasData, setCanvasData] = useState<CanvasData>({
    canvasURL: '',
    canvasWidth: 0,
    canvasHeight: 0,
  });

  const postFile = useCallback((file: FormData) => {
    mutate(file);
  }, []);

  if (messageData.isError) {
    return <div>에러가 발생했습니다. 캐시된 데이터입니다</div>;
  }

  if (messageData.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout hasFooter={false}>
      <div className="box-border w-full mx-auto overflow-hidden">
        <div className="flex flex-row items-center w-full h-16 px-5 bg-hoverGray">
          <div
            className="w-6 h-6"
            onClick={() => pop()}
            onKeyDown={() => pop()}
            role="presentation"
          >
            <BackIcon />
          </div>
          <img
            className="ml-5 rounded-full w-11 h-11"
            src={userData?.data.profilePictureUrl}
            alt="#"
          />
          <div className="ml-3 space-y-1">
            <div className="text-base font-bold leading-tight">
              {userData?.data.name}
            </div>
            <div className="text-xs font-normal leading-none text-gray">
              {userData?.data.email}
            </div>
          </div>
          <div className="absolute w-6 h-6 text-dark right-5">
            <MenuIcon />
          </div>
        </div>
        <ChatList
          userData={userData}
          messageData={messageData}
          postFile={postFile}
          setCanvasData={setCanvasData}
          setModalOpen={setModalOpen}
          fileContainerOpen={fileContainerOpen}
        />
        {modalOpen ? (
          <EditModal canvasData={canvasData} onCloseModal={onCloseModal} />
        ) : null}
        <div className="fixed w-full transition-all bottom-2">
          <CreateMessage
            postFile={postFile}
            publish={publish}
            fileContainerOpen={fileContainerOpen}
            setFileContainerOpen={setFileContainerOpen}
          />
        </div>
      </div>
    </Layout>
  );
};

export default React.memo(ChatRoomPage);
