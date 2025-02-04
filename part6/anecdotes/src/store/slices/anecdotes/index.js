import { createSlice } from "@reduxjs/toolkit";
import { sortArrayByField, updateObjectInArray } from "../../../utils";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const slice = createSlice({
  name: "anecdotes",
  initialState: anecdotesAtStart.map((anecdote) => asObject(anecdote)),
  reducers: {
    vote: (state, action) => {
      return sortArrayByField(
        updateObjectInArray(state, "id", action.payload, (item) => ({
          votes: item.votes + 1,
        })),
        "votes"
      );
    },
    create: (state, action) => {
      state.push(asObject(action.payload));
    },
  },
});

export const { create, vote } = slice.actions;

export default slice.reducer;

// This was replaced by RTK Query