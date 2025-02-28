export const updateObjectInArray = (array, key, value, updateFn) => {
  return array.map((obj) =>
    obj[key] === value ? { ...obj, ...updateFn(obj) } : obj
  );
};

export const sortArrayByField = (array, field, order = "desc") => {
  return [...array].sort((a, b) => {
    if (a[field] < b[field]) return order === "desc" ? 1 : -1;
    if (a[field] > b[field]) return order === "desc" ? -1 : 1;
    return 0;
  });
};

export const waitAndDo = (sec, callbackFn) => {
  let id;
  return function () {
    clearTimeout(id);
    id = setTimeout(() => callbackFn(), sec * 1000);
  };
};

export const getId = () => (100000 * Math.random()).toFixed(0);
