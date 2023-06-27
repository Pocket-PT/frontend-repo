import Link from 'next/link';
import ChatIcon from '../../../public/icons/ChatIcon';
import PersonIcon from '../../../public/icons/PersonIcon';
import ChatList from '@/components/ChatList';

const ChatPage = () => {
  return (
    <div>
      <div>
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
      </div>
    </div>
  );
};

export default ChatPage;
