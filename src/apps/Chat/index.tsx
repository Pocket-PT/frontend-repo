import { AppScreen } from '@stackflow/plugin-basic-ui';
import DMList from 'components/DMList';
import Footer from 'components/Footer';
import { FOOTER_HEIGHT, HEADER_HEIGHT } from 'constants/global';
import { Link } from 'libs/link';
import Scrollbars from 'react-custom-scrollbars-2';

const ChatListPage = () => {
  const testList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <AppScreen backgroundColor="#FAFAFA">
      <div className="relative mt-5 h-7">
        <div className="absolute text-xl font-extrabold leading-normal left-5">
          채팅
        </div>
        <div className="absolute text-sm font-semibold leading-tight right-5 text-mainBlue top-[5px]">
          편집
        </div>
      </div>
      <Scrollbars
        autoHide
        autoHeight
        autoHeightMin={`calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px - 8px)`}
      >
        <div className="w-full px-5 mt-7">
          {testList.map((item) => (
            <Link
              key={item}
              activityName="ChatRoomPage"
              activityParams={{ id: String(item) }}
            >
              <DMList />
            </Link>
          ))}
        </div>
      </Scrollbars>
      <Footer />
    </AppScreen>
  );
};

export default ChatListPage;
