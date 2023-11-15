/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { useStepFlow } from 'libs/stackflow';
import useHashLocation from 'hooks/useHashLocation';
import useTokenStore from '../../stores/token';
import { useEffect, useRef, useState } from 'react';
import { ActivityComponentType } from '@stackflow/react';
import Input from 'components/common/Input';
import { cls } from 'utils/cls';
import useInput from 'hooks/useInput';
import { koreanOrEnglishRegex, koreanPhoneNumberRegex } from 'constants/global';
import React from 'react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import Scrollbars from 'react-custom-scrollbars-2';
import CheckIcon from 'icons/CheckIcon';
import EditIcon from 'icons/EditIcon';
import ExitIcon from 'icons/ExitIcon';
import truncateString from 'utils/truncateString';
import useMyProfileStore from '../../stores/myProfile';
import FirstPrivacy from 'components/FirstPrivacy';
import SecondPrivacy from 'components/common/SecondPrivacy';
import usePatchAccountMutation from 'hooks/mutation/usePatchAccountMutation';
import usePushToPage from 'hooks/usePushToPage';
import numberWithCommas from 'utils/numberWithCommas';
import { useCheckSignupQuery } from 'apis/useCheckSignupQuery';
import useQueryLoadingStore from 'stores/queryLoading';
import LoadingSpinnerTwo from 'components/common/LoadingSpinnerTwo';

type BeforeLoginProps = {
  title?: string;
};

const TRAINER = 'trainer' as const;
const TRAINEE = 'trainee' as const;

const BeforeLogin: ActivityComponentType<BeforeLoginProps> = ({ params }) => {
  const { data } = useCheckSignupQuery();
  const { stepPush, stepReplace } = useStepFlow('BeforeLogin');
  const { replaceTo } = usePushToPage();
  const { setToken } = useTokenStore();
  const { params: props } = useHashLocation();
  const [userRole, setUserRole] = useState<'trainer' | 'trainee'>(TRAINEE);
  const [inputName, onChangeInputName] = useInput('');
  const [phoneNumber, onChangePhoneNumber] = useInput('');

  useEffect(() => {
    setToken(props.accessToken ?? '');
  }, []);

  useEffect(() => {
    if (data?.data.isAccountSignedUp) {
      replaceTo('Main');
    }
  }, [data]);

  if (params.title === undefined || params.title === 'CheckPrivacy') {
    return (
      <AppScreen>
        <PrivacyPage stepPush={stepPush} />
      </AppScreen>
    );
  }

  if (params.title === 'FirstPrivacy') {
    return (
      <AppScreen>
        <FirstPrivacy stepReplace={stepReplace} />
      </AppScreen>
    );
  }

  if (params.title === 'SecondPrivacy') {
    return (
      <AppScreen>
        <SecondPrivacy stepReplace={stepReplace} />
      </AppScreen>
    );
  }

  if (params.title === 'SelectUserRole') {
    return (
      <AppScreen>
        <SelectUserRole
          stepPush={stepPush}
          userRole={userRole}
          setUserRole={setUserRole}
        />
      </AppScreen>
    );
  }

  if (params.title === 'NameAndPhoneNumber') {
    return (
      <AppScreen>
        <NameAndPhoneNumberBox
          stepPush={stepPush}
          userRole={userRole}
          inputName={inputName}
          onChangeInputName={onChangeInputName}
          phoneNumber={phoneNumber}
          onChangePhoneNumber={onChangePhoneNumber}
        />
      </AppScreen>
    );
  }

  if (params.title === 'FinalStep') {
    return (
      <AppScreen>
        <FinalStep
          inputName={inputName}
          phoneNumber={phoneNumber}
          userRole={userRole}
        />
      </AppScreen>
    );
  }
};

const CheckButton = ({
  labelId,
  isCheck,
  setIsCheck,
  handleAllCheck,
}: {
  labelId: string;
  isCheck: boolean;
  setIsCheck: React.Dispatch<React.SetStateAction<boolean>>;
  handleAllCheck?: () => void;
}) => {
  const onClick = () => {
    if (handleAllCheck) {
      handleAllCheck();
      return;
    }
    setIsCheck((prev) => !prev);
  };
  return isCheck ? (
    <button id={labelId} onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.3753 14.5613L8.34044 12.5264C8.1137 12.2997 7.75324 12.2997 7.5265 12.5264C7.29976 12.7532 7.29976 13.1136 7.5265 13.3404L9.96251 15.7764C10.1892 16.0031 10.5555 16.0031 10.7823 15.7764L16.945 9.61949C17.1717 9.39275 17.1717 9.03229 16.945 8.80555C16.7182 8.57881 16.3578 8.57881 16.131 8.80555L10.3753 14.5613Z"
          fill="black"
        />
        <circle cx="12" cy="12" r="11.5" stroke="black" />
      </svg>
    </button>
  ) : (
    <button id={labelId} className=" text-gray" onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="11.5" stroke="currentColor" />
      </svg>
    </button>
  );
};

