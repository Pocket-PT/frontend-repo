export const classifyUrl = (url: string | null, message: string | null) => {
  const imageRegex = /\.(png|jpg|jpeg|gif)$/i; // 대소문자 구분 없이 이미지 확장자 매칭
  const videoRegex = /\.(mp4|avi|mov|wmv)$/i;
  if (imageRegex.test(url ?? '')) {
    return 'image';
  }
  if (videoRegex.test(url ?? '')) {
    return 'video';
  }
  if (message === null) {
    return 'file';
  }
};
