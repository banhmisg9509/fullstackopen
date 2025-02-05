import { atom, useAtomValue } from "jotai";
import { waitAndDo } from "src/utils";
import { store } from ".";

const notification = atom("");
export const useNotification = () => useAtomValue(notification);
export const pushNotification = (value) => {
  store.set(notification, value);
  clearNotification();
};
export const clearNotification = waitAndDo(5, () =>
  store.set(notification, "")
);
