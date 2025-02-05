import { useCreateAnecdote } from "src/queries/anecdotes";
import { pushNotification } from "src/stores/notification";
import { getId } from "src/utils";

const AnecdoteForm = () => {
  const mutation = useCreateAnecdote();

  const buildAnecdote = (content) => {
    return {
      id: getId(),
      content,
      votes: 0,
    };
  };

  const onCreate = async (event) => {
    event.preventDefault();
    const anecdote = buildAnecdote(event.target.anecdote.value);
    await mutation.mutateAsync(anecdote);
    event.target.anecdote.value = "";
    pushNotification(`anecdote ${anecdote.content} added`);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
