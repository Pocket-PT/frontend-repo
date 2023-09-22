import MyLayout from 'components/MyLayout';
import BottomWhitePlain from 'components/common/BottomWhitePlain';
import usePushToPage from 'hooks/usePushToPage';
import ArrowRightIcon from 'icons/ArrowRightIcon';
import BackIcon from 'icons/BackIcon';
import GraphIcon from 'icons/GraphIcon';
import PrizeIcon from 'icons/PrizeIcon';
import { Link } from 'libs/link';
import useMyProfileStore from 'stores/myProfile';

type MyProfileCardProps = {
  name: string;
  nickname: string;
  description: string;
  birthDate: string;
  email: string;
};

const MyProfileCard = ({ name, description, email }: MyProfileCardProps) => {
  return (
    <div className="w-full h-[30vh] flex-col justify-start items-center gap-4 inline-flex">
      <img
        className="w-[15vh] rounded-full h-[15vh] border-opacity-5"
        src="https://via.placeholder.com/160x160"
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
        {description}
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

const MyProfilePage = () => {
  const { name, nickname, description, birthDate, email } = useMyProfileStore();
  console.log('MyProfilePage', name, nickname, description, birthDate, email);
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
        <Link activityName="MyProfileEditPage">편집</Link>
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
          name={name}
          nickname={nickname}
          description={description}
          birthDate={birthDate}
          email={email}
        />
      </div>
      <BottomWhitePlain>
        <div className="text-xl font-bold leading-normal">내 정보 관리</div>
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
      </BottomWhitePlain>
    </>
  );
};

export default MyProfilePageWrapper;
