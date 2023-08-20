import { createRef } from 'react';
import { create } from 'zustand';

interface ICanvasStore {
  ref: React.RefObject<HTMLImageElement>;
  changeRef: (ref: React.RefObject<HTMLImageElement>) => void;
}

const useCanvasStore = create<ICanvasStore>((set) => ({
  ref: createRef<HTMLImageElement>(),
  changeRef: (ref: React.RefObject<HTMLImageElement>) => set({ ref }),
}));

export default useCanvasStore;