interface PrivacyPageProps {
  stepPush: (params: BeforeLoginProps, options?: object | undefined) => void;
}

const PrivacyPage = ({ stepPush }: PrivacyPageProps) => {
  const [allCheck, setAllCheck] = useState(false);
  const [firstCheck, setFirstCheck] = useState(false);
  const [secondCheck, setSecondCheck] = useState(false);
  const handleAllCheck = () => {
    if (
      (firstCheck && !secondCheck) ||
      (!firstCheck && secondCheck) ||
      (!firstCheck && !secondCheck)
    ) {
      setAllCheck(true);
      setFirstCheck(true);
      setSecondCheck(true);
    } else {
      setAllCheck(false);
      setFirstCheck(false);
      setSecondCheck(false);
    }
  };

  const onFirstClick = () => {
    stepPush({
      title: 'FirstPrivacy',
    });
  };

  useEffect(() => {
    if (firstCheck && secondCheck) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [firstCheck, secondCheck]);

  const onValid = firstCheck && secondCheck;

  const onSecondClick = () => {
    stepPush({
      title: 'SecondPrivacy',
    });
  };

  const goNext = () => {
    if (!onValid) {
      return;
    }
    stepPush({
      title: 'SelectUserRole',
    });
  };
  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
      <div className="w-full px-6">
        <div className="text-2xl font-bold">
          <span className="text-mainBlue">POCKET PT</span> 개인정보 처리 방침
        </div>
        <div className="flex items-center w-full gap-6 px-3 py-3 mt-2 mb-2 text-lg">
          <CheckButton
            labelId={'allCheck'}
            isCheck={allCheck}
            setIsCheck={setAllCheck}
            handleAllCheck={handleAllCheck}
          />
          <label className="font-semibold " htmlFor="allCheck">
            모두 확인, 동의합니다
          </label>
        </div>
        <div className="space-y-2">
          <div className="flex items-center w-full gap-6 px-3 py-3">
            <CheckButton
              labelId={'firstCheck'}
              isCheck={firstCheck}
              setIsCheck={setFirstCheck}
            />
            <div className="flex flex-row items-center justify-between w-full">
              <label htmlFor="firstCheck">{'[필수] : 이용 약관 동의'} </label>
              <svg
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-1"
                onClick={onFirstClick}
              >
                <path
                  d="M0.727806 12.2803C0.424065 11.9874 0.424065 11.5126 0.727806 11.2197L5.62228 6.5L0.727806 1.78033C0.424065 1.48744 0.424065 1.01256 0.727806 0.719671C1.03155 0.426777 1.52401 0.426777 1.82775 0.719671L7.27219 5.96967C7.57593 6.26256 7.57593 6.73744 7.27219 7.03033L1.82775 12.2803C1.52401 12.5732 1.03155 12.5732 0.727806 12.2803Z"
                  fill="#212121"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center w-full gap-6 px-3 py-3">
            <CheckButton
              labelId={'secondCheck'}
              isCheck={secondCheck}
              setIsCheck={setSecondCheck}
            />
            <div className="flex flex-row items-center justify-between w-full">
              <label htmlFor="secondCheck">
                {'[필수] : 개인 정보 처리 방침 동의'}
              </label>
              <svg
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-1"
                onClick={onSecondClick}
              >
                <path
                  d="M0.727806 12.2803C0.424065 11.9874 0.424065 11.5126 0.727806 11.2197L5.62228 6.5L0.727806 1.78033C0.424065 1.48744 0.424065 1.01256 0.727806 0.719671C1.03155 0.426777 1.52401 0.426777 1.82775 0.719671L7.27219 5.96967C7.57593 6.26256 7.57593 6.73744 7.27219 7.03033L1.82775 12.2803C1.52401 12.5732 1.03155 12.5732 0.727806 12.2803Z"
                  fill="#212121"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-8">
          <button
            className={cls(
              'flex text-base font-bold leading-tight text-center items-center justify-center w-[90%] h-14 rounded-xl transform duration-300 ease-in-out',
              onValid
                ? 'bg-mainBlue text-white'
                : 'bg-lightGray text-gray text-opacity-40',
            )}
            disabled={!onValid}
            onClick={goNext}
          >
            다음 단계 진행
          </button>
        </div>
      </div>
    </div>
  );
};

