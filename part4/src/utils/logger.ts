const info = (...params: any[]) => {
  if (process.env.NODE_ENV === "test") return;
  console.log(...params);
};

const error = (...params: any[]) => {
  if (process.env.NODE_ENV === "test") return;
  console.log(...params);
};

export default { info, error };
