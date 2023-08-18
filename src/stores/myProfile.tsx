import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IMyProfileStore {
  name: string;
  nickname: string;
  email: string;
  profileUrl: string;
  birthDate: string;
  description: string;
  priceTable: {
    key: number;
    price: string;
    month: string;
    description: string;
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
  onAddPriceTable: (month: string, price: string) => void;
  onEditPriceTable: (key: number, month: string, price: string) => void;
  onDeletePriceTable: (key: number) => void;
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

const useMyProfileStore = create(
  persist<IMyProfileStore>(
    (set) => ({
      name: '김일곤',
      nickname: '슈퍼맨',
      email: '1234@test.com',
      profileUrl: '/sample-profile.png',
      birthDate: '1111-11-11',
      description: '상태메세지 최대 60자',
      priceTable: [
        {
          key: 0,
          price: '50000',
          month: '1개월 플랜',
          description: '50,000원/월',
        },
        {
          key: 1,
          price: '90000',
          month: '3개월 플랜',
          description: '30,000원/월',
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
      onAddPriceTable: (month: string, price: string) => {
        set((state) => ({
          priceTable: [
            ...state.priceTable,
            {
              key: state.priceTable.length,
              month,
              price,
              description: `${price}원/${month}`,
            },
          ],
        }));
      },
      onEditPriceTable: (key: number, month: string, price: string) => {
        set((state) => ({
          priceTable: state.priceTable.map((item) =>
            item.key === key
              ? { key, month, price, description: `${price}원/${month}` }
              : item,
          ),
        }));
      },
      onDeletePriceTable: (key: number) => {
        set((state) => ({
          priceTable: state.priceTable.filter((item) => item.key !== key),
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
    }),
    {
      name: 'myProfile-storage',
    },
  ),
);

export default useMyProfileStore;
