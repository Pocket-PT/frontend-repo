import { Client } from '@stomp/stompjs';
import { SUB_URL } from 'constants/global';
import { useCallback, useEffect, useRef } from 'react';
import useMessageStore from 'stores/message';
import useTokenStore from 'stores/token';
import WebSocket from 'ws';

Object.assign(global, WebSocket);

const useSocket = () => {
  const { token } = useTokenStore();
  const { setMessages } = useMessageStore();

  const ref = useRef<Client>(null);
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
          channelSubscribe(1);
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
    function (channel: number) {
      if (ref.current) {
        ref.current.subscribe(`${SUB_URL}/${channel}`, (payload) => {
          console.log('sub실행');
          //console.log(`Received: ${payload}`);
          console.log(JSON.parse(payload.body).data.content);
          const data = JSON.parse(payload.body).data;
          console.log('data.content: ', data.content);
          if (data.content === null) return;
          setMessages({
            message: data.content,
            chattingAccountId: data.chattingAccountId,
            createAt: data.createdAt,
          });
        });
      }
    },
    [ref.current],
  );

  // client.onStompError = function (frame) {
  //   // Will be invoked in case of error encountered at Broker
  //   // Bad login/passcode typically will cause an error
  //   // Complaint brokers will set `message` header with a brief message. Body may contain details.
  //   // Compliant brokers will terminate the connection after any error
  //   console.log('Broker reported error: ' + frame.headers['message']);
  //   console.log('Additional details: ' + frame.body);
  //   disActive();
  // };

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

  // const active = function () {
  //   client.activate();
  // };

  // const disActive = function () {
  //   client.deactivate();
  // };

  return { client: ref.current, publish };
};

export default useSocket;

// client.onConnect = function(){
//   client.subscribe('/sub/channel/1', (message) =>
// console.log(`Received: ${message}`),
// );
// client.publish = function(){
// destination: '/pub/chatting/rooms/2',
// body: 'cotenthelo',
// };
