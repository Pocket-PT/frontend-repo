import Layout from 'components/Layout';
import useInput from 'hooks/useInput';
import AddIcon from 'icons/AddIcon';
import CheckIcon from 'icons/CheckIcon';
import DeleteIcon from 'icons/DeleteIcon';
import EditIcon from 'icons/EditIcon';
import { useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import useMyProfileStore from 'stores/myProfile';
import { cls } from 'utils/cls';
import truncateString from 'utils/truncateString';

const PortfolioPage = () => {
  const { prizeTable, onEditPrizeTable, onAddPrizeTable, onDeletePrizeTable } =
    useMyProfileStore();
  const defaultNewPrize = {
    name: '대회명',
    date: '취득날짜',
    rank: '랭킹',
  };

  return (
    <Layout title="Portfolio">
      <div className="w-full h-full">
        <div className="flex items-center justify-center w-full h-24 text-xl font-bold text-center text bg-gray text-mainPurple">
          총 경력갯수 <br /> 배경 대충 멋진이미지
        </div>
        <Scrollbars autoHide autoHeight autoHeightMin={'80vh'}>
          <div className="px-6">
            <div className="flex flex-row mt-8 mb-1 text-lg font-bold">
              <div className="">대회</div>
            </div>
            {prizeTable.map((prize) => (
              <Card
                key={prize.key}
                uniqueKey={prize.key}
                title={prize.name}
                date={prize.date}
                rank={prize.rank}
                onEditPrizeTable={onEditPrizeTable}
                onDeletePrizeTable={onDeletePrizeTable}
              />
            ))}
            <div
              onClick={() => onAddPrizeTable(defaultNewPrize)}
              onKeyDown={() => onAddPrizeTable(defaultNewPrize)}
              role="presentation"
              className="flex items-center justify-center w-full mt-3 text-lightGray hover:text-gray active:text-dark"
            >
              <AddIcon />
            </div>
            <div className="mt-8 mb-1 text-lg font-bold">자격증</div>
          </div>
        </Scrollbars>
      </div>
    </Layout>
  );
};

type CardProps = {
  uniqueKey: number;
  title: string;
  date?: string;
  rank?: string;
  onEditPrizeTable: (
    key: number,
    name: string,
    date: string | undefined,
    rank: string | undefined,
  ) => void;
  onDeletePrizeTable: (key: number) => void;
};

const Card = ({
  uniqueKey,
  title,
  date,
  rank,
  onEditPrizeTable,
  onDeletePrizeTable,
}: CardProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, onChangeEditTitle, setEditTitle] = useInput(title);
  const [editDate, onChangeEditDate, setEditDate] = useInput(date);
  const [editRank, onChangeEditRank, setEditRank] = useInput(rank);
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
    onEditPrizeTable(uniqueKey, editTitle, editDate, editRank);
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
      setEditTitle(title);
      setEditDate(date);
      setEditRank(rank);
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
      className="relative w-full border-red"
      onClick={propagation}
      onKeyDown={propagation}
      role="presentation"
    >
      <div
        ref={ref}
        className={cls(
          'relative flex flex-row items-center w-full h-auto py-3 mb-1 bg-white shadow rounded z-10',
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
                className="text-lg font-bold outline-none text-mainPurple focus-within:outline-none focus-within:border-b focus-within:border-b-gray"
                value={editTitle}
                onChange={onChangeEditTitle}
              />
              <input
                className="text-sm text-gray focus-within:outline-none focus-within:border-b focus-within:border-b-gray"
                value={editDate}
                onChange={onChangeEditDate}
              />
            </div>
            <input
              className="absolute block w-8 right-6 focus-within:outline-none focus-within:border-b focus-within:border-b-gray"
              value={editRank}
              onChange={onChangeEditRank}
            />
          </>
        ) : (
          <>
            <div className="flex flex-col pl-6">
              <div className="text-lg font-bold text-mainPurple">
                {truncateString(title, 20)}
              </div>
              <div className="text-sm text-gray">
                {truncateString(date, 20)}
              </div>
            </div>
            <div className="absolute right-6">{truncateString(rank, 5)}</div>
          </>
        )}
      </div>
      <div
        className={cls(
          'absolute flex flex-row gap-6 right-2 top-12',
          isActive ? 'animate-slide-down mt-1' : 'animate-slide-up',
        )}
      >
        <div
          className="w-7 h-7 p-[2px] border rounded-full text-gray border-gray"
          onClick={onEdit}
          onKeyDown={handleKeyDown}
          role="presentation"
        >
          {isEdit ? (
            <div
              className="flex items-center justify-center w-full h-full transition-all duration-200 ease-in"
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
          className="w-7 h-7 p-[2px] border rounded-full text-red border-red"
          onClick={() => onDeletePrizeTable(uniqueKey)}
          onKeyDown={() => onDeletePrizeTable(uniqueKey)}
          role="presentation"
        >
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
