export const waitAndDo = (sec, callbackFn) => {
  let id;
  return function (...args) {
    clearTimeout(id);
    id = setTimeout(() => callbackFn.apply(args), sec * 1000);
  };
};

export const getId = () => (100000 * Math.random()).toFixed(0);
