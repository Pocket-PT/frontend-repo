import { CareerListData, useCareerQuery } from 'apis/useCareerQuery';
import MyLayout from 'components/MyLayout';
import usePatchCareerMutation from 'hooks/usePatchCareerMutation';
import useInput from 'hooks/useInput';
import usePostCareerMutation from 'hooks/usePostCareerMutation';
import usePushToPage from 'hooks/usePushToPage';
import AddIcon from 'icons/AddIcon';
import BackIcon from 'icons/BackIcon';
import CheckIcon from 'icons/CheckIcon';
import EditIcon from 'icons/EditIcon';
import ExitIcon from 'icons/ExitIcon';
import { useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { cls } from 'utils/cls';
import truncateString from 'utils/truncateString';
import useDeleteCareerMutation from 'hooks/useDeleteCareerMutation';
import { AccountQueryResult } from 'apis/useAccountQuery';

type CategoryProps = {
  title: string;
  data?: CareerListData[];
  handleAdd: (
    type: string,
    defaultData: { type: string; title: string; date: string },
  ) => void;
};

const Category = ({ title, data, handleAdd }: CategoryProps) => {
  const categoryType = title === '대회' ? 'competition' : 'license';
  const defaultData = {
    type: categoryType,
    title: '제목을 입력해주세요',
    date: '취득날짜를 입력해주세요',
  };

  return (
    <>
      <div className="relative flex flex-row items-center mt-8 mb-1 text-lg font-bold">
        <div>{title}</div>
        <div
          className="absolute flex flex-row right-5 text-mainBlue hover:cursor-pointer"
          onClick={() => handleAdd(categoryType, defaultData)}
          onKeyDown={() => handleAdd(categoryType, defaultData)}
          role="presentation"
        >
          <div className="w-4 h-4 mr-1">
            <AddIcon />
          </div>
          <span className="text-sm font-semibold leading-tight text-right">
            {title} 추가
          </span>
        </div>
      </div>
      {data?.map((career) => (
        <Card
          key={career.careerId}
          id={career.careerId}
          title={career.title}
          date={career.date}
        />
      ))}
    </>
  );
};

const PortfolioPageWrapper = () => {
  return (
    <MyLayout hasFooter={false}>
      <PortfolioPage />
    </MyLayout>
  );
};

type PortfolioPageProp = {
  result: AccountQueryResult;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PortfolioPage: React.FC<any> = ({ result }: PortfolioPageProp) => {
  console.log('result', result);
  const userId = result.data?.data.accountId;
  const { data: careerData } = useCareerQuery(userId);
  const { mutate } = usePostCareerMutation();

  const handleAdd = (
    type: string,
    defaultData: { type: string; title: string; date: string },
  ) => {
    console.log('handleAdd', type);
    if (type === 'competition') {
      console.log('대회');
      mutate({ careerList: [defaultData] });
    }
    if (type === 'license') {
      console.log('자격증');
      mutate({ careerList: [defaultData] });
    }
  };

  const { pop } = usePushToPage();

  return (
    <>
      <div className="relative flex flex-row items-center mt-5 ml-5">
        <div
          className="w-6 h-6"
          onClick={() => pop()}
          onKeyDown={() => pop()}
          role="presentation"
        >
          <BackIcon />
        </div>
        <div className="ml-4 text-xl font-extrabold leading-normal">
          포트폴리오
        </div>
      </div>
      <div className="w-full h-full">
        <Scrollbars autoHide autoHeight autoHeightMin={'80vh'}>
          <div className="px-6">
            <Category
              title="대회"
              data={careerData?.data.careerList.filter(
                (career) => career.type === 'competition',
              )}
              handleAdd={handleAdd}
            />
            <Category
              title="자격증"
              data={careerData?.data.careerList.filter(
                (career) => career.type === 'license',
              )}
              handleAdd={handleAdd}
            />
          </div>
        </Scrollbars>
      </div>
    </>
  );
};

type CardProps = {
  id: number;
  title: string;
  date: string;
};

const Card = ({ id, title, date }: CardProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, onChangeEditTitle, setEditTitle] = useInput(title);
  const [editDate, onChangeEditDate, setEditDate] = useInput(date);
  const { mutate: deleteCareer } = useDeleteCareerMutation(id);
  const { mutate: patchCareer } = usePatchCareerMutation(id);
  console.log('cardId', id);
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
    console.log('handleCheck');
    onValidDation();
    patchCareer({ title: editTitle, date: editDate });
    setEditTitle(editTitle);
    setEditDate(editDate);
    setIsEdit(false);
    setIsActive(false);
    e.stopPropagation();
  };

  const onValidDation = () => {
    if (editTitle.trim() === '') {
      return setEditTitle('대회명을 입력해주세요');
    } else if (editDate && editDate.trim() === '') {
      return setEditDate('취득날짜를 입력해주세요');
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
          'relative flex flex-row items-center w-full h-20 py-3 bg-hoverGray z-10 rounded rounded-xl"',
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
          </>
        ) : (
          <>
            <div className="flex flex-col pl-6">
              <div className="text-base font-medium leading-tight">
                {truncateString(title, 20)}
              </div>
              <div className="pt-1 text-xs font-normal leading-none text-gray">
                {truncateString(date, 20)}
              </div>
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
          onClick={() => {
            deleteCareer();
            console.log('delete');
          }}
          onKeyDown={() => {
            deleteCareer();
            console.log('delete');
          }}
          role="presentation"
        >
          <ExitIcon />
        </div>
      </div>
    </div>
  );
};

export default PortfolioPageWrapper;
