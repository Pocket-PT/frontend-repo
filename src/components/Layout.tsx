import { AppScreen } from '@stackflow/plugin-basic-ui';
import Footer from './Footer';
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

const Layout = ({
  children,
  hasFooter = true,
}: {
  children: React.ReactNode;
  title?: string;
  hasFooter?: boolean;
}) => {
  return (
    <AppScreen backgroundColor="#FAFAFA">
      <main>{children}</main>
      {hasFooter && <Footer />}
    </AppScreen>
  );
};

export default Layout;
