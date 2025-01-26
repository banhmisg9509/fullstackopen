const get = (key) => localStorage.getItem(key) || "";

const set = (key, value) => localStorage.setItem(key, value);

const remove = (key) => localStorage.removeItem(key);

export const USER = "USER";

export default { get, set, remove };
