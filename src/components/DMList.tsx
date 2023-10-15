import dayjs from 'dayjs';
import truncateString from 'utils/truncateString';

type DMListProps = {
  name: string;
  profilePictureUrl: string;
  lastFileUrl: string | null;
  latestChattingMessage: string | null;
  latestChattingMessageCreatedAt: string | null;
  notViewCount: number;
  createAt: string;
};

const DMList = ({
  name,
  profilePictureUrl,
  lastFileUrl,
  latestChattingMessage,
  latestChattingMessageCreatedAt,
  notViewCount,
  createAt,
}: DMListProps) => {
  return (
    <div className="relative flex items-center w-full h-20 pl-5 mb-3 bg-white rounded-xl">
      <img
        className="w-12 h-12 rounded-full border-opacity-5"
        src={profilePictureUrl}
        alt="#"
      />
      <div className="flex flex-col w-1/2 ml-4">
        <div className="text-base font-medium leading-tight">{name}</div>
        <p
          className="text-xs font-normal leading-none text-gray"
          style={{ wordBreak: 'break-all', maxBlockSize: '2em' }}
        >
          {lastFileUrl !== null && latestChattingMessage === null
            ? '미디어 파일'
            : lastFileUrl === null && latestChattingMessage !== null
            ? truncateString(latestChattingMessage, 30)
            : '채팅 내용이 없습니다'}
        </p>
      </div>
      <div className="absolute flex flex-col items-center w-12 space-y-1 right-5">
        <div className="text-xs font-normal leading-none text-gray">
          {latestChattingMessageCreatedAt
            ? dayjs(latestChattingMessageCreatedAt)
                .add(9, 'hour')
                .format('h:mm A')
            : dayjs(createAt).add(9, 'hour').format('h:mm A')}
        </div>
        {notViewCount ? (
          <div className="w-8 h-6 p-2 bg-mainBlue rounded-xl flex-col justify-center items-end gap-2.5 inline-flex">
            <div className="w-4 h-2 text-center text-white text-xs font-semibold leading-[8px]">
              {notViewCount}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DMList;
