import AnecdoteForm from "src/components/AnecdoteForm";
import AnecdoteList from "src/components/AnecdoteList";
import Filter from "src/components/Filter";
import Notification from "src/components/Notification";

const App = () => {
  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  );
};

export default App;
