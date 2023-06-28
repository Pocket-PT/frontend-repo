<<<<<<< HEAD
<<<<<<< HEAD
'use client';

import Footer from '@/components/Footer';
import MyProfile from '@/components/MyProfile';
import Profile from '@/components/Profile';
import Link from 'next/link';
import { Scrollbars } from 'react-custom-scrollbars-2';

=======
>>>>>>> e93b175 (install)
=======
import Footer from '@/components/Footer';

>>>>>>> da0bf08 (style: 채팅방 CSS 수정)
export default function Home() {
  const customerList = Array.from({ length: 100 }, (v, i) => i + 1);

  return (
<<<<<<< HEAD
    <div className="mt-4">
      <MyProfile />
      <div className="w-full h-[1px] mt-4 mb-4 bg-lightGray"></div>
      <div className="ml-4 text-[12px] text-darkGray mb-4">
        회원수 : {customerList.length}명
      </div>
      <Scrollbars autoHeight autoHeightMin="73vh" autoHide>
        {customerList.map((customer) => (
          <Link key={customer} href={`/${customer}`}>
            <div key={customer} className="flex flex-row mb-2">
              <Profile />
              {/* {customer} */}
            </div>
          </Link>
        ))}
      </Scrollbars>
      <Footer />
=======
    <div>
      <h1>Home</h1>
<<<<<<< HEAD
>>>>>>> e93b175 (install)
=======
      <Footer />
>>>>>>> da0bf08 (style: 채팅방 CSS 수정)
    </div>
  );
}
