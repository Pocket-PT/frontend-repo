import { Link } from 'libs/link';

interface Props {
  chatRoomId: number;
}

const ChatRoomRightSideBox = ({ chatRoomId }: Props) => {
  return (
    <div className="box-border relative z-30 w-full h-full px-4 pt-6">
      <div>
        <div className="flex flex-row justify-between w-full">
          <div className="pt-[2px] text-base font-medium flex flex-row gap-2 items-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="-mt-1"
            >
              <path
                d="M13.3333 3.33333C14.0666 3.33333 14.6666 3.93333 14.6666 4.66667V12.6667C14.6666 13.4 14.0666 14 13.3333 14H2.66665C1.93331 14 1.33331 13.4 1.33331 12.6667V4.66667C1.33331 3.93333 1.93331 3.33333 2.66665 3.33333H4.77998L5.99998 2H9.99998L11.22 3.33333H13.3333ZM13.3333 12.6667V4.66667H2.66665V12.6667H13.3333ZM9.33331 8L7.33331 10.48L5.99998 8.66667L3.99998 11.3333H12L9.33331 8Z"
                fill="black"
              />
            </svg>
            사진, 동영상
          </div>
          <button className="w-6 h-6">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.73271 2.20694C6.03263 1.92125 6.50737 1.93279 6.79306 2.23271L11.7944 7.48318C12.0703 7.77285 12.0703 8.22809 11.7944 8.51776L6.79306 13.7682C6.50737 14.0681 6.03263 14.0797 5.73271 13.794C5.43279 13.5083 5.42125 13.0336 5.70694 12.7336L10.2155 8.00047L5.70694 3.26729C5.42125 2.96737 5.43279 2.49264 5.73271 2.20694Z"
                fill="#222222"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-row gap-2 mt-2">
          {[1, 2, 3, 4].map((v) => {
            return (
              <img
                key={v}
                src="https://via.placeholder.com/64x64"
                alt="img"
                className="w-[16vw] h-[16vw] rounded bg-gray"
              />
            );
          })}
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between w-full mt-8">
          <div className="pt-[2px] flex flex-row items-center gap-2 text-base font-medium">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="-mt-1"
            >
              <path
                d="M7.54118 3.94746C6.26949 2.67576 4.21213 2.66958 2.94594 3.93578C1.67975 5.20197 1.68593 7.25933 2.95762 8.53102L7.66511 13.2385C7.86038 13.4338 8.17696 13.4338 8.37222 13.2385L13.0553 8.55824C14.3185 7.28793 14.3145 5.23634 13.0426 3.96442C11.7686 2.69045 9.7103 2.68427 8.44184 3.95273L7.99458 4.40085L7.54118 3.94746Z"
                fill="#212121"
              />
            </svg>
            즐겨찾기
          </div>
          <Link
            activityName="BookmarkPage"
            activityParams={{ id: String(chatRoomId) }}
          >
            <button className="w-6 h-6">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.73271 2.20694C6.03263 1.92125 6.50737 1.93279 6.79306 2.23271L11.7944 7.48318C12.0703 7.77285 12.0703 8.22809 11.7944 8.51776L6.79306 13.7682C6.50737 14.0681 6.03263 14.0797 5.73271 13.794C5.43279 13.5083 5.42125 13.0336 5.70694 12.7336L10.2155 8.00047L5.70694 3.26729C5.42125 2.96737 5.43279 2.49264 5.73271 2.20694Z"
                  fill="#222222"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomRightSideBox;
