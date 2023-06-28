'use client';

import Link from 'next/link';
import { PropsWithChildren } from 'react';
import SearchIcon from '../../../public/icons/SearchIcon';
import { usePathname, useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

interface IProps {
  canGoBack?: boolean;
}

const ChatLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const router = useRouter();
  console.log(pathname);

  const canGoBack = pathname !== ('/chats' || '/' || 'profile');

  const onClick = () => {
    router.back();
  };

  return (
    <div className="w-full h-screen max-w-xl mx-auto bg-white">
      <div className="w-full h-[45px] flex flex-row items-center">
        <div className="fixed top-0 flex items-center justify-center w-full h-12 max-w-xl">
          {canGoBack ? (
            <button onClick={onClick} className="absolute left-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
          ) : null}
        </div>
        <div className="text-black text-[16px] w-full font-bold flex flex-row px-12">
          {pathname !== '/chats' ? pathname.replace('/chats/', '') : '채팅'}
        </div>
        <div className="pr-10">
          <SearchIcon fill="#000000" />
        </div>
      </div>
      {children}
    </div>
  );
};
export default ChatLayout;
