import { Client } from '@stomp/stompjs';
import { PUB_CHATROOM_URL, SUB_URL } from 'constants/global';
import { createRef, useCallback, useEffect, useRef } from 'react';
import useMessageStore from '../stores/message';
import useTokenStore from '../stores/token';
import WebSocket from 'ws';
import { classifyUrl } from 'utils/classifyUrl';

Object.assign(global, WebSocket);

const useSocket = (
  chatRoomId: number | undefined,
  accountId: number | undefined,
) => {
  const { token } = useTokenStore();
  const { setMessages } = useMessageStore();

  const ref = useRef<Client>();
  console.log('ref: ', ref.current);
  useEffect(() => {
    if (!ref.current) {
      ref.current = new Client({
        brokerURL: 'wss://back.pocketpt.shop/ws-stomp',
        connectHeaders: {
          login: 'admin',
          passcode: 'adminnnn',
          Authorization: `Bearer ${token}`,
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 1000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: (frame) => {
          console.log('Connected: ' + frame);
          console.log('onConnect실행');
          channelSubscribe(chatRoomId);
        },
        onWebSocketClose: (frame) => {
          console.log('onWebSocketClose실행');
          console.log('WebSocket Close: ' + frame);
        },
        onWebSocketError: (frame) => {
          console.log('onWebSocketError실행');
          console.log('WebSocket Error: ' + frame);
        },
        onStompError(frame) {
          // Will be invoked in case of error encountered at Broker
          // Bad login/passcode typically will cause an error
          // Complaint brokers will set `message` header with a brief message. Body may contain details.
          // Compliant brokers will terminate the connection after any error
          console.log('Broker reported error: ' + frame.headers['message']);
          console.log('Additional details: ' + frame.body);
        },
      });
      ref.current.activate();
    }

    return () => {
      if (ref.current) {
        ref.current.deactivate();
      }
    };
  }, []);

  console.log('useSocket실행');

  const channelSubscribe = useCallback(
    function (chatRoomId: number | undefined) {
      if (ref.current && chatRoomId) {
        ref.current.subscribe(`${SUB_URL}/${chatRoomId}`, (payload) => {
          //console.log(`Received: ${payload}`);
          console.log(JSON.parse(payload.body).data.content);
          const data = JSON.parse(payload.body).data;
          console.log('channel sub실행', data, chatRoomId);
          if (data.content === null) {
            const uri = classifyUrl(data.fileUrl, data.content);

            setMessages({
              message: data.content,
              fileUrl: data.fileUrl,
              chattingAccountId: data.chattingAccountId,
              chatMessageId: data.chattingMessageId,
              createAt: data.createdAt,
              ref:
                uri === 'image'
                  ? createRef<HTMLImageElement>()
                  : uri === 'video'
                  ? createRef<HTMLVideoElement>()
                  : createRef<HTMLAnchorElement>(),
            });
          } else {
            setMessages({
              message: data.content,
              fileUrl: data.fileUrl,
              chattingAccountId: data.chattingAccountId,
              chatMessageId: data.chattingMessageId,
              createAt: data.createdAt,
              ref: createRef<HTMLDivElement>(),
            });
          }
          console.log('channel sub실행2', data);
          chatRoomPublish(
            `${PUB_CHATROOM_URL}/${chatRoomId}/accounts/${accountId}/messages/${data.chattingMessageId}`,
            JSON.stringify({ content: '' }),
          );
        });
      }
    },
    [ref.current],
  );

  const publish = useCallback(
    function (destination: string, body: string) {
      if (ref.current) {
        ref.current.publish({
          destination: destination,
          body: body,
        });
      }
    },
    [ref.current],
  );

  const chatRoomPublish = useCallback(
    function (destination: string, body: string) {
      if (ref.current) {
        ref.current.publish({
          destination: destination,
          body: body,
        });
      }
    },
    [ref.current],
  );

  return { client: ref.current, publish, chatRoomPublish };
};

export default useSocket;
