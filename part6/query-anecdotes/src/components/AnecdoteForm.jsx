import { useCreateAnecdote } from "src/queries/anecdotes";
import { pushNotification } from "src/stores/notification";
import { getId } from "src/utils";
import { Button } from "./Button";
import { Input } from "./Input";
import { useState } from "react";

const buildAnecdote = (content) => {
  return {
    id: getId(),
    content,
    votes: 0,
  };
};

const AnecdoteForm = () => {
  const [content, setContent] = useState("");
  const mutation = useCreateAnecdote();

  const onCreate = async (event) => {
    event.preventDefault();
    if (!content) return;

    const anecdote = buildAnecdote(content);
    await mutation.mutateAsync(anecdote);
    event.target.anecdote.value = "";
    pushNotification(`anecdote ${anecdote.content} added`);
  };

  return (
    <div>
      <h3 className="text-xl mb-2">Create new</h3>
      <form onSubmit={onCreate}>
        <div className="flex gap-1 items-center">
          <Input
            name="anecdote"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            type="submit"
            className="hover:bg-green-500  hover:text-white active:bg-green-600 active:text-white"
          >
            create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AnecdoteForm;
