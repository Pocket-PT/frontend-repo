const Header = () => {
  return (
    <div className="w-full h-[47px] relative">
      <div className="w-full h-[47px] left-0 top-0 absolute">
        <div className="right-[26.7px] top-[19px] absolute justify-start items-center gap-[7px] inline-flex">
          <div className="relative w-5 h-3">
            <img
              className="absolute top-0 left-0 w-5 h-3"
              src="https://via.placeholder.com/20x12"
              alt="#"
            />
          </div>
          <div className="w-[17px] h-[12.50px] relative">
            <img
              className="w-[17px] h-[12.50px] left-0 top-0 absolute"
              src="https://via.placeholder.com/17x12"
              alt="#"
            />
          </div>
          <div className="w-[27.33px] h-[13px] relative">
            <div className="w-[25px] h-[13px] left-0 top-0 absolute opacity-40 rounded border border-black" />
            <div className="w-[17px] h-[9px] left-[2px] top-[2px] absolute bg-black rounded-sm" />
          </div>
        </div>
        <div className="w-1.5 h-1.5 left-[282px] top-[6px] absolute">
          <div className="w-1.5 h-1.5 left-0 top-0 absolute rounded-full" />
        </div>
        <div className="left-[46.50px] top-[17px] absolute justify-center items-center gap-0.5 inline-flex">
          <div className="text-center text-black text-[17px] font-semibold leading-[17px]">
            9:41
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
