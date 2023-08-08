import useHashLocation from 'hooks/useHashLocation';
import ChatIcon from 'icons/ChatIcon';
import PersonIcon from 'icons/PersonIcon';
import PersonListIcon from 'icons/PersonListIcon';
import { Link } from 'libs/link';
import { cls } from 'utils/cls';

const Footer = () => {
  const { name } = useHashLocation();

  return (
    <nav className="fixed bottom-0 z-50 h-[60px] flex items-center justify-between w-full bg-white border-t border-gray px-12">
      <Link activityName="Main" animate={false}>
        <div
          className={cls(
            'flex flex-col items-center',
            name === 'Main'
              ? 'text-mainBlue'
              : 'text-gray group-hover:text-dark',
          )}
        >
          <PersonListIcon />
          {/* <svg
            className={
              name === 'Main'
                ? 'w-6 h-6 stroke-mainPurple'
                : 'w-6 h-6 stroke-gray group-hover:stroke-dark'
            }
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
          </svg> */}
          <span
            className={cls(
              'text-[10px] pt-1',
              name === 'Main'
                ? 'text-mainBlue'
                : 'text-gray group-hover:text-dark',
            )}
          >
            회원 목록
          </span>
        </div>
      </Link>
      <Link activityName="ChatListPage" animate={false}>
        <div
          className={cls(
            'flex flex-col items-center',
            name === 'ChatListPage'
              ? 'text-mainBlue'
              : 'text-gray group-hover:text-dark',
          )}
        >
          <ChatIcon />
          <span
            className={cls(
              'text-[10px] pt-1',
              name === 'ChatListPage'
                ? 'text-mainBlue'
                : 'text-gray group-hover:text-dark',
            )}
          >
            채팅
          </span>
        </div>
      </Link>
      <Link activityName="MyProfilePage" animate={false}>
        <div
          className={cls(
            'flex flex-col items-center',
            name === 'MyProfilePage'
              ? 'text-mainBlue'
              : 'text-gray group-hover:text-dark',
          )}
        >
          <PersonIcon />
          <span
            className={cls(
              'text-[10px] pt-1',
              name === 'MyProfilePage'
                ? 'text-mainBlue'
                : 'text-gray group-hover:text-dark',
            )}
          >
            마이
          </span>
        </div>
      </Link>
    </nav>
  );
};

export default Footer;
