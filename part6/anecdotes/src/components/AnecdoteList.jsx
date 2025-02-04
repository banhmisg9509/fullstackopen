import { useSelector } from "react-redux";
import { useAnecdotesQuery, useVoteMutation } from "src/api/anecdotes";
import {
  pushNotification,
  clearNotification,
} from "src/store/slices/notification/action";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const { data: anecdotes, isFetching } = useAnecdotesQuery(filter);
  const [voteAnecdote] = useVoteMutation();

  const vote = async (anecdote) => {
    await voteAnecdote(anecdote).unwrap();
    pushNotification(`you voted "${anecdote.content}"`);
    clearNotification();
  };

  if (isFetching) return <div>Loading...</div>;

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
