import usePTManagementQuery, { IPTData } from 'apis/usePTManagementQuery';
import MyLayout from 'components/MyLayout';
import useInput from 'hooks/useInput';
import usePatchPTManagementMutation from 'hooks/mutation/usePatchPTManagementMutation';
import usePushToPage from 'hooks/usePushToPage';
import BackIcon from 'icons/BackIcon';
import { useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { cls } from 'utils/cls';
import BottomModal from 'components/common/BottomModal';
import usePan from 'hooks/usePan';
import LoadingSpinner from 'components/common/LoadingSpinner';
import { FOOTER_HEIGHT } from 'constants/global';

const PTManagementPageWrapper = () => {
  return (
    <MyLayout hasFooter={false}>
      <PTManagementPage />
    </MyLayout>
  );
};

const PTManagementPage = () => {
  const { pop } = usePushToPage();
  const [mode] = useState('pending');
  const { data } = usePTManagementQuery(mode);
  const { isOpen, setIsOpen, bindPanDown } = usePan();
  const [isAccept, setIsAccept] = useState(true);
  const [targetId, setTargetId] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const [refHeights, setRefHeights] = useState<number[]>([]);
  const [isRefLoading, setIsRefLoading] = useState<boolean>(true);

  const handleAcceptModalOpen = (id: number) => {
    console.log('handleAcceptModalOpen', id);
    setIsOpen(true);
    setIsAccept(true);
    setTargetId(id);
  };
  const handleRejectModalOpen = (id: number) => {
    console.log('handleRejectModalOpen', id);
    setIsOpen(true);
    setIsAccept(false);
    setTargetId(id);
  };

  useEffect(() => {
    if (titleRef.current) {
      setRefHeights([titleRef.current?.clientHeight ?? 0]);
      setIsRefLoading(false);
    }
  }, [titleRef.current]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={titleRef}
        className="relative flex flex-row items-center mt-5 ml-5"
      >
        <button
          className="w-6 h-6"
          onClick={() => {
            pop();
          }}
        >
          <BackIcon />
        </button>
        <div className="ml-4 text-xl font-extrabold leading-normal">
          PT신청목록
        </div>
      </div>
      <div className="w-full h-full">
        <div className="w-full px-5 mt-8">
          {isRefLoading ? (
            <LoadingSpinner />
          ) : (
            <Scrollbars
              autoHide
              autoHeight
              autoHeightMin={`calc(100vh - ${refHeights[0]}px - ${FOOTER_HEIGHT}px)`}
            >
              {data?.data.map((pt) => {
                return (
                  <PTCard
                    key={pt.ptMatchingId}
                    id={pt.ptMatchingId}
                    profileUrl={pt.profilePictureUrl}
                    name={pt.name}
                    email={pt.email}
                    month={pt.subscriptionPeriod}
                    phoneNumber={pt.phoneNumber}
                    handleAcceptModalOpen={handleAcceptModalOpen}
                    handleRejectModalOpen={handleRejectModalOpen}
                  />
                );
              })}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => {
                return (
                  <PTCard
                    key={v}
                    id={v}
                    profileUrl="https://via.placeholder.com/44x44"
                    name="김일곤"
                    email="email@test.com"
                    month={5}
                    phoneNumber="01012345678"
                    handleAcceptModalOpen={handleAcceptModalOpen}
                    handleRejectModalOpen={handleRejectModalOpen}
                  />
                );
              })}
            </Scrollbars>
          )}
        </div>
      </div>
      <BottomModal isOpen={isOpen} bindPanDown={bindPanDown}>
        <AcceptOrRejectModal
          modalData={data?.data.find((pt) => pt.ptMatchingId === targetId)}
          isAccept={isAccept}
          targetId={targetId}
          setIsOpen={setIsOpen}
        />
      </BottomModal>
    </div>
  );
};

