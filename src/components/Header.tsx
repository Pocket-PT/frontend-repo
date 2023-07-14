import { headerTitle } from 'utils/headerTitle';
import SearchIcon from '../icons/SearchIcon';
import { useLocation } from '@reach/router';
import { navigate } from 'gatsby-link';

const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);

  const canGoBack = !(
    pathname === '/' ||
    pathname === '/chats' ||
    pathname === 'profile'
  );
  console.log(canGoBack);

  const onClick = () => {
    navigate(-1);
  };
  return (
    <div className="w-full h-[45px] flex flex-row items-center">
      <div className="fixed top-0 flex items-center justify-center w-full h-12 max-w-xl">
        {canGoBack ? (
          <button onClick={onClick} className="absolute left-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
        ) : null}
      </div>
      <div className="text-black text-[16px] w-full font-bold flex flex-row px-12">
        {headerTitle(pathname)}
      </div>
      <div className="pr-10 text-darkGray">
        <SearchIcon />
      </div>
    </div>
  );
};

export default Header;
