import { Scrollbars } from 'react-custom-scrollbars-2';
import MyProfileCard from 'components/MyProfileCard';
import { Link } from 'libs/link';
import ProfileCard from 'components/ProfileCard';
import { useEffect, useRef, useState } from 'react';
import AddPersonIcon from 'icons/AddPersonIcon';
import Footer from 'components/Footer';
import useMemeberQuery from 'apis/useMemberQuery';
import { useAccountQuery } from 'apis/useAccountQuery';
import MyLayout from 'components/MyLayout';
import LoadingSpinner from 'components/common/LoadingSpinner';
import { FOOTER_HEIGHT } from 'constants/global';

const MainWrapper = () => {
  return (
    <MyLayout preventSwipeBack={true}>
      <Main />
    </MyLayout>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Main: React.FC<any> = () => {
  const { data: userData, isLoading, isError } = useAccountQuery();
  const myProfileRef = useRef<HTMLDivElement>(null);
  const memberTitleRef = useRef<HTMLDivElement>(null);
  const [refHeights, setRefHeights] = useState<number[]>([]);
  const [isRefLoading, setIsRefLoading] = useState<boolean>(true);
  const { data: memberData, isLoading: memberLoading } = useMemeberQuery({
    select: (response) => response.data,
  });

  useEffect(() => {
    if (myProfileRef.current && memberTitleRef.current) {
      setRefHeights([
        myProfileRef.current?.clientHeight ?? 0,
        memberTitleRef.current?.clientHeight ?? 0,
      ]);
      setIsRefLoading(false);
    }
  }, [
    myProfileRef.current,
    memberTitleRef.current,
    memberData,
    isLoading,
    isError,
  ]);

  if (isLoading || isError) {
    return <LoadingSpinner />;
  }

  //#E9ECF0
  return (
    <div>
      <div className="my-5" ref={myProfileRef}>
        <Link activityName="MyProfilePage">
          <MyProfileCard
            name={userData?.data.name}
            profileUrl={userData?.data.profilePictureUrl}
            introduce={userData?.data.introduce}
          />
        </Link>
      </div>
      {/*회원 리스트 부분*/}
      {memberLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full bg-white rounded-tl-[32px] rounded-tr-[32px] h-full">
          <div
            className="pl-5 pt-[30px] text-xl font-bold leading-normal flex flex-row items-center relative w-full"
            ref={memberTitleRef}
          >
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
          {isRefLoading ? (
            <LoadingSpinner />
          ) : (
            <Scrollbars
              autoHeight
              autoHeightMin={`calc(100vh - ${refHeights[0]}px - ${refHeights[1]}px - ${FOOTER_HEIGHT}px)`}
              autoHide
              style={{ paddingBottom: 16 }}
            >
              {memberData?.data.map((member) => (
                <Link
                  key={member.ptMatchingId}
                  activityName="OtherProfile"
                  activityParams={{
                    ptMatchingId: String(member.ptMatchingId),
                    status: member.status,
                    subscriptionPeriod: String(member.subscriptionPeriod),
                    paymentAmount: String(member.paymentAmount),
                    startDate: String(member.startDate),
                    expiredDate: member.expiredDate,
                    rejectReason: String(member.rejectReason),
                    accountId: String(member.accountId),
                    name: member.name,
                    phoneNumber: member.phoneNumber,
                    email: member.email,
                    profilePictureUrl: member.profilePictureUrl,
                  }}
                >
                  <div className="flex flex-row mt-8 hover:cursor-pointer">
                    <ProfileCard
                      name={member.name}
                      email={member.email}
                      profilePictureUrl={member.profilePictureUrl}
                    />
                  </div>
                </Link>
              ))}
            </Scrollbars>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MainWrapper;
