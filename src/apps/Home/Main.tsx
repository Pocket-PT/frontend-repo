import { Scrollbars } from 'react-custom-scrollbars-2';
import MyProfileCard from 'components/MyProfileCard';
import { Link } from 'libs/link';
import ProfileCard from 'components/ProfileCard';
import { useEffect } from 'react';
import useMyProfileStore from 'stores/myProfile';
import AddPersonIcon from 'icons/AddPersonIcon';
import Footer from 'components/Footer';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import useUser from 'hooks/useUser';

const Main = () => {
  const customerList = Array.from({ length: 100 }, (v, i) => i + 1);
  const { onEditProfileUrl } = useMyProfileStore();
  const { data, isSuccess, isLoading, isError } = useUser();
  useEffect(() => {
    if (isSuccess) {
      onEditProfileUrl(data?.data.profilePictureUrl ?? '');
    }
  }, [isSuccess]);

  if (isLoading || isError) {
    return <div>Loading...</div>;
  }

  return (
    <AppScreen backgroundColor="#E9ECF0">
      <div>
        <div className="my-5">
          <Link activityName="MyProfilePage">
            <MyProfileCard
              name={data?.data.name}
              profileUrl={data?.data.profilePictureUrl}
            />
          </Link>
        </div>
        {/*회원 리스트 부분*/}
        <div className="w-full bg-white rounded-tl-[32px] rounded-tr-[32px] h-full">
          <div className="pl-5 pt-[30px] text-xl font-bold leading-normal flex flex-row items-center relative w-full">
            회원
            <span className="pl-1 text-xl font-normal leading-normal text-gray">
              129
            </span>
            <div className="absolute text-sm font-semibold leading-tight text-right text-blue-500 right-5">
              <div className="flex flex-row items-center space-x-1 text-gray text-opacity-40">
                <AddPersonIcon />
                <span>회원 추가</span>
              </div>
            </div>
          </div>
          <Scrollbars
            autoHeight
            autoHeightMin="75vh"
            autoHide
            style={{ paddingBottom: 16 }}
          >
            {customerList.map((customer) => (
              <Link
                key={customer}
                activityName="OtherProfile"
                activityParams={{ id: String(customer) }}
              >
                <div className="flex flex-row mt-8 hover:cursor-pointer">
                  <ProfileCard />
                  {/* {customer} */}
                </div>
              </Link>
            ))}
          </Scrollbars>
        </div>
        <Footer />
      </div>
    </AppScreen>
  );
};

export default Main;
