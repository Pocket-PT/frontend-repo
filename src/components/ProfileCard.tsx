const ProfileCard = () => {
  return (
    <div className="relative flex items-center w-full h-auto px-4">
      <div className="flex items-center justify-between w-10 h-10 rounded-xl bg-mainPurple" />
      <div className="flex flex-row">
        <div className="flex flex-col ml-3">
          <div className="">김일곤</div>
          {<div className="text-sm text-gray"></div>}
        </div>
        <div className="absolute text-sm transform -translate-y-1/2 top-1/2 right-4 text-darkGray">
          test@naver.com
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
