const truncateString = (str: string | undefined, maxLength: number) => {
  if (str === undefined) return;
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.substring(0, maxLength) + '...';
  }
};

export default truncateString;
