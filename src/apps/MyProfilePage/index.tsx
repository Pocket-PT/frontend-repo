import { useAccountQuery } from 'apis/useAccountQuery';
import MyLayout from 'components/MyLayout';
import BottomWhitePlain from 'components/common/BottomWhitePlain';
import usePushToPage from 'hooks/usePushToPage';
import ArrowRightIcon from 'icons/ArrowRightIcon';
import BackIcon from 'icons/BackIcon';
import GraphIcon from 'icons/GraphIcon';
import PrizeIcon from 'icons/PrizeIcon';
import { Link } from 'libs/link';

type MyProfileCardProps = {
  name: string | undefined;
  introduce: string | undefined;
  profilePictureUrl: string | undefined;
  email: string | undefined;
};

const MyProfileCard = ({
  name,
  introduce,
  profilePictureUrl,
  email,
}: MyProfileCardProps) => {
  return (
    <div className="w-full h-[30vh] flex-col justify-start items-center gap-4 inline-flex">
      <img
        className="w-[15vh] rounded-full h-[15vh] border-opacity-5"
        src={profilePictureUrl}
        alt="$"
      />
      <div className="flex flex-col items-start justify-start gap-1">
        <div className="w-full text-2xl font-extrabold leading-7 text-center text-white">
          {name}
        </div>
        <div className="w-full text-xs font-normal leading-none text-center text-white text-opacity-60">
          {email}
        </div>
      </div>
      <div className="w-full text-sm font-medium leading-tight text-center text-white">
        {introduce}
      </div>
    </div>
  );
};

const InfoCard = ({ title }: { title: string }) => {
  const getIcon = (title: string) => {
    if (title === '포트폴리오')
      return (
        <div className="stroke-dark">
          <PrizeIcon />
        </div>
      );
    if (title === '가격 플랜')
      return (
        <div className="">
          <GraphIcon />
        </div>
      );
    if (title === '매출 조회')
      return (
        <div className="">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect width="16" height="16" fill="url(#pattern0)" />
            <defs>
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlinkHref="#image0_1942_5741"
                  transform="scale(0.0111111)"
                />
              </pattern>
              <image
                id="image0_1942_5741"
                width="90"
                height="90"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAABYUlEQVR4nO2cO04DMQAFpyLcAY5Iwi35VMBREPRGlixEF2zkPC87I7nPjiYv2hQGERERERERERERETnDNXAPPAOfQPFQmosn4AQc/lrRLfCmWM7F9dpcDZesZLpkD5Vd58KZoMvBcUR03WRF0+XgcUT0h6LpDa0668aaGXKgaC4Tj6JZVLSIiIiIiMiy+F8HvoKXhUOwaBRNukKLJi/O6WBHGz2bssEz5SFnUzZ4pjzkbMoGzy4esixwFI2iSVdo0eTFOR3kpbrRKJp0cRZNXpLTQV6gG81axxcWFE26QosmL87pIC/VjUbRpIuzaPKSnA7yAt1o1jq+sKBo0hVaNHlxTgd5qW40iiZdnEWTl+R08I832otR6Jb8PiLaq364zFU/pwW+hmVj525E9KFdMZb+8GUj5wW4YpB6aZ6y+ZXkm1HJP8s+tv3xB5JvudXFQ5uL4ZJFRERERERERERE2AdfrAsUQb/Eab0AAAAASUVORK5CYII="
              />
            </defs>
          </svg>
        </div>
      );
  };
  return (
    <div className="relative flex flex-row items-center w-full h-[60px] bg-hoverGray rounded-xl">
      <div className="w-5 h-5 ml-5">{getIcon(title)}</div>
      <div className="pt-1 ml-3 text-base font-medium leading-tight">
        {title}
      </div>
      <div className="absolute w-6 h-6 right-6 text-gray group">
        <ArrowRightIcon />
      </div>
    </div>
  );
};

const MyProfilePageWrapper = () => {
  return (
    <MyLayout hasFooter={false}>
      <MyProfilePage />
    </MyLayout>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyProfilePage: React.FC<any> = () => {
  const { data: myData } = useAccountQuery();
  const { pop } = usePushToPage();

  return (
    <>
      <div
        className="absolute w-6 h-6 text-white top-5 left-5"
        onClick={() => pop()}
        onKeyDown={() => pop()}
        role="presentation"
      >
        <BackIcon />
      </div>
      <div className="absolute text-sm text-white top-5 right-5">
        <Link
          activityName="MyProfileEditPage"
          activityParams={{
            name: myData?.data.name,
            introduce: myData?.data.introduce,
            profilePictureUrl: myData?.data.profilePictureUrl,
          }}
        >
          편집
        </Link>
      </div>
      <div className="w-full h-full bg-dark bg-opacity-20 backdrop-blur-[80px] absolute -z-10" />
      <div
        className="absolute w-full h-full bg-center bg-repeat bg-cover -z-20"
        style={{
          backgroundImage: "url('otherprofile-background.png')",
        }}
      />
      <div className="px-5 mt-8 mb-5">
        <MyProfileCard
          name={myData?.data.name}
          introduce={myData?.data.introduce}
          profilePictureUrl={myData?.data.profilePictureUrl}
          email={myData?.data.email}
        />
      </div>
      <BottomWhitePlain>
        <div className="text-xl font-bold leading-normal">내 정보 관리</div>
        {myData?.data.role === 'trainer' ? (
          <div className="space-y-2">
            <div>
              <Link activityName="PortfolioPage">
                <InfoCard title="포트폴리오" />
              </Link>
            </div>
            <div>
              <Link activityName="PricePage">
                <InfoCard title="가격 플랜" />
              </Link>
            </div>
            <div>
              <Link activityName="IncomePage">
                <InfoCard title="매출 조회" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div>
              <Link activityName="PortfolioPage">
                <InfoCard title="목표 설정" />
              </Link>
            </div>
            <div>
              <Link activityName="PricePage">
                <InfoCard title="체성분 작성" />
              </Link>
            </div>
            <div>
              <Link activityName="IncomePage">
                <InfoCard title="비포&애프터 작성" />
              </Link>
            </div>
          </div>
        )}
      </BottomWhitePlain>
    </>
  );
};

export default MyProfilePageWrapper;
