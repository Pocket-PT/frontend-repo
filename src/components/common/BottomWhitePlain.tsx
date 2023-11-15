import { PropsWithChildren } from 'react';
import { cls } from 'utils/cls';

interface BottomWhitePlainProps extends PropsWithChildren {
  isOpen?: boolean;
}

const BottomWhitePlain = ({
  isOpen = false,
  children,
}: BottomWhitePlainProps) => {
  return (
    <div
      className={cls(
        'w-full h-full bg-white rounded-tl-[32px] rounded-tr-[32px] pt-[30px] px-5 box-border transform duration-500 ease-in-out',
        isOpen ? '-translate-y-80' : 'translate-y-0',
      )}
    >
      {children}
    </div>
  );
};

export default BottomWhitePlain;
