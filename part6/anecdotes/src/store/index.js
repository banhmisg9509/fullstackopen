import anecdotes from "src/store/slices/anecdote";
import filter from "src/store/slices/filter";
import notification from "src/store/slices/notification";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    anecdotes,
    filter,
    notification,
  },
});

export default store;
