import { PropsWithChildren } from 'react';

const BottomWhitePlain = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-full bg-white rounded-tl-[32px] rounded-tr-[32px] pt-[30px] px-5 box-border">
      {children}
    </div>
  );
};

export default BottomWhitePlain;
