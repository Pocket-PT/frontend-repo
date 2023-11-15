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
import AfterLogin from 'apps/login/AfterLogin';
import IncomePage from 'apps/MyProfilePage/Income';
import Test from 'apps/Test';
import PTManagementPage from 'apps/PTManagementPage';
import CheckSignup from 'apps/login/CheckSignup';
import BookmarkPage from 'apps/Chat/ChatRoom/BookmarkPage';
import FilePage from 'apps/Chat/ChatRoom/FilePage';
import TrainerPage from 'apps/Trainer';
import TrainerApplyPage from 'apps/Trainer/Apply/Index';

const activities = {
  Main,
  OtherProfile,
  MyProfilePage,
  ChatListPage,
  ChatRoomPage,
  BookmarkPage,
  FilePage,
  SignInPage,
  PortfolioPage,
  MyProfileEditPage,
  PricePage,
  IncomePage,
  BeforeLogin,
  AfterLogin,
  CheckSignup,
  PTManagementPage,
  TrainerPage,
  TrainerApplyPage,
  Test,
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
        FilePage: '/chats-rooms/files',
        BookmarkPage: '/chats-rooms/bookmarks',
        SignInPage: '/login',
        PortfolioPage: '/mypage/portfolio',
        MyProfileEditPage: '/mypage/edit',
        PricePage: '/mypage/price',
        IncomePage: '/mypage/income',
        BeforeLogin: '/before-login',
        AfterLogin: '/after-login',
        CheckSignup: '/check-signup',
        PTManagementPage: '/pt-management',
        TrainerPage: '/trainer',
        TrainerApplyPage: '/trainer/apply',
        Test: '/test',
      },
      fallbackActivity: () => 'Main',
      useHash: true,
    }),
  ],
});

export type TypeActivities = typeof activities;

export type TypeActivityKeys = keyof TypeActivities;
