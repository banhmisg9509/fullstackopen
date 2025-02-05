import { atom, useAtomValue } from "jotai";
import { store } from ".";

const initialNotification = {
  type: "",
  content: "",
};

const notification = atom(initialNotification);
export const useNotification = () => useAtomValue(notification);
export const pushNotification = (value, type = "success") => {
  store.set(notification, { content: value, type });
  clearNotification();
};

let timeoutId;
export const clearNotification = (second = 5) => {
  clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    store.set(notification, initialNotification);
  }, second * 1000);
};
