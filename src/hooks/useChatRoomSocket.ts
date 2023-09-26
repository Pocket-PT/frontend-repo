import { Client } from '@stomp/stompjs';
import useChatRoomQuery from 'apis/useChatRoomQuery';
import { SUB_CHATROOM_URL } from 'constants/global';
import { useCallback, useEffect, useRef } from 'react';
import useMessageStore from 'stores/message';
import useTokenStore from 'stores/token';
import WebSocket from 'ws';

Object.assign(global, WebSocket);

const useChatRoomSocket = (accountId: number | undefined) => {
  const { token } = useTokenStore();
  const { setUpdateChatRoom } = useMessageStore();
  const { refetch } = useChatRoomQuery();

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
          chatRoomSubscribe(accountId);
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

  const chatRoomSubscribe = useCallback(
    function (accountId: number | undefined) {
      if (ref.current && accountId) {
        ref.current.subscribe(`${SUB_CHATROOM_URL}/${accountId}`, (payload) => {
          console.log('chatRoom sub실행');
          console.log('chatRoom payload:', JSON.parse(payload.body).data);
          setUpdateChatRoom(JSON.parse(payload.body).data);
          refetch();
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

  return { client: ref.current, chatRoomPublish };
};

export default useChatRoomSocket;
