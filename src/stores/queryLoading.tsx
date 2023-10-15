import { create } from 'zustand';

interface IQueryLoadingStore {
  signUpLoading: boolean;
  setSignUpLoading: (signUpLoading: boolean) => void;
}

const useQueryLoadingStore = create<IQueryLoadingStore>((set) => ({
  signUpLoading: false,
  setSignUpLoading: (signUpLoading: boolean) => set({ signUpLoading }),
}));

export default useQueryLoadingStore;
