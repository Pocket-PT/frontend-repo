const ProfileCard = () => {
  return (
    <div className="flex items-center w-full h-auto px-5">
      <img
        className="border border-black rounded-full w-11 h-11 border-opacity-5"
        src="https://via.placeholder.com/44x44"
        alt="profile"
      />

      <div className="flex flex-col ml-3">
        <div className="box-border pb-1 text-base font-medium leading-tight text-dark">
          최주원
        </div>
        <div className="text-xs font-normal leading-none text-gray">
          yoo@gmail.com
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
