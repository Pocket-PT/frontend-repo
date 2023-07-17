import gravatar from 'gravatar';

const DMList = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full h-[81px] m-auto grid items-center justify-center grid-cols-7 hover:bg-hoverGray">
        <img
          src={gravatar.url(
            '123@gmail.com',
            {
              s: '100',
              r: 'x',
              d: 'retro',
            },
            false,
          )}
          width={50}
          height={50}
          alt="avatar"
          className="grid col-span-1 mx-auto rounded-full"
        />
        <div className="col-span-5">
          <div className="text-[14px] font-medium">김일곤</div>
          <div className="text-darkGray text-[12px] font-normal">
            제일 최근 메세지
          </div>
        </div>
        <div className="flex flex-col col-span-1">
          <div className="text-neutral-500 text-[12px] font-normal">
            오후 3:07
          </div>
          <div className="w-[47px] h-[19px] bg-mainPurple rounded-lg flex items-center justify-center text-[8px] font-light text-white">
            10
          </div>
        </div>
      </div>
    </div>
  );
};

export default DMList;
