/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { ActivityComponentType, useStack } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import ChatIcon from 'icons/ChatIcon';
import TelIcon from 'icons/TelIcon';
import SmsIcon from 'icons/SmsIcon';
import BottomWhitePlain from 'components/common/BottomWhitePlain';
import BackIcon from 'icons/BackIcon';
import MoreIcon from 'icons/MoreIcon';
import usePushToPage from 'hooks/usePushToPage';
import { Link } from 'libs/link';
import useMemeberQuery, { MemberData } from 'apis/useMemberQuery';
import LoadingSpinner from 'components/common/LoadingSpinner';
import MyLayout from 'components/MyLayout';

type OtherProfileProps = {
  id: string;
};

const OtherProfileWrapper: ActivityComponentType<OtherProfileProps> = ({
  params,
}) => {
  return (
    <MyLayout hasFooter={false}>
      <OhterProfile params={params} />
    </MyLayout>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OhterProfile: React.FC<any> = ({
  params,
}: {
  params: { id: string };
}) => {
  const stack = useStack();
  const { pop } = usePushToPage();
  const { data: memberData, isLoading } = useMemeberQuery<MemberData>({
    select: (res) =>
      res.data.data.filter((member) => member.ptMatchingId === +params.id)[0],
  });

  useEffect(() => {
    console.log('OtherProfilePage', stack);
  }, [stack]);

  if (isLoading) {
    <LoadingSpinner />;
  }

  return (
    <AppScreen backgroundColor="#E9ECF0">
      <button
        className="absolute z-10 w-6 h-6 text-white top-5 left-5"
        onClick={() => pop()}
      >
        <BackIcon />
      </button>
      <div className="overflow-hidden h-[100vh]">
        <div
          className="absolute w-full h-full bg-center bg-repeat bg-cover -z-10"
          style={{
            backgroundImage: "url('otherprofile-background.png')",
          }}
        />
        <div className="absolute text-white right-5 top-5">
          <MoreIcon />
        </div>
        <div className="w-full h-[46vh] flex-col justify-start items-center gap-4 inline-flex relative mb-5 mt-5">
          <img
            className="w-1/3 rounded-full h-1/3"
            src={memberData?.profilePictureUrl}
            alt="#"
          />
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="w-full text-2xl font-extrabold leading-7 text-center text-white">
              {memberData?.name}
            </div>
            <div className="w-[280px] text-center text-white text-opacity-60 text-xs font-normal leading-none">
              {memberData?.email}
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-2.5 flex">
            <div className="w-full h-[8vh] bg-dark bg-opacity-20 pl-5 rounded-xl box-border py-5">
              <div className="text-xs font-normal leading-none text-white text-opacity-60">
                회원 등록 기간
              </div>
              <div className="mt-1 text-sm font-semibold leading-tight text-white">
                2023년 05월 17일 ~ 2023년 08월 17일
              </div>
            </div>
            <div className="justify-start items-start gap-2.5 inline-flex">
              <Link
                activityName="ChatRoomPage"
                activityParams={{ id: params.id }}
              >
                <div className="w-[28vw] h-[72px] relative bg-dark bg-opacity-20 rounded-xl flex justify-center items-center gap-2 flex-col">
                  <div className="w-6 h-6 text-white">
                    <ChatIcon />
                  </div>
                  <div className="w-[28vw] text-center text-white text-xs font-medium leading-none">
                    채팅
                  </div>
                </div>
              </Link>
              <div className="w-[28vw] h-[72px] relative bg-dark bg-opacity-20 rounded-xl flex justify-center items-center gap-2 flex-col">
                <div className="w-6 h-6 text-white">
                  <TelIcon />
                </div>
                <div className="w-[28vw] text-center text-white text-xs font-medium leading-none">
                  통화
                </div>
              </div>
              <div className="w-[28vw] h-[72px] relative bg-dark bg-opacity-20 rounded-xl flex justify-center items-center gap-2 flex-col">
                <div className="w-6 h-6 text-white">
                  <SmsIcon />
                </div>
                <div className="w-[28vw] text-center text-white text-xs font-medium leading-none">
                  문자
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomWhitePlain>
          <div className="text-xl font-bold leading-normal">
            목표
            <span className="pl-1 font-normal leading-normal text-gray">3</span>
          </div>
          {[1, 2, 3].map((v) => (
            <GoalCard key={v} />
          ))}
        </BottomWhitePlain>
      </div>
    </AppScreen>
  );
};

const GoalCard = () => {
  return (
    <div className="relative w-full h-8 my-8">
      <div className="absolute top-0 text-base font-medium leading-tight">
        바디프로필
      </div>
      <div className="absolute mt-1 text-xs font-normal leading-none text-gray top-5">
        목표를 간단히 입력한 내용입니다
      </div>
      <div className="absolute right-0 text-base font-bold leading-tight text-right text-mainBlue top-2">
        D-88
      </div>
    </div>
  );
};

export default OtherProfileWrapper;
