import { SENDING_MEDIA, SENDING_MEDIA_END } from 'constants/global';

const useLoadingObj = (chattingAccountId: number | undefined) => {
  const loadingMessage = {
    message: SENDING_MEDIA,
    chattingAccountId: chattingAccountId ?? 0,
    fileUrl: '',
    chatMessageId: 0,
    createAt: '',
  } as const;

  const loadingEndMessage = {
    message: SENDING_MEDIA_END,
    chattingAccountId: chattingAccountId ?? 0,
    fileUrl: '',
    chatMessageId: 0,
    createAt: '',
  } as const;

  return { loadingMessage, loadingEndMessage };
};

export default useLoadingObj;
