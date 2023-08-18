export const splitNumber = (number: number | undefined, range: number) => {
  const pattern = new RegExp(`\\B(?=(\\d{${range}})+(?!\\d))`, 'g');
  return number?.toString().replace(pattern, ',');
};
