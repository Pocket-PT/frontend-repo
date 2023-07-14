export const headerTitle = (pathname: string) => {
  if (pathname === '/') return '홈';
  if (pathname === '/chats') return '채팅';
  if (pathname === '/profile') return '프로필';
  else return pathname.replace('/chats/', '');
};
