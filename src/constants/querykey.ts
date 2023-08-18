export const myprofileKeys: IMyProfileKeys = {
  all: ['myprofile'] as const,
  account: () => [...myprofileKeys.all, 'account'] as const,
  income: () => [...myprofileKeys.all, 'income'] as const,
};

export const messageKeys: IMessageKeys = {
  all: ['messages'] as const,
  message: (id) => [...messageKeys.all, id] as const,
  messageFiles: (id) => [...messageKeys.all, id, 'files'] as const,
};

export interface IMyProfileKeys {
  all: readonly ['myprofile'];
  account: () => readonly ['myprofile', 'account'];
  income: () => readonly ['myprofile', 'income'];
}

export interface IMessageKeys {
  all: readonly ['messages'];
  message: (id: number) => readonly ['messages', number];
  messageFiles: (id: number) => readonly ['messages', number, 'files'];
}
