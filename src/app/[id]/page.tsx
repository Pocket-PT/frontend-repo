import { cls } from '@/utils/cls';
import ChatIcon from '../../../public/icons/ChatIcon';
import TelIcon from '../../../public/icons/TelIcon';
import SmsIcon from '../../../public/icons/SmsIcon';

const Icon = ({ icon }: { icon: JSX.Element }) => {
  return (
    <div className="flex flex-col items-center justify-center w-20 h-10 text-gray">
      <div className="w-10 p-2 rounded-full shadow-lg text-darkGray hover:text-dark active:text-dark">
        {icon}
      </div>
    </div>
  );
};

const GoalCard = ({ index }: { index: number }) => {
  return (
    <div
      className={cls(
        'relative flex flex-row items-center w-full h-20 rounded',
        index % 2 === 1 ? 'bg-white' : 'bg-lightGray',
      )}
    >
      <div className="w-8 h-8 ml-4 mr-4">
        <ChatIcon />
      </div>
      <div className="">
        <div className="text-xl font-bold text-mainPurple">바디프로필</div>
        <div className="text-sm text-darkGray">목표 간략설명 너무길면 ...</div>
      </div>
      <div className="absolute text-xl font-extrabold right-6 text-mainPurple">
        D-88
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-auto text-center rounded-br-[48px] rounded-bl-[48px] bg-lightGray">
        <div className="px-10 pt-10 mb-6">
          <div className="mx-auto mb-3 w-28 h-28 rounded-xl bg-mainPurple" />
          <div className="text-2xl font-bold text-center ">김일곤</div>
          <div className="text-center text-gray">test@naver.com</div>
          <div className="mt-2 text-lg text-center">
            2023-05-17 ~ 2023-08-17
          </div>
        </div>
        {/* <div className="w-full h-[1px] bg-gray" /> */}
        <div className="flex flex-row justify-center w-full gap-6 pb-6">
          <Icon icon={<ChatIcon />} />
          <Icon icon={<TelIcon />} />
          <Icon icon={<SmsIcon />} />
        </div>
      </div>
      <div className="mt-8 mb-1 ml-6 text-lg font-bold">목표</div>
      {[1, 2, 3].map((v) => {
        return <GoalCard index={v} />;
      })}
    </div>
  );
};

export default ProfilePage;
