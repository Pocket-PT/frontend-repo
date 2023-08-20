import { create } from 'zustand';

interface IMessage {
  message: string;
  chattingAccountId: number;
  createAt: string;
}

interface IMessageStore {
  messages: IMessage[];
  setMessages: (message: IMessage) => void;
  resetMessages: () => void;
}

const useMessageStore = create<IMessageStore>((set) => ({
  messages: [],
  setMessages: (message: IMessage) =>
    set((prev) => ({ messages: [...prev.messages, message] })),
  resetMessages: () => set({ messages: [] }),
}));

export default useMessageStore;
