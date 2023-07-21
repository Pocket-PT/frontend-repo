import { Scrollbars } from 'react-custom-scrollbars-2';
import MyProfileCard from 'components/MyProfileCard';
import { Link } from 'libs/link';
import ProfileCard from 'components/ProfileCard';
import Layout from 'components/Layout';
import { useActivityPreloadRef } from '@stackflow/plugin-preload';
import { ActivityComponentType } from '@stackflow/react';

const Main: ActivityComponentType = () => {
  const preloadRef = useActivityPreloadRef();
  console.log(preloadRef);

  const customerList = Array.from({ length: 100 }, (v, i) => i + 1);

  return (
    <Layout title="Main">
      <div className="mt-4">
        <Link activityName="MyProfilePage">
          <MyProfileCard />
        </Link>
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
  );
};

export default Main;