interface FinalStepProps {
  inputName: string;
  phoneNumber: string;
  userRole: 'trainer' | 'trainee';
}

type TrainerData = {
  name: string;
  phoneNumber: string;
  monthlyPtPriceList?: {
    period: number;
    price: number;
  }[];
};

const FinalStep = ({ inputName, phoneNumber, userRole }: FinalStepProps) => {
  const { priceTable, onAddPriceTable, onEditPriceTable, onDeletePriceTable } =
    useMyProfileStore();
  const handleAdd = () => {
    onAddPriceTable(0, 0);
  };
  const { replaceTo } = usePushToPage();
  const { mutate } = usePatchAccountMutation<TrainerData>(userRole);
  const { refetch } = useCheckSignupQuery();
  const { signUpLoading } = useQueryLoadingStore();

  const onSubmit = () => {
    const monthlyPtPriceList = priceTable.map((monthlyPtPrice) => {
      return {
        period: monthlyPtPrice.period,
        price: monthlyPtPrice.price,
      };
    });
    mutate(
      {
        name: inputName,
        phoneNumber,
        monthlyPtPriceList,
      },
      {
        onSuccess: async () => {
          if ((await refetch()).isSuccess) {
            alert('회원가입이 완료되었습니다.');
            replaceTo('Main');
          }
        },
        onError: () => {
          alert('회원가입에 실패했습니다.');
        },
      },
    );
  };
  return (
    <div className="relative flex w-full h-full overflow-hidden">
      <div className="w-full px-6 mt-10">
        <div className="flex justify-between">
          <div className="text-2xl font-bold">PT가격을 책정해주세요</div>
          <button
            className="text-sm font-bold text-mainBlue"
            onClick={handleAdd}
          >
            가격 플랜 추가
          </button>
        </div>
        <div className="w-full h-full mt-8">
          <Scrollbars autoHide autoHeight autoHeightMin={'70vh'}>
            <div>
              {priceTable.map((price) => (
                <Card
                  key={price.monthlyPtPriceId}
                  id={price.monthlyPtPriceId}
                  period={price.period}
                  price={price.price}
                  onEditPriceTable={onEditPriceTable}
                  onDeletePriceTable={onDeletePriceTable}
                />
              ))}
            </div>
          </Scrollbars>
          <div className="absolute flex items-center w-full bottom-3">
            <button
              onClick={onSubmit}
              className="flex text-base font-bold leading-tight text-center text-white items-center justify-center w-[90%] bg-mainBlue h-14 rounded-xl active:scale-105 transition-all duration-300 ease-in-out"
            >
              {signUpLoading ? (
                <div className="text-white">
                  <LoadingSpinnerTwo />
                </div>
              ) : (
                '회원 가입 완료'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

type CardProps = {
  id: number;
  period: number;
  price: number;
  onEditPriceTable: (
    monthlyPtPriceId: number,
    period: number,
    price: number,
  ) => void;
  onDeletePriceTable: (monthlyPtPriceId: number) => void;
};

const Card = ({
  id,
  period,
  price,
  onEditPriceTable,
  onDeletePriceTable,
}: CardProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editPeriod, onChangeEditPeriod, setEditPeriod] = useInput(period);
  const [editPrice, onChangeEditPrice, setEditPrice] = useInput(price);
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEdit) return;
    setIsActive((prev) => !prev);
  };

  const onEdit = (e: React.MouseEvent) => {
    if (!isEdit) {
      e.stopPropagation();
    }
    setIsEdit((prev) => !prev);
  };
  const handleKeyDown = () => {
    setIsEdit((prev) => !prev);
  };
  const handleCheck = (e: React.MouseEvent) => {
    onValidDation();
    setEditPeriod(+editPeriod);
    setEditPrice(+editPrice);
    onEditPriceTable(id, editPeriod, editPrice);
    setIsEdit(false);
    setIsActive(false);
    e.stopPropagation();
  };

  const onValidDation = () => {
    if (editPeriod === 0 || editPrice === 0) {
      return;
    }
    if (Number.isNaN(editPeriod) || Number.isNaN(editPrice)) {
      return;
    }
  };

  const propagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsActive(false);
      setIsEdit(false);
      setEditPeriod(period);
      setEditPrice(price);
    }
  };

  useEffect(() => {
    document.addEventListener('click', (e) => handleOutsideClick(e));

    return () => {
      document.removeEventListener('click', (e) => handleOutsideClick(e));
    };
  }, [period, price]);

  return (
    <div
      className="relative w-full mb-3"
      onClick={propagation}
      onKeyDown={() => {}}
      role="presentation"
    >
      <div
        ref={ref}
        className={cls(
          'relative flex flex-row items-center w-full h-20 py-3 bg-hoverGray z-10 rounded-xl',
          isActive
            ? 'shadow-mainPurple mb-12 duration-300'
            : 'shadow-lightGray duration-300',
        )}
        onClick={handleClick}
        role="presentation"
      >
        {isEdit ? (
          <>
            <div className="flex flex-col pl-6">
              <input
                className="text-base font-medium leading-tight focus-within:outline-none focus-within:border-b focus-within:border-b-gray"
                value={editPeriod}
                onChange={onChangeEditPeriod}
              />
              <div className="pt-1 text-xs font-normal leading-none text-gray">
                {`1개월 당 ${
                  !Number.isNaN(Math.floor(price / period))
                    ? numberWithCommas(Math.floor(price / period))
                    : 0
                }원`}
              </div>
            </div>
            <input
              className="absolute block text-base font-bold w-14 right-6 focus-within:outline-none focus-within:border-b focus-within:border-b-gray"
              value={editPrice}
              onChange={onChangeEditPrice}
            />
          </>
        ) : (
          <>
            <div className="flex flex-col pl-6">
              <div className="text-base font-medium leading-tight">
                {truncateString(String(period) + '개월', 20)}
              </div>
              <div className="pt-1 text-xs font-normal leading-none text-gray">
                {`1개월 당 ${
                  !Number.isNaN(Math.floor(price / period))
                    ? numberWithCommas(Math.floor(price / period))
                    : 0
                }원`}
              </div>
            </div>
            <div className="absolute text-base font-bold right-6">
              {truncateString(String(numberWithCommas(price)) + '원', 10)}
            </div>
          </>
        )}
      </div>
      <div
        className={cls(
          'absolute flex flex-row gap-6 right-2 top-12',
          isActive ? 'animate-slide-down mt-[5px]' : 'animate-slide-up',
        )}
      >
        <div
          className="w-8 h-8 p-2 bg-hoverGray rounded-[22px] justify-start items-start gap-2.5 inline-flex"
          onClick={onEdit}
          onKeyDown={handleKeyDown}
          role="presentation"
        >
          {isEdit ? (
            <button
              className="flex items-center justify-center w-full h-full transition-all duration-200 ease-in stroke-[#666666]"
              onClick={handleCheck}
            >
              <CheckIcon />
            </button>
          ) : (
            <div>
              <EditIcon />
            </div>
          )}
        </div>
        <button
          onClick={() => onDeletePriceTable(id)}
          className="w-8 h-8 bg-red rounded-[22px] flex justify-center items-center stroke-white text-white"
        >
          <ExitIcon />
        </button>
      </div>
    </div>
  );
};

