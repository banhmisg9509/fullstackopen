import { useState } from "react";
import { useCreateMutation } from "src/api/anecdotes";
import { getId } from "src/utils";

const AnecdoteForm = () => {
  const [createAnecdote] = useCreateMutation();
  const [content, setContent] = useState("");

  const resetForm = () => setContent("");

  const buildAnecdote = (content) => ({
    id: getId(),
    content,
    votes: 0,
  });

  const create = async (e) => {
    e.preventDefault();
    const anecdote = buildAnecdote(content);
    await createAnecdote(anecdote).unwrap();
    resetForm();
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
