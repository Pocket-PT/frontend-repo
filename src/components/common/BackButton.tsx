import usePushToPage from 'hooks/usePushToPage';
import BackIcon from 'icons/BackIcon';

const BackButton = () => {
  const { pop } = usePushToPage();
  return (
    <div
      className="absolute z-10 w-6 h-6 text-white top-5 left-5"
      onClick={() => pop()}
      onKeyDown={() => pop()}
      role="presentation"
    >
      <BackIcon />
    </div>
  );
};

export default BackButton;
