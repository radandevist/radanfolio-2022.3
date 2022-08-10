export const getRandomElements = <T>(array: T[], num: number = 1) => {
  if (num <= 0) throw new Error("num must be greater than 0");
  if (num >= array.length - 1) {
    Error(`num must be inferior to the length of the array: ${array.length}`);
  }
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.round(num));
};
