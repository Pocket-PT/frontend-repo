import gravatar from 'gravatar';
import Image from 'next/image';

const ChatList = () => {
  return (
    <div className="w-[409px] h-[81px] grid items-center grid-cols-7 gap-4 hover:bg-slate-100">
      <Image
        src={gravatar.url(
          '123@gmail.com',
          {
            s: '100',
            r: 'x',
            d: 'retro',
          },
          false,
        )}
        width={50}
        height={50}
        alt="avatar"
        className="grid col-span-1 ml-4 rounded-full"
      />
      <div className="col-span-4 ml-4">
        <div className="text-[14px] font-medium">김일곤</div>
        <div className="text-neutral-500 text-[12px] font-normal">
          제일 최근 메세지
        </div>
      </div>
      <div className="flex flex-col items-center justify-center col-span-2">
        <div className="text-neutral-500 text-[12px] font-normal">
          오후 3:07
        </div>
        <div className="w-[47px] h-[19px] bg-indigo-400 rounded-lg flex items-center justify-center text-[8px] font-light text-white">
          10
        </div>
      </div>
    </div>
  );
};

export default ChatList;
