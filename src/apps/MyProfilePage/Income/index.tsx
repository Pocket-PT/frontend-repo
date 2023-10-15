import usePushToPage from 'hooks/usePushToPage';
import BackIcon from 'icons/BackIcon';
import { DatePicker, DatePickerProps, Select } from 'antd';
import locale from 'antd/es/date-picker/locale/ko_KR';
import 'dayjs/locale/ko';
import useIncomeQuery from 'apis/useIncomeQuery';
import { useEffect, useRef, useState } from 'react';
import { splitNumber } from 'utils/splitNumber';
import MyLayout from 'components/MyLayout';
import Scrollbars from 'react-custom-scrollbars-2';
import LoadingSpinner from 'components/common/LoadingSpinner';
import { FOOTER_HEIGHT } from 'constants/global';

const IncomeWrapper = () => {
  return (
    <MyLayout hasFooter={false}>
      <IncomePage />
    </MyLayout>
  );
};

const IncomePage = () => {
  const dataPickerRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const divRefTwo = useRef<HTMLDivElement>(null);
  const [refHeights, setRefHeights] = useState<number[]>([]);
  const [isRefLoading, setIsRefLoading] = useState<boolean>(true);
  const { pop } = usePushToPage();
  const [filters, setFilters] = useState({ value: 0, date: '' });
  const { data, isLoading } = useIncomeQuery(filters);

  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    setFilters({ ...filters, date: dateString });
  };

  useEffect(() => {
    if (dataPickerRef.current && divRef.current && divRefTwo.current) {
      setRefHeights([
        dataPickerRef.current?.clientHeight ?? 0,
        divRef.current?.clientHeight ?? 0,
        divRefTwo.current?.clientHeight ?? 0,
      ]);
      setIsRefLoading(false);
    }
  }, [dataPickerRef.current, divRef.current, divRefTwo.current, isLoading]);

  const totalSales = data?.data.ptMatchingSummaryList.reduce(
    (acc, cur) => acc + cur.paymentAmount,
    0,
  );

  const genPlanOptions = () => {
    const tmp = Array.from(
      new Set(
        data?.data.ptMatchingSummaryList
          .map((item) => item.subscriptionPeriod)
          .sort((a, b) => b - a),
      ),
    ).map((item) => {
      return { value: item + '개월', label: item + '개월' };
    });

    tmp.unshift({ value: '전체', label: '전체' });

    return tmp;
  };

  const options = genPlanOptions();

  const onPlanSelect = (value: string) => {
    console.log(+value.replace('개월', ''));
    if (value === '전체') return setFilters({ ...filters, value: 0 });
    setFilters({ ...filters, value: +value.replace('개월', '') });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="relative flex flex-row items-center mx-5 mt-5">
        <div
          className="w-6 h-6"
          onClick={() => pop()}
          onKeyDown={() => pop()}
          role="presentation"
        >
          <BackIcon />
        </div>
        <div className="ml-4 text-xl font-extrabold leading-normal">매출</div>
      </div>
      <div className="mt-3 ml-5">
        <div ref={dataPickerRef}>
          <DatePicker
            locale={locale}
            picker="month"
            onChange={onDateChange}
            placeholder="월별 매출 조회"
          />
        </div>
        <div className="mt-5">
          <div ref={divRef}>
            <div className="text-xs font-bold leading-normal text-mainBlue">
              매출
            </div>
            <div className="flex flex-row items-center gap-3 text-2xl font-bold">
              <div className="text-2xl font-bold leading-normal">
                {splitNumber(totalSales, 3)}원
              </div>
              <div className="text-xs font-normal leading-normal text-gray">
                결제 {data?.data.ptMatchingSummaryList.length}건
              </div>
            </div>
          </div>
          <div ref={divRefTwo}>
            <Select
              placeholder="플랜 별 조회"
              style={{
                width: 120,
                marginTop: 30,
              }}
              options={options}
              onSelect={onPlanSelect}
            />
          </div>
          {isRefLoading ? (
            <LoadingSpinner />
          ) : (
            <Scrollbars
              autoHide
              autoHeight
              autoHeightMin={`calc(100vh - ${refHeights[0]}px - ${refHeights[1]}px - ${refHeights[2]}px - ${FOOTER_HEIGHT}px)`}
            >
              {data?.data.ptMatchingSummaryList.map((item) => {
                return (
                  <PlanCard
                    key={item.ptMatchingId}
                    period={item.subscriptionPeriod}
                    expiredDate={item.expiredDate}
                    paymentAmount={item.paymentAmount}
                    name={item.name}
                    profilePictureUrl={item.profilePictureUrl}
                  />
                );
              })}
            </Scrollbars>
          )}
        </div>
      </div>
    </>
  );
};

type PlanCardProps = {
  period: number;
  expiredDate: string;
  paymentAmount: number;
  name: string;
  profilePictureUrl: string;
};

const PlanCard = ({
  period,
  paymentAmount,
  expiredDate,
  name,
  profilePictureUrl,
}: PlanCardProps) => {
  return (
    <div className="relative flex flex-row items-center w-full h-auto mt-8">
      <div className="text-base font-medium leading-none">{period}개월</div>
      <div className=" absolute left-[12%] text-xs font-normal leading-none text-gray">
        {expiredDate}
      </div>
      <div className="flex flex-row items-center">
        <img
          className="w-6 h-6 rounded-full absolute left-[40%]"
          src={profilePictureUrl}
          alt="#"
        />
        <div className=" absolute left-[48%] text-sm font-medium leading-none">
          {name}
        </div>
        <div className="absolute text-base font-normal leading-none right-5 text-mainBlue">
          {splitNumber(paymentAmount, 3)}원
        </div>
      </div>
    </div>
  );
};

export default IncomeWrapper;
