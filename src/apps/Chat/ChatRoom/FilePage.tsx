/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/prop-types */
import { ActivityComponentType } from '@stackflow/react';
import useChatRoomFileQuery from 'apis/useChatRoomFileQuery';
import MyLayout from 'components/MyLayout';
import LoadingSpinner from 'components/common/LoadingSpinner';
import usePushToPage from 'hooks/usePushToPage';
import BackIcon from 'icons/BackIcon';
import { useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { classifyUrl } from 'utils/classifyUrl';

type FilePageProps = {
  chattingRoomId: string;
  accountProfilePictureUrl: string | undefined;
  accountNickName: string | undefined;
};

const FilePagekWrapper: ActivityComponentType<FilePageProps> = ({ params }) => {
  return (
    <MyLayout hasFooter={false}>
      <FilePage params={params} />
    </MyLayout>
  );
};

type Props = {
  params: FilePageProps;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FilePage: React.FC<any> = ({ params }: Props) => {
  const { chattingRoomId, accountNickName, accountProfilePictureUrl } = params;
  const { data, isLoading } = useChatRoomFileQuery(+chattingRoomId);
  const { pop } = usePushToPage();
  const fileTitleRef = useRef<HTMLDivElement>(null);
  const [refHeights, setRefHeights] = useState<number[]>([]);
  const [isRefLoading, setIsRefLoading] = useState<boolean>(true);

  useEffect(() => {
    if (fileTitleRef.current) {
      setRefHeights([fileTitleRef.current?.clientHeight ?? 0]);
      setIsRefLoading(false);
    }
  }, [fileTitleRef.current]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="w-full h-full overflow-hidden">
      <div
        ref={fileTitleRef}
        className="flex flex-row items-center w-full h-16 px-5 bg-hoverGray"
      >
        <button
          className="w-6 h-6"
          onClick={() => {
            pop();
          }}
        >
          <BackIcon />
        </button>
        <img
          className="ml-5 rounded-full w-11 h-11"
          src={accountProfilePictureUrl}
          alt="#"
        />
        <div className="ml-3 space-y-1">
          <div className="text-base font-bold leading-tight">
            {accountNickName}
          </div>
        </div>
      </div>
      {isRefLoading ? (
        <LoadingSpinner />
      ) : (
        <Scrollbars
          autoHide
          autoHeight
          autoHeightMin={`calc(100vh - ${refHeights[0]}px)`}
        >
          <div className="w-full h-[100vh] p-6">
            <div className="grid grid-cols-3 gap-2 gap-y-6">
              {data?.pages.map((file) => {
                return file.chattingMessageGetResponseList.map((item) => {
                  return classifyUrl(item.fileUrl, null) === 'image' ? (
                    <div
                      key={item.chattingMessageId}
                      style={{
                        backgroundImage: `url(${item.fileUrl})`,
                        width: '100%',
                        height: '150px',
                      }}
                      className="bg-center bg-cover"
                    />
                  ) : classifyUrl(item.fileUrl, null) === 'video' ? (
                    <video
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '150px',
                      }}
                      crossOrigin="anonymous"
                      src={item.fileUrl ?? ''}
                      controls
                      className="object-cover"
                    />
                  ) : null;
                });
              })}
            </div>
          </div>
        </Scrollbars>
      )}
    </div>
  );
};

export default FilePagekWrapper;
