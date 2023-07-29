import ChatRoomPage from 'apps/Chat/ChatRoom';
import ChatListPage from 'apps/Chat';
import MyProfilePage from 'apps/MyProfilePage';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
import { stackflow } from '@stackflow/react';
import Main from 'apps/Home/Main';
import OtherProfile from 'apps/Home/OtherProfile';
import SignInPage from 'apps/login';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import PortfolioPage from 'apps/MyProfilePage/Portfolio';
import MyProfileEditPage from 'apps/MyProfilePage/Edit';
import PricePage from 'apps/MyProfilePage/Price';
import BeforeLogin from 'apps/login/BeforeLogin';

const activities = {
  Main,
  OtherProfile,
  MyProfilePage,
  ChatListPage,
  ChatRoomPage,
  SignInPage,
  PortfolioPage,
  MyProfileEditPage,
  PricePage,
  BeforeLogin,
};

export const { Stack, useStepFlow } = stackflow({
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
        OtherProfile: '/other-profile',
        MyProfilePage: '/mypage',
        ChatListPage: '/chats',
        ChatRoomPage: '/chats-rooms',
        SignInPage: '/login',
        PortfolioPage: '/mypage/portfolio',
        MyProfileEditPage: '/mypage/edit',
        PricePage: '/mypage/price',
        BeforeLogin: '/before-login',
      },
      fallbackActivity: () => 'Main',
      useHash: true,
    }),
  ],
});

export type TypeActivities = typeof activities;

export type TypeActivityKeys = keyof TypeActivities;
