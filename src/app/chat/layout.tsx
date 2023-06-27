import Link from 'next/link';
import { PropsWithChildren } from 'react';
import PersonIcon from '../../../public/icons/PersonIcon';
import ChatIcon from '../../../public/icons/ChatIcon';
import ArrowDownIcon from '../../../public/icons/ArrowDownIcon';
import SearchIcon from '../../../public/icons/SearchIcon';

const ChatLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-[480px] h-[751px] mt-[12px] bg-white rounded-xl shadow border border-stone-300 m-auto flex">
      <div className="w-[72px] h-[751px] -mt-[0.5px] -ml-[1px] bg-white rounded-tl-xl rounded-bl-xl border border-stone-300 flex items-center flex-col gap-12 pt-20">
        <Link href="/chat/list">
          <div className="relative w-8 h-8">
            <PersonIcon fill="#C6C6C6" />
          </div>
        </Link>
        <div className="relative w-10 h-10">
          <ChatIcon fill="#C6C6C6" />
        </div>
      </div>
      <div>
        <div className="w-[408px] h-[45px] flex flex-row ml-4 space-x-72 pt-4">
          <div className="text-black text-[16px] font-bold flex flex-row">
            채팅
            <ArrowDownIcon fill="#000000" />
          </div>
          <div className="-ml-4">
            <SearchIcon fill="#000000" />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
export default ChatLayout;
