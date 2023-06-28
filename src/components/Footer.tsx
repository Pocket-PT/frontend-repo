'use client';

import { cls } from '@/utils/cls';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="fixed bottom-0 flex items-center justify-between w-full max-w-xl px-8 pt-3 pb-4 text-gray-800 bg-white border-t border-gray">
      <Link href="/">
        <div className="flex flex-col items-center space-y-2 hover:text-dark group">
          <svg
            className={
              pathname === '/'
                ? 'w-6 h-6 stroke-mainPurple'
                : 'w-6 h-6 stroke-gray group-hover:stroke-dark'
            }
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
          </svg>
          <span
            className={
              pathname === '/'
                ? 'text-mainPurple'
                : 'text-gray group-hover:text-dark'
            }
          >
            회원
          </span>
        </div>
      </Link>
      <Link href="/chats" passHref>
        <div className="flex flex-col items-center space-y-2 text-orange-500 group">
          <svg
            className={
              pathname === '/chats'
                ? 'w-6 h-6 stroke-mainPurple'
                : 'w-6 h-6 stroke-gray group-hover:stroke-dark'
            }
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          <span
            className={
              pathname === '/chats'
                ? 'text-mainPurple'
                : 'text-gray group-hover:text-dark'
            }
          >
            채팅
          </span>
        </div>
      </Link>
      <Link href="/profile" passHref>
        <div className="flex flex-col items-center space-y-2 text-orange-500 group">
          <svg
            className={
              pathname === '/profile'
                ? 'w-6 h-6 stroke-mainPurple'
                : 'w-6 h-6 stroke-gray group-hover:stroke-dark'
            }
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
          <span
            className={
              pathname === '/profile'
                ? 'text-mainPurple'
                : 'text-gray group-hover:text-dark'
            }
          >
            마이프로필
          </span>
        </div>
      </Link>
    </nav>
  );
};

export default Footer;
