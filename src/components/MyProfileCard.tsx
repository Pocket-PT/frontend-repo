type MyProfileCardProps = {
  name: string | undefined;
  profileUrl: string | undefined;
};

const MyProfileCard = ({ name, profileUrl }: MyProfileCardProps) => {
  console.log(profileUrl);

  return (
    <div className="relative flex items-center w-full h-auto px-5 hover:bg-hoverGray hover:cursor-pointer">
      <div className="flex items-center justify-between rounded-full w-[68px] h-[68px]">
        <img src={profileUrl ?? ''} alt="profileImg" className="rounded-full" />
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col ml-4">
          <div className="mr-1 text-xl font-extrabold leading-normal text-dark">
            {name}
          </div>
          <div className="text-xs font-medium leading-none text-gray">
            건강한 라이프스타일을 위한 스트레스 관리 방법
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileCard;
