import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ITokenStore {
  token: string;
  setToken: (token: string) => void;
}

const useTokenStore = create(
  persist<ITokenStore>(
    (set) => ({
      token: '',
      setToken: (token: string) => set({ token }),
    }),
    {
      name: 'token-storage',
    },
  ),
);

export default useTokenStore;
