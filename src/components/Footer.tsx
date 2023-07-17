import { useLocation, useParams } from '@reach/router';
import { Link } from 'utils/link';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const Footer = () => {
  const location = useLocation();
  const params = useParams();
  const { pathname } = location;
  console.log(
    pathname,
    params,
    window.location.pathname,
    window.history?.state?.usr?.activity?.params,
    history.location.pathname,
    history.location.state,
    window.history.length,
  );

  return (
    <nav className="box-border fixed bottom-0 z-50 flex items-center justify-between w-full max-w-xl p-6 text-gray-800 bg-white border-t max-h-4 bg-w hite border-gray">
      <Link activityName="Main" animate={false}>
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
          {/* <span
              className={
                pathname === '/'
                  ? 'text-mainPurple'
                  : 'text-gray group-hover:text-dark'
              }
            >
              회원
            </span> */}
        </div>
      </Link>
      <Link activityName="ChatListPage" animate={false}>
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
          {/* <span
              className={
                pathname === '/chats'
                  ? 'text-mainPurple'
                  : 'text-gray group-hover:text-dark'
              }
            >
              채팅
            </span> */}
        </div>
      </Link>
      <Link activityName="MyProfilePage" animate={false}>
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
            <path d="M5.99951 10.0005C4.89951 10.0005 3.99951 10.9005 3.99951 12.0005C3.99951 13.1005 4.89951 14.0005 5.99951 14.0005C7.09951 14.0005 7.99951 13.1005 7.99951 12.0005C7.99951 10.9005 7.09951 10.0005 5.99951 10.0005ZM17.9995 10.0005C16.8995 10.0005 15.9995 10.9005 15.9995 12.0005C15.9995 13.1005 16.8995 14.0005 17.9995 14.0005C19.0995 14.0005 19.9995 13.1005 19.9995 12.0005C19.9995 10.9005 19.0995 10.0005 17.9995 10.0005ZM11.9995 10.0005C10.8995 10.0005 9.99951 10.9005 9.99951 12.0005C9.99951 13.1005 10.8995 14.0005 11.9995 14.0005C13.0995 14.0005 13.9995 13.1005 13.9995 12.0005C13.9995 10.9005 13.0995 10.0005 11.9995 10.0005Z" />
          </svg>
          {/* <span
              className={
                pathname === '/profile'
                  ? 'text-mainPurple'
                  : 'text-gray group-hover:text-dark'
              }
            >
              내 정보
            </span> */}
        </div>
      </Link>
    </nav>
  );
};

export default Footer;
