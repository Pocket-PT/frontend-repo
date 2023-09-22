import { Scrollbars } from 'react-custom-scrollbars-2';
import MyProfileCard from 'components/MyProfileCard';
import { Link } from 'libs/link';
import ProfileCard from 'components/ProfileCard';
import { useEffect } from 'react';
import useMyProfileStore from 'stores/myProfile';
import AddPersonIcon from 'icons/AddPersonIcon';
import Footer from 'components/Footer';
import useMemeberQuery from 'apis/useMemberQuery';
import { AccountQueryResult } from 'apis/useAccountQuery';
import MyLayout from 'components/MyLayout';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import LoadingSpinner from 'components/common/LoadingSpinner';

const MainWrapper = () => {
  return (
    <MyLayout>
      <Main />
    </MyLayout>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Main: React.FC<any> = ({ result }: { result: AccountQueryResult }) => {
  const { data: userData, isLoading, isSuccess, isError } = result;
  // const customerList = Array.from({ length: 100 }, (v, i) => i + 1);
  const { onEditProfileUrl } = useMyProfileStore();
  //const { data: userData, isSuccess, isLoading, isError } = useUser();
  const { data: memberData } = useMemeberQuery({
    select: (response) => response.data,
  });

  useEffect(() => {
    if (isSuccess) {
      onEditProfileUrl(userData?.data.profilePictureUrl ?? '');
    }
  }, [isSuccess]);

  if (isLoading || isError) {
    return (
      <AppScreen>
        <LoadingSpinner />
      </AppScreen>
    );
  }
  //#E9ECF0
  return (
    <div>
      <div className="my-5">
        <Link activityName="MyProfilePage">
          <MyProfileCard
            name={userData?.data.name}
            profileUrl={userData?.data.profilePictureUrl}
          />
        </Link>
      </div>
      {/*회원 리스트 부분*/}
      <div className="w-full bg-white rounded-tl-[32px] rounded-tr-[32px] h-full">
        <div className="pl-5 pt-[30px] text-xl font-bold leading-normal flex flex-row items-center relative w-full">
          회원
          <span className="pl-1 text-xl font-normal leading-normal text-gray">
            {memberData?.data.length}
          </span>
          <div className="absolute text-sm font-semibold leading-tight text-right text-blue-500 right-5">
            <Link activityName="PTManagementPage">
              <div className="flex flex-row items-center space-x-1 text-mainBlue">
                <AddPersonIcon />
                <span>신청목록 조회</span>
              </div>
            </Link>
          </div>
        </div>
        <Scrollbars
          autoHeight
          autoHeightMin="75vh"
          autoHide
          style={{ paddingBottom: 16 }}
        >
          {memberData?.data.map((member) => (
            <Link
              key={member.ptMatchingId}
              activityName="OtherProfile"
              activityParams={{ id: String(member.ptMatchingId) }}
            >
              <div className="flex flex-row mt-8 hover:cursor-pointer">
                <ProfileCard
                  name={member.name}
                  email={member.email}
                  profilePictureUrl={member.profilePictureUrl}
                />
                {/* {customer} */}
              </div>
            </Link>
          ))}
        </Scrollbars>
      </div>
      <Footer />
    </div>
  );
};

export default MainWrapper;
