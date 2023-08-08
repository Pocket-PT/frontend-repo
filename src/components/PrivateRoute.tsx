import { isLoggedIn } from 'utils/auth';
import usePushToPage from 'hooks/usePushToPage';

const PrivateRoute = ({ path }: { path: string }) => {
  const { replaceTo } = usePushToPage();
  console.log('PrivateRoute', path, isLoggedIn());

  if (!isLoggedIn() && path !== `/login`) {
    replaceTo('SignInPage');
    return null;
  }
  return;
};

export default PrivateRoute;
