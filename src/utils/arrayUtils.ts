export function getRandomElements<T>(arr: T[], n: number = 1): T[] {
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

export function objectFromArray (array: string[], defaultValues?: any[]) {
  const obj: Record<string, any> = {};

  if (!defaultValues) {
    defaultValues = [];
    for (let index = 0; index < array.length; index++) {
      defaultValues[index] = {};
    }
  };

  for (const key of array) {
    obj[key] = defaultValues![array.indexOf(key)];
  }

  return obj;
}
