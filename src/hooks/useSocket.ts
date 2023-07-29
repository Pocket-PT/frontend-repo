import io from 'socket.io-client';
import { useCallback } from 'react';

//const backUrl = 'http://localhost:3095';

const sockets: { [key: string]: SocketIOClient.Socket } = {};

const useSocket = (
  workspace = 'selact',
): [SocketIOClient.Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (workspace) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);

  if (!workspace) {
    return [undefined, disconnect];
  }
  if (!sockets[workspace]) {
    sockets[workspace] = io.connect(`wss://back.pocketpt.shop`, {
      path: '/ws-stomp',
      transports: ['websocket'],
    });
  }

  //   sockets[workspace].emit('hello', 'world');
  //   sockets[workspace].on('message', (data) => {
  //     console.log(data);
  //   });
  //   sockets[workspace].on('dm', (data) => {
  //     console.log(data);
  //   });
  //   sockets[workspace].on('onlineList', (data) => {
  //     console.log(data);
  //   });

  return [sockets[workspace], disconnect];
};

export default useSocket;
