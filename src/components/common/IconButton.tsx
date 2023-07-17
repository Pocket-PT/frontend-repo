import { cls } from 'utils/cls';

type IconButtonProps = {
  icon: JSX.Element;
  width: number;
  isSelected?: boolean;
};

const IconButton = ({ icon, width, isSelected }: IconButtonProps) => {
  return (
    <div
      className={cls(
        `w-[${width}px] p-[6px] rounded-full text-darkGray hover:text-dark active:text-dark flex justify-center items-center`,
        isSelected ? 'text-mainPurple bg-gray' : 'text-darkGray',
      )}
    >
      {icon}
    </div>
  );
};
export default IconButton;
