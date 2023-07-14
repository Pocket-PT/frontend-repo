'use client';

import { Scrollbars } from 'react-custom-scrollbars-2';
import MyProfile from 'components/MyProfile';
import { Link } from 'gatsby';
import Profile from 'components/Profile';
import Layout from 'components/Layout';

export default function Home() {
  const customerList = Array.from({ length: 100 }, (v, i) => i + 1);

  return (
    <Layout>
      <div className="mt-4">
        <Link to={'/myprofile'}>
          <MyProfile />
        </Link>
        <div className="w-full h-[1px] mt-4 mb-4 bg-lightGray"></div>
        <div className="ml-4 text-[12px] text-darkGray mb-4">
          회원목록 수 : {customerList.length}명ß
        </div>

        <Scrollbars autoHeight autoHeightMin="73vh" autoHide>
          {customerList.map((customer) => (
            <Link key={customer} to={`/${customer}`}>
              <div className="flex flex-row h-12 py-4 mb-3 hover:bg-hoverGray hover:cursor-pointer">
                <Profile />
                {/* {customer} */}
              </div>
            </Link>
          ))}
        </Scrollbars>
      </div>
    </Layout>
  );
}
