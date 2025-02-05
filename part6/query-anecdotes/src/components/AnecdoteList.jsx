import { useAnecdotes, useVoteAnecdote } from "src/queries/anecdotes";
import { useFilter } from "src/stores/filter";
import { pushNotification } from "src/stores/notification";

const AnecdoteList = () => {
  const filter = useFilter();
  const { data: anecdotes, isFetching } = useAnecdotes(filter);
  const mutation = useVoteAnecdote();

  const handleVote = async (anecdote) => {
    await mutation.mutateAsync(anecdote);
    pushNotification(`anecdote ${anecdote.content} voted`);
  };

  if (isFetching) return <div>Loading...</div>;

  return (
    <>
      {anecdotes?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
