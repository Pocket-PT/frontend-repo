const MyProfileCard = () => {
  return (
    <div className="relative flex items-center w-full h-auto px-4 hover:bg-hoverGray hover:cursor-pointer">
      <div className="flex items-center justify-between w-14 h-14 rounded-xl bg-mainPurple" />
      <div className="flex flex-row">
        <div className="flex flex-col ml-3">
          <div className="">슈퍼맨</div>
        </div>
        <div className="absolute transform -translate-y-1/2 top-1/2 right-4 text-[14px]">
          상태메세지 너무길면 ...으로 표시
        </div>
      </div>
    </div>
  );
};

export default MyProfileCard;
