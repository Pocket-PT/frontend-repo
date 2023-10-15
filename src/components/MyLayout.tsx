import { AppScreen } from '@stackflow/plugin-basic-ui';
import Footer from './Footer';
import useUser from 'hooks/useUser';
import React, { PropsWithChildren, useEffect } from 'react';
// import DropdownButton from './common/Dropdown';
// import PersonIcon from 'icons/PersonIcon';
// import { MenuProps } from 'antd';
// import useHashLocation from 'hooks/useHashLocation';
// import { Link } from 'libs/link';

// const items: MenuProps['items'] = [
//   {
//     label: '마이페이지',
//     key: '0',
//   },
//   {
//     type: 'divider',
//   },
//   {
//     label: <Link activityName="SignInPage">로그인</Link>,
//     key: '1',
//   },
// ];

// const appendRight = () => {
//   const { name } = useHashLocation();

//   console.log('AppendRight', name);

//   return name === 'SignInPage' ? null : (
//     <div className="flex items-center justify-center w-6 h-6 text-dark">
//       <DropdownButton Icon={<PersonIcon />} items={items} />
//     </div>
//   );
// };

type Props = {
  children: React.ReactElement;
  hasFooter?: boolean;
  backgroundWhite?: boolean;
  preventSwipeBack?: boolean;
};

const MyLayout = ({
  children,
  hasFooter = true,
  backgroundWhite = false,
  preventSwipeBack = false,
}: PropsWithChildren<Props>) => {
  const result = useUser();

  useEffect(() => {
    //touchmove event listener preventDefault
    document.addEventListener('touchmove', function (event) {
      if (typeof window === 'undefined') {
        return;
      }
      if (window.scrollY <= 0) {
        event.preventDefault();
      }
    });
    return () => {
      document.removeEventListener('touchmove', function (event) {
        if (typeof window === 'undefined') {
          return;
        }
        if (window.scrollY <= 0) {
          event.preventDefault();
        }
      });
    };
  }, []);

  return (
    <AppScreen
      backgroundColor={backgroundWhite ? '#FFFFFF' : '#FAFAFA'}
      preventSwipeBack={preventSwipeBack}
    >
      <main className="overflow-hidden h-[100vh]">
        {React.cloneElement(children, { result })}
      </main>
      {hasFooter && <Footer />}
    </AppScreen>
  );
};

export default MyLayout;
