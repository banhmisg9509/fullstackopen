import store from "..";

export const voteAnecdote = (id) => {
  const action = {
    type: "VOTE",
    payload: {
      id,
    },
  };
  store.dispatch(action);
};

export const createAnecdote = (content) => {
  const action = {
    type: "NEW",
    payload: { content },
  };
  store.dispatch(action);
};
