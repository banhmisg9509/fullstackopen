import store from "src/store";
import { create, vote } from "./index";

export const voteAnecdote = (id) => {
  store.dispatch(vote(id));
};

export const createAnecdote = (content) => {
  store.dispatch(create(content));
};
