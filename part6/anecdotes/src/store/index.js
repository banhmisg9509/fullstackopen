import { combineReducers, legacy_createStore as createStore } from "redux";
import anecdotes from "./anecdote/reducer";

const store = createStore(
  combineReducers({
    anecdotes,
  })
);

export default store;
