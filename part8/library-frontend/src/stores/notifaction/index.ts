import { atom, useAtomValue } from "jotai";
import { store } from "src/stores";

export enum NotificationType {
  SUCCESS,
  ERROR,
}
export interface Notification {
  content: string;
  type: NotificationType;
}

const initialState: Notification = {
  content: "",
  type: NotificationType.SUCCESS,
};

export const notification = atom(initialState);

export const useNotification = () => useAtomValue(notification);

let timerId: number;
export const pushNotification = (
  content: string,
  type: NotificationType = NotificationType.SUCCESS,
  second: number = 5
) => {
  store.set(notification, {
    content,
    type,
  });

  clearTimeout(timerId);

  timerId = setTimeout(() => {
    store.set(notification, initialState);
  }, second * 1000);
};
