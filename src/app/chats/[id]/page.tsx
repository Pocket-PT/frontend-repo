<<<<<<< HEAD
<<<<<<< HEAD
'use client';

import Message from '@/components/Message';
import useInput from '@/hooks/useInput';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useSocket from '@/hooks/useSocket';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

const ChatDetailPage = () => {
  const [message, onChangeMessage, setMessage] = useInput('');
  const { register, handleSubmit, reset } = useForm();
  const [socket, disconnect] = useSocket('sleact');

  const { data: chatData, mutate } = useSWR(
    'http://localhost:3095/api/workspaces/sleact/dms/1/chats?perPage=20&page=1',
    fetcher,
    { dedupingInterval: 2000 },
  );

  useEffect(() => {
    console.log('socket:', socket);
    socket?.emit('login', { id: 1, channels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] });
  }, [socket]);
  const id = '1';
  const onClick = (e: any) => {
    e.preventDefault();
  };

  const onValid = (e: any) => {
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
  return (
    <div className="w-full">
      {chatData &&
        [...chatData].reverse()?.map((item) => (
          <div className="mb-2 mr-4" key={item.id}>
            <Message message={item.content} />
          </div>
        ))}
      <form
        className="fixed inset-x-0 bottom-0 h-10 max-w-xl mx-auto"
        onSubmit={handleSubmit(onValid)}
        name="message"
      >
        <input
          type="text"
          className="w-full h-full bg-lightGray"
          value={message}
          onChange={onChangeMessage}
        />
        <button
          onClick={onClick}
          className="absolute inset-y-0 flex text-xl bg-none left-2 place-items-center text-gray hover:text-dark"
        >
          #
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
=======
=======
'use client';

>>>>>>> 214a354 (feat: chat 전송, 수신 기능 구현)
import Message from '@/components/Message';
import useInput from '@/hooks/useInput';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useSocket from '@/hooks/useSocket';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

const ChatDetailPage = () => {
  const [message, onChangeMessage, setMessage] = useInput('');
  const { register, handleSubmit, reset } = useForm();
  const [socket, disconnect] = useSocket('sleact');

  const { data: chatData, mutate } = useSWR(
    'http://localhost:3095/api/workspaces/sleact/dms/1/chats?perPage=20&page=1',
    fetcher,
    { dedupingInterval: 2000 },
  );

  useEffect(() => {
    console.log('socket:', socket);
    socket?.emit('login', { id: 1, channels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] });
  }, [socket]);
  const id = '1';
  const onClick = (e: any) => {
    e.preventDefault();
  };

  const onValid = (e: any) => {
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
  return (
    <div className="w-full">
      {chatData &&
        [...chatData].reverse()?.map((item) => (
          <div className="mb-2 mr-4" key={item.id}>
            <Message message={item.content} />
          </div>
        ))}
      <form
        className="fixed inset-x-0 bottom-0 h-10 max-w-xl mx-auto"
        onSubmit={handleSubmit(onValid)}
        name="message"
      >
        <input
          type="text"
          className="w-full h-full bg-lightGray"
          value={message}
          onChange={onChangeMessage}
        />
        <button
          onClick={onClick}
          className="absolute inset-y-0 flex text-xl bg-none left-2 place-items-center text-gray hover:text-dark"
        >
          #
        </button>
        <div className="absolute inset-y-0 right-0 flex">
          <button
            type="submit"
            className="px-3 text-white text-md bg-mainPurple focus:ring-2 focus:ring-offset-2 focus:ring-mainPurple hover:bg-mainPurple"
          >
            &rarr;
          </button>
        </div>
<<<<<<< HEAD
      ))}
>>>>>>> c39ae44 (feat: ChatDetail 컴포넌트 구현)
=======
      </form>
>>>>>>> 214a354 (feat: chat 전송, 수신 기능 구현)
    </div>
  );
};

export default ChatDetailPage;
