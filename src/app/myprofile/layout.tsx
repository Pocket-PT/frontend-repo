import Link from 'next/link';
import { PropsWithChildren } from 'react';
import SearchIcon from '../../../public/icons/SearchIcon';
import { usePathname, useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

const MyProfileLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};
export default MyProfileLayout;
