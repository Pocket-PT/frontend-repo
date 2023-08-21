import { AppScreen } from '@stackflow/plugin-basic-ui';
import useChatRoomQuery from 'apis/useChatRoomQuery';
import DMList from 'components/DMList';
import Footer from 'components/Footer';
import { FOOTER_HEIGHT, HEADER_HEIGHT } from 'constants/global';
import useUser from 'hooks/useUser';
import { Link } from 'libs/link';
import Scrollbars from 'react-custom-scrollbars-2';

const ChatListPage = () => {
  const { data: myData } = useUser();
  console.log('myData', myData);
  const { data } = useChatRoomQuery({
    select: (res) => res.data,
  });
  console.log('chatList', data);
  return (
    <AppScreen backgroundColor="#FAFAFA">
      <div className="relative mt-5 h-7">
        <div className="absolute text-xl font-extrabold leading-normal left-5">
          채팅
        </div>
        <div className="absolute text-sm font-semibold leading-tight right-5 text-gray text-opacity-40 top-[5px]">
          편집
        </div>
      </div>
      <Scrollbars
        autoHide
        autoHeight
        autoHeightMin={`calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px - 8px)`}
      >
        <div className="w-full px-5 mt-7">
          {data?.data.map((item) => (
            <Link
              key={item.chattingRoomId}
              activityName="ChatRoomPage"
              activityParams={{ id: String(item.chattingRoomId) }}
            >
              <DMList
                name={item.roomName}
                profilePictureUrl={
                  item.chattingParticipantResponseList[0]
                    .accountProfilePictureUrl
                }
                lastFileUrl={item.latestFileUrl}
                latestChattingMessage={item.latestChattingMessage}
                latestChattingMessageCreatedAt={
                  item.latestChattingMessageCreatedAt
                }
                createAt={item.createdAt}
                notViewCount={item.notViewCount}
              />
            </Link>
          ))}
        </div>
      </Scrollbars>
      <Footer />
    </AppScreen>
  );
};

export default ChatListPage;
