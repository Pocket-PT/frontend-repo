<<<<<<< HEAD
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
=======
'use client';

>>>>>>> c3944ec (feat: Header, Profile 컴포넌트 생성)
import Footer from '@/components/Footer';
import MyProfile from '@/components/MyProfile';
import Profile from '@/components/Profile';
import Link from 'next/link';
import { useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

>>>>>>> da0bf08 (style: 채팅방 CSS 수정)
export default function Home() {
  const customerList = Array.from({ length: 100 }, (v, i) => i + 1);
<<<<<<< HEAD

  return (
<<<<<<< HEAD
=======
  const scrollbarRef = useRef(null);
  const onScroll = () => {};
  console.log(window.innerHeight, window.outerHeight);
  return (
>>>>>>> c3944ec (feat: Header, Profile 컴포넌트 생성)
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
<<<<<<< HEAD
      <Footer />
=======
    <div>
      <h1>Home</h1>
<<<<<<< HEAD
>>>>>>> e93b175 (install)
=======
=======
>>>>>>> c3944ec (feat: Header, Profile 컴포넌트 생성)
      <Footer />
>>>>>>> da0bf08 (style: 채팅방 CSS 수정)
    </div>
  );
}
