export const giveFirstWord = (text: string) => {
  const words = text.split(' ');
  return words[0];
};
