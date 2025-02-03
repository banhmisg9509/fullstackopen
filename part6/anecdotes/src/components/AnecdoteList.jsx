import { useSelector } from "react-redux";
import { voteAnecdote } from "src/store/slices/anecdote/action";
import { pushNotification } from "src/store/slices/notification/action";

const waitAndDo = (sec, callbackFn) => {
  let id;
  return function () {
    clearTimeout(id);
    id = setTimeout(() => callbackFn(), sec * 1000);
  };
};

const clearNotification = waitAndDo(5, () => pushNotification(""));

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (!state.filter) return state.anecdotes;
    const regex = new RegExp(state.filter, "ig");
    return state.anecdotes.filter((anecdote) => regex.test(anecdote.content));
  });

  const vote = async (anecdote) => {
    voteAnecdote(anecdote.id);
    pushNotification(`you voted "${anecdote.content}" `);
    clearNotification();
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
