type ProfileCardProps = {
  name: string;
  email: string;
  profilePictureUrl: string;
};

const ProfileCard = ({ name, email, profilePictureUrl }: ProfileCardProps) => {
  return (
    <div className="flex items-center justify-between w-full h-auto px-5">
      <div className="flex flex-row items-center">
        <img
          className="rounded-full w-11 h-11"
          src={
            profilePictureUrl ||
            'https://pocket-pt.s3.ap-northeast-2.amazonaws.com/account/profile-picture/default_profile.jpg'
          }
          alt="profile"
        />
        <div className="flex flex-col ml-3">
          <div className="box-border pb-1 text-base font-medium leading-tight text-dark">
            {name}
          </div>
          <div className="text-xs font-normal leading-none text-gray">
            {email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
