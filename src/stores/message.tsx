import { create } from 'zustand';

interface IMessage {
  message: string;
  chattingAccountId: number;
  chatMessageId: number;
  createAt: string;
}

interface IMessageStore {
  messages: IMessage[];
  nextMessageId: number;
  setNextMessageId: (lastMessageId: number | undefined) => void;
  setMessages: (message: IMessage) => void;
  resetMessages: () => void;
}

const useMessageStore = create<IMessageStore>((set) => ({
  messages: [],
  nextMessageId: 1,
  setNextMessageId: (lastMessageId: number | undefined) =>
    set((prev) => ({
      nextMessageId: lastMessageId ? lastMessageId + 1 : prev.nextMessageId,
    })),
  setMessages: (message: IMessage) =>
    set((prev) => ({ messages: [...prev.messages, message] })),
  resetMessages: () => set({ messages: [] }),
}));

export default useMessageStore;
