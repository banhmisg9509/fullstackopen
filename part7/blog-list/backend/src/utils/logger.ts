const info = (...params: Array<string | number>) => {
  if (process.env.NODE_ENV === "test") return;
  console.log(...params);
};

const error = (...params: Array<string | number>) => {
  if (process.env.NODE_ENV === "test") return;
  console.log(...params);
};

export default { info, error };
