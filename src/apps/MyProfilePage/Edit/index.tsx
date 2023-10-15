/* eslint-disable react/prop-types */
import MyLayout from 'components/MyLayout';
import useInput from 'hooks/useInput';
import usePushToPage from 'hooks/usePushToPage';
import BackIcon from 'icons/BackIcon';
import { ActivityComponentType } from '@stackflow/react';
import { cls } from 'utils/cls';
import { useStepFlow } from 'libs/stackflow';
import useDeleteLogout from 'hooks/mutation/useDeleteLogoutOrWithdrawal';
import BottomModal from 'components/common/BottomModal';
import usePan from 'hooks/usePan';

type MyProfileEditPageProp = {
  name: string | undefined;
  introduce: string | undefined;
  profilePictureUrl: string | undefined;
  title?: string;
};

const MyProfileEditPageWrapper: ActivityComponentType<
  MyProfileEditPageProp
> = ({ params }) => {
  return (
    <MyLayout hasFooter={false}>
      <MyProfileEditPage params={params} />
    </MyLayout>
  );
};

const MyProfileEditPage = ({ params }: { params: MyProfileEditPageProp }) => {
  const { stepPush, stepPop } = useStepFlow('MyProfileEditPage');
  const { name, introduce, profilePictureUrl } = params;
  const [editIntroduce, onChangeEditIntroduce] = useInput(introduce);
  const { moveTo, pop } = usePushToPage();
  const isIntroduceChanged = introduce !== editIntroduce;

  const onClickAdditionalInfo = () => {
    stepPush({
      name,
      introduce,
      profilePictureUrl,
      title: 'additionalInfo',
    });
  };

  const onValidateForm = () => {
    if (editIntroduce?.trim() === '') {
      alert('상태메세지를 입력해주세요');
      return false;
    }
    if (editIntroduce && editIntroduce.length > 60) {
      alert('상태메세지는 60자 이내로 입력해주세요');
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (!onValidateForm()) return;
    console.log('editIntroduce', editIntroduce);
    moveTo('MyProfilePage');
  };

  if (params.title === 'additionalInfo') {
    return <AdditionalInfo stepPop={stepPop} />;
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <button
        className="absolute z-10 w-6 h-6 top-5 text-dark left-5"
        onClick={() => pop()}
      >
        <BackIcon />
      </button>
      <div className="px-6 mt-12 space-y-3 ">
        <img
          src={profilePictureUrl}
          className="w-20 h-20 mx-auto rounded-full ring-4 ring-lightGray"
          alt="profilePicture"
        />
        <div className="space-y-3">
          <div className="w-full text-center">{name}</div>
          <div>
            <textarea
              className="w-full h-24 p-3 transition-all duration-300 ease-in-out border rounded-md outline-none resize-none border-lightGray focus:outline-none focus:ring-1 focus:ring-mainBlue"
              placeholder="상태메세지를 입력해주세요. (최대 60자)"
              onChange={onChangeEditIntroduce}
              value={editIntroduce === null ? '' : editIntroduce}
            />
          </div>
        </div>
        <button
          disabled={!isIntroduceChanged}
          onClick={onSubmit}
          className={cls(
            'flex items-center justify-center w-full h-14 rounded-xl transform transition-all duration-300 ease-in-out',
            isIntroduceChanged
              ? 'bg-mainBlue text-white active:scale-105'
              : 'bg-lightGray text-dark text-opacity-60',
          )}
        >
          <div className="text-base font-bold leading-tight text-center text-white">
            수정완료
          </div>
        </button>
        <button
          className="w-full text-sm text-center underline text-gray"
          onClick={onClickAdditionalInfo}
        >
          추가 계정 작업
        </button>
      </div>
    </div>
  );
};

type AdditionalInfoProp = {
  stepPop: (options?: object | undefined) => void;
};
const AdditionalInfo = ({ stepPop }: AdditionalInfoProp) => {
  const { mutate: logOutMutate } = useDeleteLogout('logout');
  const { mutate: withdrawalMutate } = useDeleteLogout('withdrawal');
  const { isOpen, setIsOpen, bindPanDown } = usePan();
  const onClickLogout = () => {
    logOutMutate();
  };
  const onClickWithdrawal = () => {
    setIsOpen(true);
  };

  const onClickRealWithdrawal = () => {
    withdrawalMutate();
    setIsOpen(false);
  };

  const onClickCancel = () => {
    setIsOpen(false);
  };
  return (
    <div className="relative w-full overflow-hidden">
      <button
        className="absolute z-10 w-6 h-6 top-5 text-dark left-5"
        onClick={() => stepPop()}
      >
        <BackIcon />
      </button>
      <div className="w-full h-[100vh]">
        <div className="flex flex-col items-center justify-center w-full h-full px-6 space-y-6">
          <button
            className={cls(
              'flex items-center justify-center w-full h-14 bg-lightGray text-dark rounded-xl active:scale-105 transform transition-all duration-300 ease-in-out',
            )}
            onClick={onClickLogout}
          >
            <div className="text-base font-bold leading-tight text-center text-white">
              로그아웃
            </div>
          </button>
          <button
            onClick={onClickWithdrawal}
            className={cls(
              'flex items-center justify-center w-full h-14 bg-red text-white rounded-xl active:scale-105 transform transition-all duration-300 ease-in-out',
            )}
          >
            <div className="text-base font-bold leading-tight text-center text-white">
              회원탈퇴
            </div>
          </button>
        </div>
      </div>
      <BottomModal isOpen={isOpen} bindPanDown={bindPanDown}>
        <div className="pt-6 space-y-6 ">
          <div className="w-full text-center">정말 탈퇴하시겠습니까?</div>
          <div className="flex flex-row w-full gap-3">
            <button
              className="flex items-center justify-center w-1/2 rounded-md h-9 bg-lightGray"
              onClick={onClickCancel}
            >
              <div className="text-base font-normal leading-tight text-gray">
                취소
              </div>
            </button>
            <button
              onClick={onClickRealWithdrawal}
              className={cls(
                'flex items-center justify-center w-1/2 rounded-md h-9 bg-red',
              )}
            >
              <div className="text-base font-normal leading-tight text-white">
                탈퇴
              </div>
            </button>
          </div>
        </div>
      </BottomModal>
    </div>
  );
};

export default MyProfileEditPageWrapper;
