'use client';

import { useEffect, useRef, useState } from 'react';
import DeleteIcon from '../../../../public/icons/DeleteIcon';
import EditIcon from '../../../../public/icons/EditIcon';
import { cls } from '@/utils/cls';
import Link from 'next/link';
import Scrollbars from 'react-custom-scrollbars-2';

type CardProps = {
  title: string;
  date?: string;
  rank?: string;
};

const Card = ({ title, date, rank }: CardProps) => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsActive((prev) => !prev);
  };

  const propagation = (e: React.MouseEvent) => {
    handleClick();
    e.stopPropagation();
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div
        ref={ref}
        className={cls(
          'relative flex flex-row items-center w-full h-auto py-3 mb-1 bg-white border rounded z-10',
          isActive
            ? 'border-mainPurple mb-12 duration-300'
            : 'border-lightGray duration-300',
        )}
        onClick={propagation}
        role="presentation"
      >
        <div className="flex flex-col pl-6">
          <div className="text-lg font-bold text-mainPurple">{title}</div>
          <div className="text-sm text-gray">{date}</div>
        </div>
        <div className="absolute right-6">{rank}</div>
      </div>
      <div
        className={cls(
          'absolute flex flex-row gap-6 right-2 top-12',
          isActive ? 'animate-slide-down mt-1' : 'animate-slide-up',
        )}
      >
        <div className="w-7 h-7 p-[2px] border rounded-full text-gray border-gray">
          <EditIcon />
        </div>
        <div className="w-7 h-7 p-[2px] border rounded-full text-gray border-gray">
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
};

const PortfolioPage = () => {
  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-center w-full h-24 text-xl font-bold text-center text bg-gray text-mainPurple">
        총 경력갯수 <br /> 배경 대충 멋진이미지
      </div>
      <Scrollbars autoHide autoHeight autoHeightMin={'80vh'}>
        <div className="px-6">
          <div className="mt-8 mb-1 text-lg font-bold">대회</div>
          <Card title="대회명" date="대회날짜" rank="몇등" />
          <Card title="대회명" date="대회날짜" rank="몇등" />
          <Card title="대회명" date="대회날짜" rank="몇등" />
          <Card title="대회명" date="대회날짜" rank="몇등" />
          <Card title="대회명" date="대회날짜" rank="몇등" />
          <div className="mt-8 mb-1 text-lg font-bold">자격증</div>
          <Card
            title="자격증명"
            date="취득날짜"
            rank="몇급? 있음쓰고 없음말고"
          />
          <Card
            title="자격증명"
            date="취득날짜"
            rank="몇급? 있음쓰고 없음말고"
          />
          <Card
            title="자격증명"
            date="취득날짜"
            rank="몇급? 있음쓰고 없음말고"
          />
          <Card
            title="자격증명"
            date="취득날짜"
            rank="몇급? 있음쓰고 없음말고"
          />
          <Card
            title="자격증명"
            date="취득날짜"
            rank="몇급? 있음쓰고 없음말고"
          />
          <div className="mt-8 mb-1 text-lg font-bold">
            학력?자격증이랑 같이해도 학력 쓰기싫은사람도있을듯
          </div>
          <Card title="학위명" date="취득날짜" />
          <Card title="학위명" date="취득날짜" />
          <Card title="학위명" date="취득날짜" />
          <Card title="학위명" date="취득날짜" />
          <Card title="학위명" date="취득날짜" />
        </div>
      </Scrollbars>
    </div>
  );
};

export default PortfolioPage;
