/* eslint-disable react/prop-types */
import { ActivityComponentType } from '@stackflow/react';
import useTrainerCodeQuery, {
  ITrainerCodeData,
  ITrainerErrorData,
} from 'apis/useTrainerCodeQuery';
import { AxiosError } from 'axios';
import MyLayout from 'components/MyLayout';
import Input from 'components/common/Input';
import LoadingSpinner from 'components/common/LoadingSpinner';
import dayjs from 'dayjs';
import usePostAmountMutation, {
  UsePostMutationDataReturnType,
  UsePostMutationReturnType,
} from 'hooks/mutation/usePostAmountMutation';
import usePostMatchingRequestMutation from 'hooks/mutation/usePostMatchingRequestMutation';
import useInput from 'hooks/useInput';
import usePushToPage from 'hooks/usePushToPage';
import BackIcon from 'icons/BackIcon';
import { useStepFlow } from 'libs/stackflow';
import { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { UseQueryResult } from 'react-query';
import { cls } from 'utils/cls';
import numberWithCommas from 'utils/numberWithCommas';

type TrainerApplyPageProps = {
  step?: string;
  name: string;
  profileUrl: string;
  month?: string;
  monthPrice?: string;
};

const TrainerApplyPageWrapper: ActivityComponentType<TrainerApplyPageProps> = ({
  params,
}) => {
  return (
    <MyLayout hasFooter={false}>
      <TrainerApplyPage params={params} />
    </MyLayout>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TrainerApplyPage: React.FC<any> = ({
  params,
}: {
  params: TrainerApplyPageProps;
}) => {
  const { name, profileUrl } = params;
  const { pop } = usePushToPage();
  const [trainerCode, onChangeTrainerCode] = useInput('lhGbiEGe');
  const { stepPush, stepPop } = useStepFlow('TrainerApplyPage');
  const [isSubmit, setIsSubmit] = useState(false);
  const trainerResult = useTrainerCodeQuery(trainerCode, {
    enabled: isSubmit,
  });
  const { mutate, data: amountData, isLoading } = usePostAmountMutation();

  return (
    <div className="relative">
      <button
        className="absolute z-10 w-6 h-6 text-white top-5 left-5"
        onClick={() => pop()}
      >
        <BackIcon />
      </button>
      <div className="absolute top-0 w-full h-full -z-40 bg-dark opacity-60" />
      <img
        className="absolute object-cover w-full h-full scale-125 -z-50 blur-lg"
        src={profileUrl}
        alt="trainer-profile"
      />
      {params.step === 'trainer-code' && (
        <TrainerCodeInputPage
          stepPush={stepPush}
          name={name}
          profileUrl={profileUrl}
          trainerResult={trainerResult}
          trainerCode={trainerCode}
          onChangeTrainerCode={onChangeTrainerCode}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
        />
      )}
      {params.step === 'trainer-month-plan' && (
        <TrainerMonthPlanPage
          stepPush={stepPush}
          name={name}
          data={trainerResult.data}
          error={trainerResult.error}
          profileUrl={profileUrl}
          stepPop={stepPop}
          trainerCode={trainerCode}
          mutate={mutate}
        />
      )}
      {params.step === 'trainer-info' && (
        <TrainerInfoPage
          name={name}
          profileUrl={profileUrl}
          month={params.month}
          stepPop={stepPop}
          amountData={amountData}
          isLoading={isLoading}
          trainerAccountId={trainerResult.data?.data.trainerAccountId}
          subscriptionPeriod={params.month}
          paymentAmount={amountData?.data.data}
        />
      )}
    </div>
  );
};

type TrainerCodeInputPageProps = {
  stepPush: (
    params: TrainerApplyPageProps,
    options?: object | undefined,
  ) => void;
  name: string;
  profileUrl: string;
  trainerResult: UseQueryResult<
    ITrainerCodeData,
    AxiosError<ITrainerErrorData, unknown>
  >;
  trainerCode: string;
  onChangeTrainerCode: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmit: boolean;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
};

const TrainerCodeInputPage = ({
  stepPush,
  profileUrl,
  name,
  trainerResult,
  trainerCode,
  onChangeTrainerCode,
  isSubmit,
  setIsSubmit,
}: TrainerCodeInputPageProps) => {
  const { status, error } = trainerResult;
  const handleSubmit = () => {
    console.log('test rerender refetch');
    setIsSubmit(true);
  };
  useEffect(() => {
    console.log('status', status);
    if (!isSubmit) return;
    if (status === 'error' && error !== null) {
      setIsSubmit(false);
    }
    if (status === 'success' && error === null) {
      console.log('이동', status, error, isSubmit);
      setIsSubmit(false);
      stepPush({ step: 'trainer-month-plan', name, profileUrl });
    }
  }, [isSubmit, status, error]);

  console.log(trainerResult.error);

  return (
    <div className="w-full relative h-[100vh] overflow-hidden">
      <div className="w-full h-full px-10 pt-20">
        <div className="text-center text-white text-2xl font-bold leading-[31px]">
          트레이너 코드를
          <br />
          입력해주세요
        </div>
        <img
          className="w-[15vh] rounded-full h-[15vh] mx-auto mt-14"
          src={profileUrl}
          alt="trainer-profile"
        />
        <div className="mt-3 mb-4 text-2xl font-bold leading-tight text-center text-white">
          {name}
        </div>
        <Input>
          <Input.TextField
            value={trainerCode}
            onChange={onChangeTrainerCode}
            placeholder="트레이너 코드"
          />
        </Input>
        <button
          className={cls(
            'flex items-center justify-center w-full py-4 mt-3 duration-300 ease-in-out transform active:scale-105 rounded-xl',
            trainerResult.error ? 'bg-red' : 'bg-mainBlue',
          )}
          onClick={handleSubmit}
          disabled={
            trainerCode === '' ||
            trainerResult.isLoading ||
            !!trainerResult.error
          }
        >
          <div className="text-base font-bold leading-tight text-center text-white">
            {trainerResult.error
              ? trainerResult.error.response?.data.message.replace(
                  'PT matching 관련 오류 - ',
                  '',
                )
              : '확인'}
          </div>
        </button>
      </div>
    </div>
  );
};

type TrainerMonthPlanPageProps = {
  stepPush: (
    params: TrainerApplyPageProps,
    options?: object | undefined,
  ) => void;
  name: string;
  profileUrl: string;
  data: ITrainerCodeData | undefined;
  error: AxiosError<ITrainerErrorData> | null;
  stepPop: (options?: object | undefined) => void;
  trainerCode: string;
  mutate: UsePostMutationReturnType;
};

const TrainerMonthPlanPage = ({
  stepPush,
  name,
  profileUrl,
  stepPop,
  data,
  mutate,
}: TrainerMonthPlanPageProps) => {
  const [inputMonth, onChangeInputMonth] = useInput('');
  const [directMode, setDirectMode] = useState(false);
  const [month, setMonth] = useState('');

  const onClickMonthPlan = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setMonth(e.currentTarget.id);
    if (e.currentTarget.id === 'direct') {
      setMonth('');
      setDirectMode(true);
    } else {
      setDirectMode(false);
    }
  };

  const onValidInput = () => {
    if (inputMonth === '') return false;
    if (inputMonth === '0') return false;
    const numericRegex = /^[0-9]+$/;
    if (!numericRegex.test(inputMonth)) return false;
    return true;
  };

  const handleSubmit = () => {
    if (data?.data.monthlyPtPriceList === undefined) return;
    mutate({
      subscriptionPeriod: +month,
      monthlyPtPriceList: data.data.monthlyPtPriceList,
    });
    stepPush({
      step: 'trainer-info',
      name,
      profileUrl,
      month: month,
    });
  };

  useEffect(() => {
    if (onValidInput()) {
      console.log('onValidInput True');
      setMonth(inputMonth);
    } else {
      setMonth('');
    }
  }, [inputMonth]);

  return (
    <div className="w-full relative h-[100vh] overflow-hidden">
      <div className="w-full h-full px-10 pt-20">
        <div className="text-center text-white text-2xl font-bold leading-[31px] mb-6">
          PT 기간을
          <br />
          입력해주세요
        </div>
        <Input>
          {directMode ? (
            <Input.TextField
              value={inputMonth}
              placeholder="숫자만 입력해주세요"
              onChange={onChangeInputMonth}
            />
          ) : (
            <Input.TextField
              value={month ? month + '개월 플랜' : '개월을 선택해주세요'}
              placeholder="PT 기간"
              readOnly
            />
          )}
        </Input>
        <div className="mt-6">
          <Scrollbars
            autoHide
            autoHeight
            autoHeightMax={'45vh'}
            autoHeightMin={'45vh'}
          >
            <div className="w-full h-[45vh] pt-5 space-y-6 bg-white rounded-tr rounded-tl">
              {data?.data.monthlyPtPriceList.map((plan) => {
                return (
                  <button
                    id={String(plan.period)}
                    className="flex items-center justify-between w-full h-10 px-6 bg-white"
                    key={plan.monthlyPtPriceId}
                    onClick={(e) => onClickMonthPlan(e)}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <div className="text-base font-medium leading-tight">
                        {plan.period}개월 플랜
                      </div>
                      <div className="text-xs font-normal leading-none">
                        {`1개월 당 ${
                          !Number.isNaN(Math.floor(plan.price / plan.period))
                            ? numberWithCommas(
                                Math.floor(plan.price / plan.period),
                              )
                            : 0
                        }원`}
                      </div>
                    </div>
                    <div className="text-base font-bold leading-tight">
                      {numberWithCommas(plan.price)}원
                    </div>
                  </button>
                );
              })}
            </div>
          </Scrollbars>
          <button
            id={'direct'}
            className="flex items-center justify-center w-full h-10 px-6 bg-white rounded-bl rounded-br"
            onClick={(e) => onClickMonthPlan(e)}
          >
            <div className="text-base font-medium leading-tight">직접입력</div>
          </button>
        </div>
        <div className="flex flex-row gap-2 mt-6">
          <button
            className="w-full transition-all duration-300 ease-in-out transform rounded-md h-9 bg-hoverGray active:scale-105"
            onClick={() => stepPop()}
          >
            <div className="text-base font-normal leading-tight text-gray">
              이전
            </div>
          </button>
          <button
            className={cls(
              'w-full rounded-md h-9 bg-mainBlue text-white transform transition-all duration-300 ease-in-out',
              month !== '' ? '' : 'opacity-40',
            )}
            disabled={month === ''}
            onClick={handleSubmit}
          >
            <div className="text-base font-normal leading-tight">다음</div>
          </button>
        </div>
      </div>
    </div>
  );
};

type TrainerInfoPageProps = {
  name: string;
  profileUrl: string;
  month?: string;
  stepPop: (options?: object | undefined) => void;
  amountData: UsePostMutationDataReturnType;
  isLoading: boolean;
  trainerAccountId: number | undefined;
  subscriptionPeriod: string | undefined;
  paymentAmount: number | undefined;
};

const TrainerInfoPage = ({
  name,
  profileUrl,
  month,
  stepPop,
  isLoading,
  amountData,
  trainerAccountId,
  subscriptionPeriod,
  paymentAmount,
}: TrainerInfoPageProps) => {
  const { data, mutate, error } = usePostMatchingRequestMutation();
  const { moveTo } = usePushToPage();
  const nowDate = dayjs(new Date()).format('YYYY-MM-DD');
  const isNotValidData =
    !trainerAccountId || !subscriptionPeriod || !paymentAmount;
  const handleSubmit = () => {
    console.log('submit');
    if (isNotValidData) return;
    mutate({
      trainerAccountId: trainerAccountId,
      subscriptionPeriod: +subscriptionPeriod,
      paymentAmount: paymentAmount,
      startDate: nowDate,
    });
  };

  useEffect(() => {
    console.log('errorMesage :', data, error);
    if (data?.data.message === 'PT 요청 성공') {
      alert('PT 요청 성공');
      moveTo('Main');
    } else if (error) {
      alert(error.response?.data.message);
      stepPop();
    }
  }, [data, error]);

  return (
    <div className="w-full relative h-[100vh] overflow-hidden">
      <div className="w-full h-full px-10 pt-20">
        <div className="text-center text-white text-2xl font-bold leading-[31px] mb-6">
          마지막으로
          <br />
          확인해주세요
        </div>
        <img
          className="w-[15vh] rounded-full h-[15vh] mx-auto mt-14"
          src={profileUrl}
          alt="trainer-profile"
        />
        <div className="mt-3 mb-4 text-2xl font-bold leading-tight text-center text-white">
          {name}
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="text-base font-medium leading-tight text-center text-white">
            {month}개월 /{' '}
            {numberWithCommas(amountData ? amountData.data.data : 0)}원
          </div>
        )}
        <div className="flex flex-row gap-2 mt-6">
          <button
            className="w-full transition-all duration-300 ease-in-out transform rounded-md h-9 bg-hoverGray active:scale-105"
            onClick={() => stepPop()}
          >
            <div className="text-base font-normal leading-tight text-gray">
              이전
            </div>
          </button>
          <button
            className={cls(
              'w-full rounded-md h-9 bg-mainBlue text-white transform transition-all duration-300 ease-in-out',
              isLoading || isNotValidData ? 'opacity-40' : '',
            )}
            disabled={isLoading || isNotValidData}
            onClick={handleSubmit}
          >
            <div className="text-base font-normal leading-tight">확인</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerApplyPageWrapper;
