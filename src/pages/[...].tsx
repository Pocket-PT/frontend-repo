import { Router } from '@reach/router';
import Home from 'apps/Home';
import NotFoundPage from 'apps/404';
import MyProfilePage from 'apps/MyProfilePage';
import ChatListPage from 'apps/Chat';
import ChatRoomPage from 'apps/Chat/ChatRoom';
import SignInPage from 'apps/login';
import OtherProfile from 'apps/Home/OtherProfile';

const App = () => {
  return (
    <Router basepath="/">
      <Home path="/" />
      <OtherProfile path="/:id" />
      <MyProfilePage path="/mypage" />
      <ChatListPage path="/chats" />
      <ChatRoomPage path="/chats/:id" />
      <SignInPage path="/login" />
      <NotFoundPage default />
    </Router>
  );
};

export default App;
