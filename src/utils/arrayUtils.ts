export const getRandomElements = <T>(array: T[], num: number = 1) => {
  // if (num <= 0) throw new Error("num must be greater than 0");
  // if (num >= array.length - 1) {
  //   Error(`num must be inferior to the length of the array: ${array.length}`);
  // }
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.round(num));
};

export function getRandomElementsImproved<T>(arr: T[], n: number = 1) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
