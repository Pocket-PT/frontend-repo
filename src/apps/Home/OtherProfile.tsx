/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { ActivityComponentType, useStack } from '@stackflow/react';
import BottomWhitePlain from 'components/common/BottomWhitePlain';
import BackIcon from 'icons/BackIcon';
import MoreIcon from 'icons/MoreIcon';
import usePushToPage from 'hooks/usePushToPage';
import { Link } from 'libs/link';
import MyLayout from 'components/MyLayout';
import useOtherProfileQuery from 'apis/useOtherProfileQuery';
import truncateString from 'utils/truncateString';
import { StaticImage } from 'gatsby-plugin-image';

type OtherProfileProps = {
  ptMatchingId: string;
  status: string;
  subscriptionPeriod: string;
  paymentAmount: string;
  startDate: string;
  expiredDate: string;
  rejectReason: string;
  accountId: string;
  name: string;
  phoneNumber: string;
  email: string;
  profilePictureUrl: string;
};

const OtherProfileWrapper: ActivityComponentType<OtherProfileProps> = ({
  params,
}) => {
  return (
    <MyLayout hasFooter={false}>
      <OhterProfile params={params} />
    </MyLayout>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OhterProfile: React.FC<any> = ({
  params,
}: {
  params: OtherProfileProps;
}) => {
  const stack = useStack();
  const { pop } = usePushToPage();
  const accountId = params.accountId;
  const { data } = useOtherProfileQuery(+accountId);
  useEffect(() => {
    console.log('OtherProfilePage', stack);
  }, [stack]);

  return (
    <div className="relative">
      <button
        className="absolute z-10 w-6 h-6 text-white top-5 left-5"
        onClick={() => pop()}
      >
        <BackIcon />
      </button>
      <div className="overflow-hidden h-[100vh]">
        <div
          className="absolute w-full h-full bg-center bg-repeat bg-cover -z-10"
          style={{
            backgroundImage: "url('otherprofile-background.png')",
          }}
        />
        <div className="absolute text-white right-5 top-5">
          <MoreIcon />
        </div>
        <div className="w-full h-[46vh] flex-col justify-start items-center gap-4 inline-flex relative mb-5 mt-5">
          <img
            className="w-[15vh] rounded-full h-[15vh]"
            src={params.profilePictureUrl}
            alt="#"
          />
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="w-full text-2xl font-extrabold leading-7 text-center text-white">
              {params.name}
            </div>
            <div className="w-full text-xs font-normal leading-none text-center text-white text-opacity-60">
              {params.email}
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-2.5 flex">
            <div className="w-full h-[8vh] bg-dark bg-opacity-20 pl-5 rounded-xl flex flex-col justify-center space-y-1">
              <div className="text-xs font-normal leading-none text-white text-opacity-60">
                회원 등록 기간
              </div>
              <div className="text-sm font-semibold leading-tight text-white">
                {`${params.startDate} ~ ${params.expiredDate}`}
              </div>
            </div>
            <div className="justify-start items-start gap-2.5 inline-flex">
              <Link
                activityName="ChatRoomPage"
                activityParams={{
                  id: String(params.ptMatchingId),
                  title: 'chatRoomPage',
                }}
              >
                <div className="w-[28vw] h-[8vh] relative bg-dark bg-opacity-20 rounded-xl flex justify-center items-center gap-2 flex-col active:scale-105 active:bg-opacity-40">
                  <div
                    className="w-[2.8vh] h-[2.8vh] text-white object-cover bg-cover"
                    style={{
                      backgroundImage: "url('ChatIcon.png')",
                    }}
                  />
                  <div className="w-full text-xs font-medium leading-none text-center text-white">
                    채팅
                  </div>
                </div>
              </Link>
              <div className="w-[28vw] h-[8vh] relative bg-dark bg-opacity-20 rounded-xl flex justify-center items-center gap-2 flex-col">
                <div
                  className="w-[2.8vh] h-[2.8vh] text-white object-cover bg-cover"
                  style={{
                    backgroundImage: "url('TelIcon.png')",
                  }}
                />
                <div className="w-full text-xs font-medium leading-none text-center text-white">
                  통화
                </div>
              </div>
              <div className="w-[28vw] h-[8vh] relative bg-dark bg-opacity-20 rounded-xl flex justify-center items-center gap-2 flex-col">
                <div
                  className="w-[2.8vh] h-[2.8vh] text-white object-cover bg-cover"
                  style={{
                    backgroundImage: "url('SmsIcon.png')",
                  }}
                />
                <div className="w-full text-xs font-medium leading-none text-center text-white">
                  문자
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomWhitePlain>
          <div className="text-xl font-bold leading-normal">
            목표
            <span className="pl-1 font-normal leading-normal text-gray">
              {data?.purposeDtoList.length}
            </span>
          </div>
          {data?.purposeDtoList.length ? (
            data.purposeDtoList.map((purpose) => (
              <GoalCard
                key={purpose.purposeId}
                title={purpose.title}
                content={purpose.content}
                dday={purpose.dday}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center mx-0 my-auto">
              <StaticImage
                src="../../../static/Nopurpose.jpg"
                style={{
                  width: '70%',
                  height: '70%',
                  objectFit: 'fill',
                }}
                alt='<a href="https://kr.freepik.com/free-vector/workout-concept-illustration_7069793.htm#page=2&query=gym&position=4&from_view=search&track=sph">작가 storyset</a> 출처 Freepik'
              />
              <div className="font-medium">
                {data?.name} 회원님의 목표가 없습니다
              </div>
            </div>
          )}
        </BottomWhitePlain>
      </div>
    </div>
  );
};

type GoalCardProps = {
  title: string;
  content: string;
  dday: number;
};

const GoalCard = ({ title, content, dday }: GoalCardProps) => {
  return (
    <div className="relative w-full h-8 my-8">
      <div className="absolute top-0 text-base font-medium leading-tight">
        {truncateString(title, 10)}
      </div>
      <div className="absolute mt-1 text-xs font-normal leading-none text-gray top-5">
        {truncateString(content, 20)}
      </div>
      <div className="absolute right-0 text-base font-bold leading-tight text-right text-mainBlue top-2">
        D-{dday}
      </div>
    </div>
  );
};

export default OtherProfileWrapper;
