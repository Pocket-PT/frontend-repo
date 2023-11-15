import { AppScreen } from '@stackflow/plugin-basic-ui';
import { SERVER_URL } from 'constants/global';
import { StaticImage } from 'gatsby-plugin-image';
import { motion } from 'framer-motion';

//https://pocketpt.netlify.app
//http://localhost:8000
//http://pocketpt-frontend.s3-website.ap-northeast-2.amazonaws.com
//https://app.pocketpt.me

const SignInPage = () => {
  return (
    <AppScreen>
      <div className="relative w-full h-full">
        <StaticImage
          src="../../../static/pocketpt-login-background.png"
          alt="background"
          style={{
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            zIndex: -1,
          }}
        />
        <div className="flex flex-col items-center justify-center w-full h-full px-14">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 0.8 }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundImage: `url("logo-white.png")`,
              width: '90vw',
              height: '90vw',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <a
            href={`${SERVER_URL}/oauth2/authorization/kakao?redirectUri=${encodeURIComponent(
              'https://app.pocketpt.me/#/after-login',
            )}`}
            className="w-full -mt-[15vw] z-10"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center gap-2 text-[#1D77B1] w-full h-12 bg-[#D2E4EF] rounded-md hover:cursor-pointer shadow-lg"
            >
              <KaKaoLogin />
            </motion.div>
          </a>
        </div>
      </div>
    </AppScreen>
  );
};

const KaKaoLogin = () => {
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <rect width="24" height="24" fill="url(#pattern0)" />
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_871_982" transform="scale(0.0111111)" />
          </pattern>
          <image
            id="image0_871_982"
            width="90"
            height="90"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFN0lEQVR4nO2dbYiUVRTHb+8vFGVmurvnPEsiBRFESFFE9SUoevkSCUUR1gctysJsznnWorEss4iiPhRG9B7Ihs45u4tQBJu9fOqzUWgvJr24ZlFqmylOnFEDwdiZZ5+Ze+/M/cEflmVm55w/Z5/nzpl7zziXSCQSiUQikUgkEokmqI4fP8hyMbIuRNLHgeVtIPkMWLcg6zYg+Q1J9pkaP9vvWLcAy6f2WHuOPdf+hv2tZl6yN1gwfBxURq5GlmfMLCTZg6z1UkSyB1g/AZLVWKldaa/leopq9VjI9TogeQNZdpRm7NTGTyDr60C1ay0G162cO6Szs1wZSL7pmLn/r23IumL2snXnuG6h76GRsxv/vqx/BWDwEQLSvUCyJlu+rs/FysyKnA6sTyPLbt+GTn1Z0V3AsmpWdfg0FxMZyw3IstW7gdxihbP+OEB6swsdWDp8FrC+79swnK7hpGuzfGyGCxFbuwZyo6uXI9kKtP5SFxLAcjeQTPo3R0uubJkEkrtcCNiSzbch2H7DV3u0uH4Mkj7r2wTslNmsL1rOHbe5l0zG/8yWVR02ubbYd9Lor7KXdMTkrKI3Iut+3wmjP+0fyGvXt9VkWD46gKS/BpBs3a9kB1akv31dN5aP/CepQQhYPmxLFzAjecB3chie7i3X5HxsRrpk6NGM3tmfr59ZmtFI8lIA1VMPUUD6fGk3QGD9x3dCGKisp13KjdEW6b6TweAlT0zP5KXDp6Rrs05tNMnEYHX85OJG53qb/2rRKJTluqC40aRrfSeAsYjknUImz1+05gRg/d17AhyNdhbatJMN6RUBBF+PSf35yOUtGw2k9/sOHHvhnSKyvhpA4PWYBKSvtF7RrJ/7Dhwjk+0fbL2iSTb7DhxjE+nXRYyeCCJ4jkdA8kvLRgPL374Dx8hknrVudBfu08B2G00yWcBo/cl34BiZgOXnIkZv8h04xqevWjfajjr4D7ze9cs726DtO3CMTMDycstGZ7ku8h04xqZc7ilgdG2+98C5B5pKF1SHTwSSP3wHj93eJjWsmR1AAvUYBKRvFTK5YTTXbvKdAEaijOSWwkbPW7LhpENHgb0ngoH3OMwrNx3SdgNtxuwVbrrMGdowK4qzguyrmnVvaQdCbduT74QwVJE858qiUdVpX3T9KCZPDD5YO9OVCbLc6b16ODBRbbFrB0DygffkOAyZF207pdXHIxmwbvedJPo2mXX74MNjc1w7sWkuPb2Nl2SfDXZxncCO7fZuNct9rpMcGhTVY9WsK50PeuEcOB5xHtzDEeXDIEuOLAd8G4FtkxywgnIhYJuwbVxOF1bxpM3RcyHRX5HzgfXLrjGZ5XvIRy5xITLAoxf5NgjL0btzefgMFyr9+frzIq/ibzu2Rp4OMDR6oW+zsJj+tOVqX3XkVBcD8R3HkN02F7XUY8adACpyu3/zdGqRbLYlm02ZdDECrE96N5GProPNMHkty+Uar288yiCo/Xqku5B0HEieskta10zYtetcY4h266bsNDOA5SrIdd4A6WVAciuwPAosbzYGdZNuAtLv7BP5Rufw8KBu0h/sOAOSbjz02Kp9QGHLzK6dF40kjxSouvGuGi3cbmxxX+ADgfds25nv2KPCTGveYDngvRMWI8C6rJUbVDadKQA9ycGpYc0PTSHdmOVjc32HHRWNlQHrF02vX6m2uGuWV50CWB5rqtFvG25IVwbdBQuZKWZ47LdLhFVwNA2aUGm8uTj4bQ/2LT+bkeVjYHlhgPUO+woQ3/ElEolEIpFIuJ7mX8tlzODunXRfAAAAAElFTkSuQmCC"
          />
        </defs>
      </svg>
      <div className="mt-[1px]">카카오톡 로그인</div>
    </>
  );
};

export default SignInPage;
