// import { cls } from 'utils/cls';
// import ChatIcon from 'icons/ChatIcon';
import { useEffect } from 'react';
import { useStack } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import ChatIcon from 'icons/ChatIcon';
import TelIcon from 'icons/TelIcon';
import SmsIcon from 'icons/SmsIcon';
import BottomModal from 'components/common/BottomModal';
import BackIcon from 'icons/BackIcon';
import MoreIcon from 'icons/MoreIcon';
import usePushToPage from 'hooks/usePushToPage';
import { Link } from 'libs/link';

const OhterProfile: React.FC = () => {
  const stack = useStack();
  const { pop } = usePushToPage();

  useEffect(() => {
    console.log('OtherProfilePage', stack);
  }, [stack]);

  return (
    <AppScreen backgroundColor="#E9ECF0">
      <div
        className="absolute z-10 w-6 h-6 text-white top-5 left-5"
        onClick={() => pop()}
        onKeyDown={() => pop()}
        role="presentation"
      >
        <BackIcon />
      </div>
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
        <div className="w-full h-[394px] flex-col justify-start items-center gap-4 inline-flex relative mb-5 mt-5">
          <img
            className="w-40 h-40 rounded-full border-opacity-5"
            src="https://via.placeholder.com/160x160"
            alt="#"
          />
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="w-full text-2xl font-extrabold leading-7 text-center text-white">
              신도윤
            </div>
            <div className="w-[280px] text-center text-white text-opacity-60 text-xs font-normal leading-none">
              park456@kakao.com
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-2.5 flex">
            <div className="w-full h-[72px] bg-dark bg-opacity-20 pl-5 rounded-xl box-border">
              <div className="mt-5 text-xs font-normal leading-none text-white text-opacity-60">
                회원 등록 기간
              </div>
              <div className="mt-1 text-sm font-semibold leading-tight text-white">
                2023년 05월 17일 ~ 2023년 08월 17일
              </div>
            </div>
            <div className="justify-start items-start gap-2.5 inline-flex">
              <Link activityName="ChatRoomPage" activityParams={{ id: '1' }}>
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
        <BottomModal>
          <div className="text-xl font-bold leading-normal">
            목표
            <span className="pl-1 font-normal leading-normal text-gray">3</span>
          </div>
          {[1, 2, 3].map((v) => (
            <GoalCard key={v} />
          ))}
        </BottomModal>
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

export default OhterProfile;
