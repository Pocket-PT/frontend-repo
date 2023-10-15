import { AppScreen } from '@stackflow/plugin-basic-ui';
import KaKaoLogin from 'components/KaKaoLogin';
import { SERVER_URL } from 'constants/global';

//https://pocketpt.netlify.app
//http://localhost:8000

const SignInPage = () => {
  return (
    <AppScreen>
      <div
        className={`w-full flex items-center flex-col px-6 space-y-8`}
        style={{
          backgroundImage: `url("login-background.png")`,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          minWidth: '100vw',
          minHeight: '100vh',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          overflow: 'hidden',
        }}
      >
        <div className="my-auto hover:cursor-pointer">
          <a
            href={`${SERVER_URL}/oauth2/authorization/kakao?redirectUri=${encodeURIComponent(
              'https://pocketpt.netlify.app/#/after-login',
            )}`}
          >
            <KaKaoLogin />
          </a>
        </div>
      </div>
    </AppScreen>
  );
};

export default SignInPage;
