import Link from 'next/link';
import ChatIcon from '../../../public/icons/ChatIcon';
import PersonIcon from '../../../public/icons/PersonIcon';
import DMList from '@/components/DMList';
import Footer from '@/components/Footer';

const ChatPage = async () => {
  const testList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const userData = await fetch('http://localhost:3095/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.log(error));
  console.log('userData:', userData);
  return (
    <div className="w-full">
      {testList.map((item) => (
        <Link href={`/chats/${item}`} key={item}>
          <DMList />
        </Link>
      ))}
      <Footer />
    </div>
  );
};

export default ChatPage;
