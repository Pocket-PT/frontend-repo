import { Scrollbars } from 'react-custom-scrollbars-2';
import MyProfileCard from 'components/MyProfileCard';
import { Link } from 'gatsby';
import ProfileCard from 'components/ProfileCard';
import Layout from 'components/Layout';
import { useFlow } from 'utils/stackflow';
import { AppScreen } from '@stackflow/plugin-basic-ui';

const Main = () => {
  const customerList = Array.from({ length: 100 }, (v, i) => i + 1);
  const { push } = useFlow();

  const onClick = () => {
    push('OtherProfile', { path: '1' });
  };
  return (
    <AppScreen appBar={{ title: 'Main' }}>
      <Layout>
        <div className="mt-4">
          <Link to={'/myprofile'}>
            <MyProfileCard />
          </Link>
          <div className="w-full h-[1px] mt-4 mb-4 bg-lightGray"></div>
          <div className="ml-4 text-[12px] text-darkGray mb-4">
            회원목록 수 : {customerList.length}명ß
          </div>

          <Scrollbars autoHeight autoHeightMin="73vh" autoHide>
            {customerList.map((customer) => (
              <div
                className="flex flex-row h-12 py-4 mb-3 hover:bg-hoverGray hover:cursor-pointer"
                key={customer}
                onClick={onClick}
                onKeyDown={onClick}
                role="presentation"
              >
                <ProfileCard />
                {/* {customer} */}
              </div>
            ))}
          </Scrollbars>
        </div>
      </Layout>
    </AppScreen>
  );
};

export default Main;
