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
import useMyActivity from 'hooks/useMyActivity';
import { StaticImage } from 'gatsby-plugin-image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

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
  const { activity } = useMyActivity();
  const myRole = userData?.data.role;
  const myProfileRef = useRef<HTMLDivElement>(null);
  const memberTitleRef = useRef<HTMLDivElement>(null);
  const [refHeights, setRefHeights] = useState<number[]>([]);
  const [isRefLoading, setIsRefLoading] = useState<boolean>(true);
  const { data: memberData, isLoading: memberLoading } = useMemeberQuery(
    'active',
    {
      select: (response) => response.data,
    },
  );
  const { data: pendingData, isLoading: pendingLoading } = useMemeberQuery(
    'pending',
    {
      select: (response) => response.data,
    },
  );

  const trainerData = [
    {
      id: 1,
      name: '이장민1',
      profileUrl: 'trainer-lee.jpeg',
      introduce: 'IFBB PRO',
    },
    {
      id: 2,
      name: '이장민2',
      profileUrl: 'trainer-lee.jpeg',
      introduce: 'IFBB PRO',
    },
    {
      id: 3,
      name: '이장민3',
      profileUrl: 'trainer-lee.jpeg',
      introduce: 'IFBB PRO',
    },
  ];

  useEffect(() => {
    console.log('Main setFirstHistory');
    //setFirstHistory(history.length);
  }, []);

  const resetStack = () => {
    console.log('resetStack');
  };

  useEffect(() => {
    if (activity.transitionState === 'enter-done') {
      console.log('Main resetStack');
      resetStack();
    }
  }, [activity]);

  useEffect(() => {
    if (myProfileRef.current && memberTitleRef.current) {
      setRefHeights([
        myProfileRef.current?.offsetHeight ?? 0,
        memberTitleRef.current?.offsetHeight ?? 0,
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
  console.log(refHeights);
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
        <div className="w-full bg-white rounded-tl-[32px] rounded-tr-[32px] h-[100vh]">
          <div
            className="pl-5 pt-[30px] text-xl font-bold leading-normal flex flex-row items-center relative w-full"
            ref={memberTitleRef}
          >
            회원
            <span className="pl-1 text-xl font-normal leading-normal text-gray">
              {memberData?.data.length}
            </span>
            {myRole === 'trainer' ? (
              <div className="absolute text-sm font-semibold leading-tight text-right right-5">
                <Link activityName="PTManagementPage">
                  <div className="flex flex-row items-center space-x-1 text-mainBlue">
                    <AddPersonIcon />
                    <span>신청목록 조회</span>
                  </div>
                </Link>
              </div>
            ) : null}
          </div>
          {isRefLoading ? (
            <LoadingSpinner />
          ) : (
            <Scrollbars
              autoHeight
              autoHeightMin={`calc(100vh - ${refHeights[0]}px - ${refHeights[1]}px - ${FOOTER_HEIGHT}px - 1.25rem - 30px)`}
              autoHide
            >
              {pendingLoading ? (
                <LoadingSpinner />
              ) : (
                pendingData?.data.map((member) => {
                  return (
                    <div
                      className="flex flex-row mt-8 bg-white hover:cursor-pointer"
                      key={member.ptMatchingId}
                    >
                      <ProfileCard
                        name={member.name}
                        email={member.email}
                        profilePictureUrl={member.profilePictureUrl}
                      />
                    </div>
                  );
                })
              )}
              {memberData?.data.map((member) => {
                return (
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
                    <div className="flex flex-row mt-8 bg-white hover:cursor-pointer">
                      <ProfileCard
                        name={member.name}
                        email={member.email}
                        profilePictureUrl={member.profilePictureUrl}
                      />
                    </div>
                  </Link>
                );
              })}
              {myRole === 'trainer' ? null : (
                <>
                  <Swiper
                    slidesPerView={2}
                    spaceBetween={150}
                    centeredSlides={true}
                    style={{ marginTop: '24px' }}
                  >
                    {trainerData.map((trainer) => {
                      return (
                        <SwiperSlide key={trainer.id}>
                          <div className="flex flex-col items-center justify-center w-full h-full">
                            <Link
                              activityName="TrainerPage"
                              activityParams={{
                                name: trainer.name,
                                introduce: trainer.introduce,
                                profileUrl: trainer.profileUrl,
                              }}
                            >
                              <TrainerCard
                                name={trainer.name}
                                introduce={trainer.introduce}
                                profileUrl={trainer.profileUrl}
                              />
                            </Link>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </>
              )}
            </Scrollbars>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

type TrainerCardProps = {
  name: string;
  introduce: string;
  profileUrl: string;
};

const TrainerCard = ({ name, introduce, profileUrl }: TrainerCardProps) => {
  return (
    <div className="w-[66vw] h-[41vh] shadow-md relative top-0 left-0">
      <button className="relative w-full h-full group">
        <StaticImage
          src="../../../static/card-gradient.png"
          alt="trainer-overlay"
          className="w-full h-full z-10 rounded-[10px]"
          objectFit="fill"
        />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <img
            className="w-full h-full rounded-[10px] transform duration-500 ease-in-out group-active:scale-90"
            src={profileUrl}
            alt="trainer-profile"
          />
        </div>
      </button>
      <div className="absolute z-10 space-y-1 bottom-4 left-3">
        <div>
          <div className="text-xl font-extrabold leading-normal text-white">
            {name} 트레이너
          </div>
          <div className="ml-1 text-xs font-medium leading-normal text-white">
            {introduce}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainWrapper;
