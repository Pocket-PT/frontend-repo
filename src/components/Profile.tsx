const Profile = () => {
  return (
    <div className="relative flex items-center w-full h-auto px-4 hover:bg-hoverGray hover:cursor-pointer">
      <div className="flex items-center justify-between w-8 h-8 rounded-xl bg-mainPurple" />
      <div className="flex flex-row">
        <div className="flex flex-col ml-3">
          <div className="text-[14px]">김일곤</div>
          <div className="text-[8px] text-gray">test@naver.com</div>
        </div>
        <div className="absolute transform -translate-y-1/2 top-1/2 right-4 text-[14px] text-darkGray">
          2023-05-17 ~ 2023-08-17
        </div>
      </div>
    </div>
  );
};

export default Profile;
