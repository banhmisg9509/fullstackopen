import { useState } from "react";
import { createAnecdote } from "../store/anecdote/action";

const AnecdoteForm = () => {
  const [content, setContent] = useState("");

  const resetForm = () => setContent("");

  const create = (e) => {
    e.preventDefault();
    createAnecdote(content);
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
