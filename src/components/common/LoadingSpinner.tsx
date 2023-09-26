const LoadingSpinner = () => {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-mainBlue"></div>
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-mainBlue"></div>
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-mainBlue"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
