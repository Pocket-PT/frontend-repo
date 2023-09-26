/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccountQueryResult } from 'apis/useAccountQuery';
import usePriceQuery from 'apis/usePriceQuery';
import MyLayout from 'components/MyLayout';
import useDeletePriceMutation from 'hooks/mutation/useDeletePriceMutation';
import useInput from 'hooks/useInput';
import usePatchPriceMutation from 'hooks/mutation/usePatchPriceMutation';
import usePostPriceMutation from 'hooks/mutation/usePostPriceMutation';
import usePushToPage from 'hooks/usePushToPage';
import BackIcon from 'icons/BackIcon';
import CheckIcon from 'icons/CheckIcon';
import EditIcon from 'icons/EditIcon';
import ExitIcon from 'icons/ExitIcon';
import { useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { cls } from 'utils/cls';
import truncateString from 'utils/truncateString';

const PricePageWrapper = () => {
  return (
    <MyLayout hasFooter={false}>
      <PricePage />
    </MyLayout>
  );
};
type PricePageProp = {
  result: AccountQueryResult;
};

interface IPriceData {
  trainerAccountId: number;
  monthlyPtPriceList: {
    monthlyPtPriceId: number;
    period: number;
    price: number;
  }[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PricePage: React.FC<any> = ({ result }: PricePageProp) => {
  console.log(result);
  const userCode = result.data?.data.identificationCode;
  const { data: priceData } = usePriceQuery<IPriceData>(userCode, {
    select: (res) => res.data.data,
  });
  const { mutate } = usePostPriceMutation();
  console.log(priceData?.monthlyPtPriceList.at(-1)?.period);
  const { pop } = usePushToPage();
  const handleAdd = () => {
    const nextPeriod = priceData?.monthlyPtPriceList?.at(-1)?.period || 0;
    const defaultData = {
      period: nextPeriod + 1,
      price: 0,
    };
    mutate(defaultData);
    return defaultData;
  };
  console.log('handleAdd');
  return (
    <>
      <div className="relative w-full h-full pl-5 pr-5 overflow-hidden">
        <div className="flex flex-row items-center mt-5">
          <div
            className="w-6 h-6"
            onClick={() => pop()}
            onKeyDown={() => pop()}
            role="presentation"
          >
            <BackIcon />
          </div>
          <div className="ml-4 text-xl font-extrabold leading-normal">가격</div>
        </div>
        <div className="w-full h-full mt-8">
          <Scrollbars autoHide autoHeight autoHeightMin={'80vh'}>
            <div>
              {priceData?.monthlyPtPriceList.map((price) => (
                <Card
                  key={price.monthlyPtPriceId}
                  id={price.monthlyPtPriceId}
                  month={price.period}
                  price={price.price}
                />
              ))}
            </div>
          </Scrollbars>
          <div className="absolute flex items-center w-full bottom-3">
            <button
              onClick={handleAdd}
              className="flex items-center justify-center w-[90%] bg-mainBlue h-14 rounded-xl"
            >
              <div className="text-base font-bold leading-tight text-center text-white">
                가격 플랜 추가
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

type CardProps = {
  id: number;
  month: number;
  price: number;
};

const Card = ({ id, month, price }: CardProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editMonth, onChangeEditMonth, setEditMonth] = useInput(month);
  const [editPrice, onChangeEditPrice, setEditPrice] = useInput(price);
  const { mutate: deletePrice } = useDeletePriceMutation(id);
  const { mutate: patchPrice } = usePatchPriceMutation(id);
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
    patchPrice({
      period: editMonth,
      price: editPrice,
    });
    setEditMonth(editMonth);
    setEditPrice(editPrice);
    setIsEdit(false);
    setIsActive(false);
    onValidDation();
    e.stopPropagation();
  };

  const onValidDation = () => {
    if (editMonth === 0 || editMonth === 0) {
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
      setEditMonth(month);
      setEditPrice(price);
      console.log('outside');
    }
  };

  useEffect(() => {
    document.addEventListener('click', (e) => handleOutsideClick(e));

    return () => {
      document.removeEventListener('click', (e) => handleOutsideClick(e));
    };
  }, []);

  return (
    <button className="relative w-full mb-3" onClick={propagation}>
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
                value={editMonth}
                onChange={onChangeEditMonth}
              />
              <div className="pt-1 text-xs font-normal leading-none text-gray">
                {truncateString('description', 20)}
              </div>
            </div>
            <input
              className="absolute block w-8 text-base font-bold right-6 focus-within:outline-none focus-within:border-b focus-within:border-b-gray"
              value={editPrice}
              onChange={onChangeEditPrice}
            />
          </>
        ) : (
          <>
            <div className="flex flex-col pl-6">
              <div className="text-base font-medium leading-tight">
                {truncateString(String(month), 20)}
              </div>
              <div className="pt-1 text-xs font-normal leading-none text-gray">
                {truncateString('description', 20)}
              </div>
            </div>
            <div className="absolute text-base font-bold right-6">
              {truncateString(String(price), 5)}
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
          onClick={() => deletePrice()}
          className="w-8 h-8 bg-red rounded-[22px] flex justify-center items-center stroke-white text-white"
        >
          <ExitIcon />
        </button>
      </div>
    </button>
  );
};

export default PricePageWrapper;
