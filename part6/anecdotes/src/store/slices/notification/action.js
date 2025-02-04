import store from "src/store";
import { waitAndDo } from "src/utils";
import { update } from "./index";

export const pushNotification = (message = "") => {
  store.dispatch(update(message));
};

export const clearNotification = waitAndDo(5, () => store.dispatch(update("")));
