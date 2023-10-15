import { create } from 'zustand';

export interface INewMessage {
  message: string;
  fileUrl: string;
  chattingAccountId: number;
  chatMessageId: number;
  createAt: string;
  ref: React.RefObject<
    HTMLVideoElement | HTMLImageElement | HTMLAnchorElement | HTMLDivElement
  >;
}

interface INewMessageStore {
  messages: INewMessage[];
  nextMessageId: number;
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  modalfileUrl: string;
  setModalFileUrl: (modalfileUrl: string) => void;
  setNextMessageId: (lastMessageId: number | undefined) => void;
  setMessages: (message: INewMessage) => void;
  removeLoadingMessage: () => void;
  resetMessages: () => void;
}

const useMessageStore = create<INewMessageStore>((set) => ({
  messages: [],
  nextMessageId: 1,
  modalOpen: false,
  setModalOpen: (modalOpen: boolean) => set({ modalOpen }),
  modalfileUrl: '',
  setModalFileUrl: (modalfileUrl: string) => set({ modalfileUrl }),
  setNextMessageId: (lastMessageId: number | undefined) =>
    set((prev) => ({
      nextMessageId: lastMessageId ? lastMessageId + 1 : prev.nextMessageId,
    })),
  setMessages: (message: INewMessage) =>
    set((prev) => ({ messages: [...prev.messages, message] })),
  removeLoadingMessage: () =>
    set((prev) => ({
      messages: prev.messages.filter((message) => message.chatMessageId !== 0),
    })),
  resetMessages: () => set({ messages: [] }),
}));

export default useMessageStore;
