import store from "src/store";
import { update } from "./index";
export const pushNotification = (message) => {
  store.dispatch(update(message));
};
