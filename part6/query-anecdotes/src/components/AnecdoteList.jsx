import {
  useAnecdotes,
  useDeleteAnecdote,
  useVoteAnecdote,
} from "src/queries/anecdotes";
import { useFilter } from "src/stores/filter";
import { pushNotification } from "src/stores/notification";
import { Button } from "./Button";

const AnecdoteList = () => {
  const filter = useFilter();
  const { data: anecdotes, isLoading } = useAnecdotes(filter);
  const voteMutation = useVoteAnecdote();
  const deleteMutation = useDeleteAnecdote();

  const handleVote = async (anecdote) => {
    await voteMutation.mutateAsync(anecdote);
    pushNotification(`anecdote ${anecdote.content} voted`);
  };

  const handleDelete = async (anecdote) => {
    const answer = window.confirm(
      `Are you sure you want to delete ${anecdote.content}`
    );
    if (answer) {
      await deleteMutation.mutateAsync(anecdote);
      pushNotification(`anecdote ${anecdote.content} deleted`);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-2 mb-2">
      {anecdotes?.map((anecdote) => (
        <div key={anecdote.id} className="border rounded-md  p-2">
          <div>{anecdote.content}</div>
          <div>
            <span className="mr-1 text-green-600"> has {anecdote.votes}</span>
            <div className="inline-flex gap-1">
              <Button
                onClick={() => handleVote(anecdote)}
                className="hover:bg-green-500 active:bg-green-600 active:text-white hover:text-white"
              >
                vote
              </Button>
              <Button
                onClick={() => handleDelete(anecdote)}
                className="hover:bg-red-500 active:bg-red-600 active:text-white hover:text-white"
              >
                delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
