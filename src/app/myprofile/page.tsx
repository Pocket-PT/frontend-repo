const MyProfilePage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-12 h-12 mx-auto mt-6 bg-mainPurple rounded-xl"></div>
        <div>슈퍼맨</div>
        <div>test@1234</div>
        <div>상태메시지 너무길면 ...으로 표시</div>
      </div>
      <div className="relative flex flex-row mb-8">
        <div className="absolute left-[37%]">이름</div>
        <div className="absolute left-[55%] border border-r-500">김일곤</div>
      </div>
      <div className="relative flex flex-row">
        <div className="absolute left-[37%]">생년월일</div>
        <div className="absolute left-[55%] border border-r-500">
          1111-11-11
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
