import { create } from 'zustand';

interface ChatRoomModalStore {
  chattingMessageId: number;
  setChattingMessageId: (chattingMessageId: number) => void;
}

const useChatRoomModalStore = create<ChatRoomModalStore>((set) => ({
  chattingMessageId: 0,
  setChattingMessageId: (chattingMessageId: number) =>
    set({ chattingMessageId }),
}));

export default useChatRoomModalStore;
