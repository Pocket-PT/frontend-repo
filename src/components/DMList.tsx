import useMockOtherUserStore from 'stores/mockOtherUser';

const DMList = () => {
  const { data } = useMockOtherUserStore();
  return (
    <div className="relative flex items-center w-full h-20 pl-5 mb-3 bg-white rounded-xl">
      <img
        className="w-12 h-12 rounded-full border-opacity-5"
        src="https://via.placeholder.com/48x48"
        alt="#"
      />
      <div className="flex flex-col w-1/2 ml-4">
        <div className="text-base font-medium leading-tight">{data.name}</div>
        <div className="text-xs font-normal leading-none text-gray">
          오늘도 화이팅!! 항상 잘하고 있어ㅎㅎ
        </div>
      </div>
      <div className="absolute flex flex-col items-center w-12 space-y-1 right-5">
        <div className="text-xs font-normal leading-none text-gray">
          오후 3:07
        </div>
        <div className="w-8 h-6 p-2 bg-mainBlue rounded-xl flex-col justify-center items-end gap-2.5 inline-flex">
          <div className="w-4 h-2 text-center text-white text-xs font-semibold leading-[8px]">
            21
          </div>
        </div>
      </div>
    </div>
  );
};

export default DMList;
