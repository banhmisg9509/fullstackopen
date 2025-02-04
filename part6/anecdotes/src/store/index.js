import filter from "src/store/slices/filter";
import notification from "src/store/slices/notification";

import { configureStore } from "@reduxjs/toolkit";
import { anecdotesAPI } from "src/api/anecdotes";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    filter,
    notification,
    [anecdotesAPI.reducerPath]: anecdotesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(anecdotesAPI.middleware),
});

setupListeners(store.dispatch);

export default store;
