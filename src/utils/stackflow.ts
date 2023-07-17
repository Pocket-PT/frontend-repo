import ChatRoomPage from 'apps/Chat/ChatRoom';
import ChatListPage from 'apps/Chat';
import MyProfilePage from 'apps/MyProfilePage';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { stackflow } from '@stackflow/react';
import Main from 'apps/Home/Main';
import OtherProfile from 'apps/Home/OtherProfile';
import SignInPage from 'apps/login';

const activities = {
  Main,
  OtherProfile,
  MyProfilePage,
  ChatListPage,
  ChatRoomPage,
  SignInPage,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export const { Stack } = stackflow({
  transitionDuration: 350,
  activities,
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
    historySyncPlugin({
      routes: {
        Main: '/',
        OtherProfile: '/:id',
        MyProfilePage: '/mypage',
        ChatListPage: '/chats',
        ChatRoomPage: '/chats/:id',
        SignInPage: '/login',
      },
      fallbackActivity: () => 'Main',
    }),
  ],
});

export type TypeActivities = typeof activities;

export type TypeActivityKeys = keyof TypeActivities;
