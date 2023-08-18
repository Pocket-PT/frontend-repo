import { AppScreen } from '@stackflow/plugin-basic-ui';
import useInput from 'hooks/useInput';
import usePushToPage from 'hooks/usePushToPage';
import BackIcon from 'icons/BackIcon';
import CheckIcon from 'icons/CheckIcon';
import EditIcon from 'icons/EditIcon';
import ExitIcon from 'icons/ExitIcon';
import { useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import useMyProfileStore from 'stores/myProfile';
import { cls } from 'utils/cls';
import truncateString from 'utils/truncateString';

const PricePage = () => {
  const { priceTable, onEditPriceTable, onDeletePriceTable } =
    useMyProfileStore();
  const { pop } = usePushToPage();

  console.log(priceTable);

  return (
    <AppScreen>
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
              {priceTable.map((price) => (
                <Card
                  key={price.key}
                  uniqueKey={price.key}
                  month={price.month}
                  description={price.description}
                  price={price.price}
                  onEditPriceTable={onEditPriceTable}
                  onDeletePriceTable={onDeletePriceTable}
                />
              ))}
            </div>
          </Scrollbars>
          <div className="absolute flex items-center w-full bottom-3">
            <div className="flex items-center justify-center w-[90%] bg-mainBlue h-14 rounded-xl">
              <div className="text-base font-bold leading-tight text-center text-white">
                가격 플랜 추가
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppScreen>
  );
};

type CardProps = {
  uniqueKey: number;
  month: string;
  description: string;
  price: string;
  onEditPriceTable: (key: number, month: string, price: string) => void;
  onDeletePriceTable: (key: number) => void;
};

const Card = ({
  uniqueKey,
  month,
  description,
  price,
  onEditPriceTable,
  onDeletePriceTable,
}: CardProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, onChangeEditTitle, setEditTitle] = useInput(month);
  const [editDate, onChangeEditDate, setEditDate] = useInput(description);
  const [editRank, onChangeEditRank, setEditRank] = useInput(price);
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
    onEditPriceTable(uniqueKey, editTitle, editRank);
    console.log('test');
    setEditTitle(editTitle);
    setEditDate(editDate);
    setEditRank(editRank);
    setIsEdit(false);
    setIsActive(false);
    onValidDation();
    e.stopPropagation();
  };

  const onValidDation = () => {
    if (editTitle.trim() === '') {
      return setEditTitle('대회명을 입력해주세요');
    } else if (editDate && editDate.trim() === '') {
      return setEditDate('취득날짜를 입력해주세요');
    } else if (editRank && editRank.trim() === '') {
      return setEditRank('랭킹을 입력해주세요');
    }
  };

  const propagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsActive(false);
      setIsEdit(false);
      setEditTitle(month);
      setEditDate(description);
      setEditRank(price);
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
    <div
      className="relative w-full mb-3"
      onClick={propagation}
      onKeyDown={propagation}
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
                value={editTitle}
                onChange={onChangeEditTitle}
              />
              <input
                className="pt-1 text-xs font-normal leading-none text-gray focus-within:outline-none focus-within:border-b focus-within:border-b-gray"
                value={editDate}
                onChange={onChangeEditDate}
              />
            </div>
            <input
              className="absolute block w-8 text-base font-bold right-6 focus-within:outline-none focus-within:border-b focus-within:border-b-gray"
              value={editRank}
              onChange={onChangeEditRank}
            />
          </>
        ) : (
          <>
            <div className="flex flex-col pl-6">
              <div className="text-base font-medium leading-tight">
                {truncateString(month, 20)}
              </div>
              <div className="pt-1 text-xs font-normal leading-none text-gray">
                {truncateString(description, 20)}
              </div>
            </div>
            <div className="absolute text-base font-bold right-6">
              {truncateString(price, 5)}
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
            <div
              className="flex items-center justify-center w-full h-full transition-all duration-200 ease-in stroke-[#666666]"
              onClick={handleCheck}
              onKeyDown={handleCheck}
              role="presentation"
            >
              <CheckIcon />
            </div>
          ) : (
            <div>
              <EditIcon />
            </div>
          )}
        </div>
        <div
          className="w-8 h-8 bg-red rounded-[22px] flex justify-center items-center stroke-white text-white"
          onClick={() => onDeletePriceTable(uniqueKey)}
          onKeyDown={() => onDeletePriceTable(uniqueKey)}
          role="presentation"
        >
          <ExitIcon />
        </div>
      </div>
    </div>
  );
};

export default PricePage;
