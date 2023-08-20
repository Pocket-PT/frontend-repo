import { create } from 'zustand';

interface IData {
  name: string;
  email: string;
}

interface IMockOtherUserStore {
  data: IData;
}

const useMockOtherUserStore = create<IMockOtherUserStore>(() => ({
  data: {
    name: '신도운',
    email: 'park456@kakao.com',
  },
}));

export default useMockOtherUserStore;
