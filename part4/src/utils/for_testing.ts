const reverse = (string: string) => {
  return string.split("").reverse().join("");
};

const average = (array: any[]) => {
  const reducer = (sum: number, item: number) => {
    return sum + item;
  };

  return array.reduce(reducer, 0) / array.length;
};

export { reverse, average };
