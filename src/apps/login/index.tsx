import KaKaoLogin from 'components/KaKaoLogin';
import Layout from 'components/Layout';

//https://pocketpt.netlify.app
//http://localhost:8000
const SignInPage = () => {
  return (
    <Layout title="로그인" hasFooter={false}>
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
            href={`https://back.pocketpt.shop/oauth2/authorization/kakao?redirectUri=${encodeURIComponent(
              'https://pocketpt.netlify.app/#/after-login',
            )}`}
          >
            <KaKaoLogin />
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default SignInPage;
