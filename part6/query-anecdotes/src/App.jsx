import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useAnecdotes } from "./queries/anecdotes";

const App = () => {
  const { error } = useAnecdotes();

  if (error) {
    return <p>anecdote service not available due to problems in server</p>;
  }

  return (
    <div className="flex flex-col container mx-auto mt-4 px-4">
      <h3 className="text-xl mb-2">Anecdote app</h3>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
