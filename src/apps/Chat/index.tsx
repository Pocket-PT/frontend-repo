import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useStack } from '@stackflow/react';
import DMList from 'components/DMList';
import Layout from 'components/Layout';
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

  //   useEffect(() => {
  //     console.log('현재 쌓여진 액티비티들:', stack.activities);
  //     console.log('전체 전환 상태:', stack.globalTransitionState);
  //     console.log(
  //       '초기에 설정된 Transition Duration 옵션',
  //       stack.transitionDuration,
  //     );
  //   }, [stack]);

  console.log('userData:', userData);

  return (
    <AppScreen appBar={{ title: 'ChatList' }}>
      <Layout>
        <div className="w-full">
          {testList.map((item) => (
            <DMList key={item} />
          ))}
        </div>
      </Layout>
    </AppScreen>
  );
};

export default ChatListPage;
