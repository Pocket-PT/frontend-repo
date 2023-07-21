import { useStack } from '@stackflow/react';
import DMList from 'components/DMList';
import Layout from 'components/Layout';
import { Link } from 'libs/link';
import { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

const ChatListPage = () => {
  const stack = useStack();
  const testList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { data: userData } = useSWR('http://localhost:3095/api/users', fetcher);

  useEffect(() => {
    console.log('ChatListPage', stack);
  }, []);

  console.log('userData:', userData);

  return (
    <Layout title="ChatList">
      <div className="w-full">
        {testList.map((item) => (
          <Link
            key={item}
            activityName="ChatRoomPage"
            activityParams={{ id: String(item) }}
          >
            <DMList />
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default ChatListPage;
