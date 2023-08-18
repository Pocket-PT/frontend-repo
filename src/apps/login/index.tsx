import KaKaoLogin from 'components/KaKaoLogin';
import Layout from 'components/Layout';
import { FOOTER_HEIGHT, HEADER_HEIGHT } from 'constants/global';
import { Link } from 'gatsby';

const SignInPage = () => {
  return (
    <Layout title="로그인" hasFooter={false}>
      <div
        className={`w-full flex items-center flex-col px-6 space-y-8`}
        style={{
          height: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px - 8px)`,
        }}
      >
        <div className="flex items-center justify-center w-32 h-32 mt-32 text-white rounded-full shadow bg-mainPurple">
          LOGO
        </div>
        <div>
          <Link
            to={`${
              process.env.GATSBY_OAUTH_KAKAO_LOGIN
            }?redirectUri=${encodeURIComponent(
              'https://frontend.pocketpt.shop/#/after-login',
            )}`}
          >
            <KaKaoLogin />
          </Link>
          <div className="mt-1 text-center">회원가입</div>
        </div>
      </div>
    </Layout>
  );
};

export default SignInPage;
