import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    update: (_, action) => {
      return action.payload;
    },
  },
});

export const { update } = slice.actions;

export default slice.reducer;
