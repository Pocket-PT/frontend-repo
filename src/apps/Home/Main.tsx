import { Scrollbars } from 'react-custom-scrollbars-2';
import MyProfileCard from 'components/MyProfileCard';
import { Link } from 'libs/link';
import ProfileCard from 'components/ProfileCard';
import Layout from 'components/Layout';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useActivityPreloadRef } from '@stackflow/plugin-preload';
import { ActivityComponentType, useStack } from '@stackflow/react';
import { useEffect } from 'react';
import usePushToPage from 'hooks/usePushToPage';

const Main: ActivityComponentType = () => {
  const preloadRef = useActivityPreloadRef();
  const { moveTo } = usePushToPage();
  console.log(preloadRef);

  const customerList = Array.from({ length: 100 }, (v, i) => i + 1);
  const stack = useStack();

  useEffect(() => {
    console.log('MainPage', stack);
    // console.log('현재 쌓여진 액티비티들:', stack.activities);
    // console.log('전체 전환 상태:', stack.globalTransitionState);
    // console.log(
    //   '초기에 설정된 Transition Duration 옵션',
    //   stack.transitionDuration,
    // );
  }, [stack]);

  return (
    <AppScreen appBar={{ title: 'Main' }}>
      <Layout>
        <div className="mt-4">
          <div
            onClick={() => moveTo('MyProfilePage')}
            onKeyDown={() => moveTo('MyProfilePage')}
            role="presentation"
          >
            <MyProfileCard />
          </div>
          <div className="w-full h-[1px] mt-4 mb-4 bg-lightGray"></div>
          <div className="ml-4 text-[12px] text-darkGray mb-4">
            회원목록 수 : {customerList.length}명
          </div>
          <Scrollbars autoHeight autoHeightMin="73vh" autoHide>
            {customerList.map((customer) => (
              <Link
                key={customer}
                activityName="OtherProfile"
                activityParams={{ id: String(customer) }}
              >
                <div className="flex flex-row h-12 py-4 mb-3 hover:bg-hoverGray hover:cursor-pointer">
                  <ProfileCard />
                  {/* {customer} */}
                </div>
              </Link>
            ))}
          </Scrollbars>
        </div>
      </Layout>
    </AppScreen>
  );
};

export default Main;
