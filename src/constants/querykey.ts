export const myprofileKeys: IMyProfileKeys = {
  all: ['myprofile'] as const,
  account: () => [...myprofileKeys.all, 'account'] as const,
  income: () => [...myprofileKeys.all, 'income'] as const,
  member: () => [...myprofileKeys.all, 'member'] as const,
  chatRoom: () => [...myprofileKeys.all, 'chatRoom'] as const,
  career: () => [...myprofileKeys.all, 'career'] as const,
  ptManagement: () => [...myprofileKeys.all, 'ptManagement'] as const,
  price: () => [...myprofileKeys.all, 'price'] as const,
  signup: () => [...myprofileKeys.all, 'signup'] as const,
};

export const messageKeys: IMessageKeys = {
  all: ['messages'] as const,
  message: (id) => [...messageKeys.all, id] as const,
  messageFiles: (id) => [...messageKeys.all, id, 'files'] as const,
  bookmark: (id) => [...messageKeys.all, id, 'bookmarks'] as const,
};

export interface IMyProfileKeys {
  all: readonly ['myprofile'];
  account: () => readonly ['myprofile', 'account'];
  income: () => readonly ['myprofile', 'income'];
  member: () => readonly ['myprofile', 'member'];
  chatRoom: () => readonly ['myprofile', 'chatRoom'];
  career: () => readonly ['myprofile', 'career'];
  ptManagement: () => readonly ['myprofile', 'ptManagement'];
  price: () => readonly ['myprofile', 'price'];
  signup: () => readonly ['myprofile', 'signup'];
}

export interface IMessageKeys {
  all: readonly ['messages'];
  message: (id: number) => readonly ['messages', number];
  messageFiles: (id: number) => readonly ['messages', number, 'files'];
  bookmark: (id: number) => readonly ['messages', number, 'bookmarks'];
}
