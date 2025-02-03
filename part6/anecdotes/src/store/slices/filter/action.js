import store from "src/store";
import { update } from "./index";

export const updateFilter = (content) => {
  store.dispatch(update(content));
};