const AcceptOrRejectModal = ({
  modalData,
  isAccept,
  targetId,
  setIsOpen,
}: {
  modalData: IPTData | undefined;
  isAccept: boolean;
  targetId: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  console.log('modalData', modalData);
  const [rejectText, onChangeRejectText] = useInput('');
  const { mutate: acceptMutate } = usePatchPTManagementMutation(targetId, true);
  const { mutate: rejectMutate } = usePatchPTManagementMutation(
    targetId,
    false,
  );
  const handleAccept = () => {
    acceptMutate({ rejectReason: rejectText });
    setIsOpen(false);
  };

  const handleReject = () => {
    if (rejectText.trim() === '') {
      alert('거절 사유를 입력해주세요.');
      return;
    }
    rejectMutate({ rejectReason: rejectText });
    setIsOpen(false);
  };

  return (
    <div className="text-center mt-11">
      <div className="mb-6 text-2xl font-bold leading-normal">
        <span>정말 </span>
        <span
          className={cls(
            'text-2xl font-bold leading-normal',
            isAccept ? 'text-mainBlue' : 'text-red',
          )}
        >
          {isAccept ? '수락' : '거절'}
        </span>
        <span className="text-2xl font-bold leading-normal">하시겠습니까?</span>
      </div>
      <div className="flex flex-col items-center justify-center mb-6">
        <img
          className="mb-4 rounded-full w-14 h-14"
          src={
            modalData?.profilePictureUrl || 'https://via.placeholder.com/56x56'
          }
          alt="profile"
        />
        <div className="mb-1 text-xl font-medium leading-tight">
          {modalData?.name || '김일곤'}
        </div>
        <div className="text-sm font-medium leading-tight text-mainBlue">
          {modalData?.subscriptionPeriod || '5'}개월
        </div>
      </div>
      {isAccept ? null : (
        <div>
          <textarea
            className="w-full h-24 p-3 mb-6 transition-all duration-300 ease-in-out border rounded-md outline-none resize-none border-lightGray focus:outline-none focus:ring-1 focus:ring-dark"
            placeholder="신청한 회원에게 전달될 거절사유를 입력해주세요.(50자 이내)"
            onChange={onChangeRejectText}
            value={rejectText}
          />
        </div>
      )}
      <div className="flex flex-row w-full gap-3">
        <button
          className="flex items-center justify-center w-1/2 rounded-md h-9 bg-lightGray"
          onClick={() => setIsOpen(false)}
        >
          <div className="text-base font-normal leading-tight text-gray">
            취소
          </div>
        </button>
        <button
          className={cls(
            'flex items-center justify-center w-1/2 rounded-md h-9',
            isAccept
              ? 'bg-mainBlue'
              : !isAccept && rejectText.trim() === ''
              ? 'bg-lightGray'
              : 'bg-red',
          )}
          onClick={isAccept ? handleAccept : handleReject}
        >
          <div className="text-base font-normal leading-tight text-white">
            {isAccept ? '수락' : '거절'}
          </div>
        </button>
      </div>
    </div>
  );
};

type PTCardProps = {
  profileUrl?: string;
  id: number;
  name?: string;
  month?: number;
  phoneNumber?: string;
  email?: string;
  handleAcceptModalOpen: (id: number) => void;
  handleRejectModalOpen: (id: number) => void;
};
//
const PTCard = ({
  id,
  profileUrl,
  name,
  month,
  phoneNumber,
  email,
  handleAcceptModalOpen,
  handleRejectModalOpen,
}: PTCardProps) => {
  return (
    <>
      <div className="relative w-full px-5 py-4 mb-3 bg-white rounded-xl">
        <div className="flex flex-row items-center">
          <img
            className="rounded-full w-11 h-11"
            src={profileUrl}
            alt="profile"
          />
          <div className="ml-3 text-base font-medium leading-tight">{name}</div>
          <div className="ml-2 text-xs font-medium leading-tight text-mainBlue">
            {month}개월
          </div>
        </div>
        <div className="ml-12 space-y-2">
          <div className="flex flex-row items-center space-x-2 text-sm text-gray">
            <div>
              <svg
                width="10"
                height="14"
                viewBox="0 0 10 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.68779 0.307291L2.45678 0.066486C3.17737 -0.15916 3.94726 0.205505 4.25585 0.918624L4.86995 2.33777C5.13755 2.95618 4.98906 3.68342 4.50282 4.13571L3.14973 5.39431C3.23322 6.14715 3.49144 6.88845 3.9244 7.61821C4.35735 8.34797 4.89808 8.95333 5.54659 9.43429L7.17173 8.90321C7.78773 8.7019 8.45858 8.93324 8.83643 9.47727L9.71669 10.7447C10.1559 11.3771 10.0769 12.2495 9.53191 12.7857L8.94782 13.3604C8.36645 13.9323 7.53606 14.1398 6.76791 13.905C4.95445 13.3506 3.28708 11.7048 1.76581 8.96746C0.242335 6.22614 -0.295343 3.90033 0.15278 1.99002C0.341348 1.1862 0.925288 0.546063 1.68779 0.307291Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>{phoneNumber}</div>
          </div>
          <div className="flex flex-row items-center space-x-2 text-gray">
            <div>
              <svg
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 3.168V8.76562C14 9.95708 13.0505 10.9307 11.8541 10.9965L11.725 11H2.275C1.06188 11 0.0705279 10.0674 0.00360138 8.89242L0 8.76562V3.168L6.7564 6.64426C6.90897 6.72275 7.09103 6.72275 7.2436 6.64426L14 3.168ZM2.275 0H11.725C12.9043 0 13.8741 0.881315 13.9887 2.00994L7 5.60542L0.0113342 2.00994C0.121703 0.923116 1.02502 0.0656218 2.14486 0.00359461L2.275 0H11.725H2.275Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>{email}</div>
          </div>
        </div>
        <div className="flex flex-row w-full mt-4 space-x-5">
          <div
            className="flex items-center justify-center w-1/2 h-8 text-center rounded-md bg-lightGray"
            onClick={() => handleRejectModalOpen(id)}
            onKeyDown={() => handleRejectModalOpen(id)}
            role="presentation"
          >
            <div className="text-sm">거절</div>
          </div>
          <div
            className="flex items-center justify-center w-1/2 h-8 text-center rounded-md bg-mainBlue"
            onClick={() => handleAcceptModalOpen(id)}
            onKeyDown={() => handleAcceptModalOpen(id)}
            role="presentation"
          >
            <div className="text-sm text-white">수락</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PTManagementPageWrapper;
