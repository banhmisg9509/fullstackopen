import { useSelector } from "react-redux";
import { voteAnecdote } from "../store/anecdote/action";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);

  const vote = (id) => voteAnecdote(id);

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