interface SelectUserRoleProps {
  stepPush: (params: BeforeLoginProps, options?: object | undefined) => void;
  userRole: string;
  setUserRole: React.Dispatch<React.SetStateAction<'trainer' | 'trainee'>>;
}

const SelectUserRole = ({
  stepPush,
  userRole,
  setUserRole,
}: SelectUserRoleProps) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const onNextClick = () => {
    // `stepPush()`을 호출하면 params.title이 변경돼요.
    stepPush({
      title: 'NameAndPhoneNumber',
    });
  };

  const onClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent,
  ) => {
    const target = e.target as HTMLButtonElement;
    setUserRole(target.innerText === TRAINER ? TRAINER : TRAINEE);
    setIsDisabled(false);
  };

  return (
    <div className="flex w-full h-full overflow-hidden">
      <div className="w-full px-6 mt-[20vh]">
        <div className="text-2xl font-bold">회원분류를 선택해주세요</div>
        <div className="font-normal text-gray">
          회원님에게 맞는 서비스 제공을 위해 필요합니다
        </div>
        <div className="flex flex-row w-full h-16 mt-8 mb-8 rounded shadow">
          <button
            onClick={(e) => onClick(e)}
            className={cls(
              'flex items-center justify-center w-1/2 h-full border-r border-lightGray rounded-tl-xl rounded-bl-xl transition-all duration-300 ease-in-out',
              userRole === TRAINER
                ? 'bg-mainBlue text-white'
                : 'bg-white text-darkGray',
            )}
          >
            트레이너
          </button>
          <button
            className={cls(
              'flex items-center justify-center w-1/2 h-full rounded-tr-xl rounded-br-xl  transition-all duration-300 ease-in-out',
              userRole === TRAINEE
                ? 'bg-mainBlue text-white'
                : 'bg-white text-darkGray',
            )}
            onClick={(e) => onClick(e)}
          >
            일반회원
          </button>
        </div>
        <div className="flex items-center justify-center w-full mt-8">
          <button
            onClick={onNextClick}
            disabled={isDisabled}
            className={cls(
              'flex text-base font-bold leading-tight text-center items-center justify-center w-full h-14 rounded-xl transform duration-300 ease-in-out',
              isDisabled
                ? 'bg-lightGray text-gray text-opacity-40'
                : 'bg-mainBlue text-white',
            )}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

interface NameAndPhoneNumberBoxProps {
  stepPush: (params: BeforeLoginProps, options?: object | undefined) => void;
  userRole: 'trainer' | 'trainee';
  inputName: string;
  onChangeInputName: (e: unknown) => void;
  phoneNumber: string;
  onChangePhoneNumber: (e: unknown) => void;
}

const NameAndPhoneNumberBox = ({
  stepPush,
  userRole,
  inputName,
  onChangeInputName,
  phoneNumber,
  onChangePhoneNumber,
}: NameAndPhoneNumberBoxProps) => {
  const [isSubmit, setIsSubmit] = useState(true);
  const { replaceTo } = usePushToPage();
  const { mutate } = usePatchAccountMutation<TrainerData>(userRole);
  const { refetch } = useCheckSignupQuery();

  const onSubmit = () => {
    if (!onValidation()) {
      alert('입력값을 확인해주세요.');
      return;
    }
    stepPush({
      title: 'FinalStep',
    });
  };

  const onTraineeSubmit = () => {
    mutate(
      {
        name: inputName,
        phoneNumber,
      },
      {
        onSuccess: async () => {
          if ((await refetch()).isSuccess) {
            alert('회원가입이 완료되었습니다.');
            replaceTo('Main');
          }
        },
        onError: () => {
          alert('회원가입에 실패했습니다.');
        },
      },
    );
  };

  const onValidation = () => {
    if (!koreanOrEnglishRegex.test(inputName)) {
      console.log(inputName);
      console.log(koreanOrEnglishRegex.test(inputName));
      return false;
    }
    if (!koreanPhoneNumberRegex.test(phoneNumber)) {
      console.log(phoneNumber);
      console.log(koreanPhoneNumberRegex.test(phoneNumber));
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (onValidation()) {
      setIsSubmit(false);
    } else {
      setIsSubmit(true);
    }
  }, [inputName, phoneNumber]);

  return (
    <div className="flex w-full h-full overflow-hidden">
      <div className="w-full px-6 mt-[20vh]">
        <div className="text-2xl font-bold">
          이름과 핸드폰번호를 입력해주세요
        </div>
        <div className="font-normal text-gray">
          회원님에게 맞는 서비스 제공을 위해 필요합니다
        </div>
        <div className="mt-8 space-y-2">
          <Input>
            <Input.TextField
              value={inputName}
              onChange={onChangeInputName}
              placeholder="이름"
            />
          </Input>
          <Input>
            <Input.TextField
              value={phoneNumber}
              onChange={onChangePhoneNumber}
              placeholder="휴대폰 번호"
            />
          </Input>
          {userRole === TRAINER ? (
            <button
              onClick={onSubmit}
              disabled={isSubmit}
              className={cls(
                'flex text-base font-bold leading-tight text-center items-center justify-center w-full h-14 rounded-xl transform duration-300 ease-in-out',
                isSubmit
                  ? 'bg-lightGray text-gray text-opacity-40'
                  : 'bg-mainBlue text-white',
              )}
            >
              다음
            </button>
          ) : (
            <button
              onClick={onTraineeSubmit}
              disabled={isSubmit}
              className={cls(
                'flex text-base font-bold leading-tight text-center items-center justify-center w-full h-14 rounded-xl transform duration-300 ease-in-out',
                isSubmit
                  ? 'bg-lightGray text-gray text-opacity-40'
                  : 'bg-mainBlue text-white',
              )}
            >
              회원가입
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(BeforeLogin);
