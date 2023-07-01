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

  return (
    <div className="w-full h-screen max-w-xl mx-auto bg-white">{children}</div>
  );
};
export default ChatLayout;
