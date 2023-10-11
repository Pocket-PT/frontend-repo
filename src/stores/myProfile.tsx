import { create } from 'zustand';

export interface IMyProfileStore {
  name: string;
  nickname: string;
  email: string;
  profileUrl: string;
  birthDate: string;
  description: string;
  priceTable: {
    monthlyPtPriceId: number;
    price: number;
    period: number;
  }[];
  prizeTable: {
    key: number;
    name: string;
    date?: string;
    rank?: string;
  }[];
  licenseTable: {
    key: number;
    name: string;
    date?: string;
    rank?: string;
  }[];
  onAddPriceTable: (period: number, price: number) => void;
  onEditPriceTable: (
    monthlyPtPriceId: number,
    period: number,
    price: number,
  ) => void;
  onDeletePriceTable: (monthlyPtPriceId: number) => void;
  onEditProfileUrl: (profileUrl: string) => void;
  onEditNickname: (nickname: string) => void;
  onEditDescription: (description: string) => void;
  onAddPrizeTable: ({
    name,
    date,
    rank,
  }: {
    name: string;
    date: string | undefined;
    rank: string | undefined;
  }) => void;
  onEditPrizeTable: (
    key: number,
    name: string,
    date: string | undefined,
    rank: string | undefined,
  ) => void;
  onDeletePrizeTable: (key: number) => void;
}

const useMyProfileStore = create<IMyProfileStore>((set) => ({
  name: '김일곤',
  nickname: '슈퍼맨',
  email: '1234@test.com',
  profileUrl: '/sample-profile.png',
  birthDate: '1111-11-11',
  description: '상태메세지 최대 60자',
  priceTable: [
    {
      monthlyPtPriceId: 1,
      price: 50000,
      period: 1,
    },
    {
      monthlyPtPriceId: 2,
      price: 90000,
      period: 3,
    },
  ],
  prizeTable: [
    {
      key: 0,
      name: 'IFBB PRO',
      date: '2023.05.17',
      rank: '1등',
    },
    {
      key: 1,
      name: '대회',
      date: '2023.05.17',
      rank: '입상',
    },
  ],
  licenseTable: [
    { key: 0, name: '생활체육지도사', date: '2023.05.17', rank: '2급' },
    { key: 1, name: '자격증명', date: '취득날짜', rank: '몇급' },
  ],
  onEditProfileUrl: (profileUrl: string) => {
    set(() => ({
      profileUrl,
    }));
  },
  onEditNickname: (nickname: string) => {
    set(() => ({
      nickname,
    }));
  },
  onEditDescription: (description: string) => {
    set(() => ({
      description,
    }));
  },
  //매출표 Actions
  onAddPriceTable: (period: number, price: number) => {
    set((state) => ({
      priceTable: [
        ...state.priceTable,
        {
          monthlyPtPriceId: state.priceTable.length + 1,
          period,
          price,
        },
      ],
    }));
  },
  onEditPriceTable: (
    monthlyPtPriceId: number,
    period: number,
    price: number,
  ) => {
    set((state) => ({
      priceTable: state.priceTable.map((item) =>
        item.monthlyPtPriceId === monthlyPtPriceId
          ? { monthlyPtPriceId, period, price }
          : item,
      ),
    }));
  },
  onDeletePriceTable: (monthlyPtPriceId: number) => {
    set((state) => ({
      priceTable: state.priceTable.filter(
        (item) => item.monthlyPtPriceId !== monthlyPtPriceId,
      ),
    }));
  },
  //수상경력 Actions
  onAddPrizeTable: ({
    name,
    date,
    rank,
  }: {
    name: string;
    date: string | undefined;
    rank: string | undefined;
  }) => {
    set((state) => ({
      prizeTable: [
        ...state.prizeTable,
        {
          key: state.prizeTable.length,
          name,
          date,
          rank,
        },
      ],
    }));
  },
  onEditPrizeTable: (
    key: number,
    name: string,
    date: string | undefined,
    rank: string | undefined,
  ) => {
    set((state) => ({
      prizeTable: state.prizeTable.map((item) =>
        item.key === key ? { key, name, date, rank } : item,
      ),
    }));
  },
  onDeletePrizeTable: (key: number) => {
    set((state) => ({
      prizeTable: state.prizeTable.filter((item) => item.key !== key),
    }));
  },
  //자격증 Actions
}));

export default useMyProfileStore;
