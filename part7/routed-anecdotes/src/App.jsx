import { useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import AnecdoteDetail from "./components/AnecdoteDetail";
import About from "./components/About";
import CreateNew from "./components/CreateNew";
import Footer from "./components/Footer";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const timerId = useRef("");

  const [notification, setNotification] = useState("");

  const pushNotification = (message, second = 5) => {
    setNotification(message);
    clearTimeout(timerId.current);

    timerId.current = setTimeout(() => {
      setNotification("");
    }, second * 1000);
  };

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    pushNotification(`a new anecdote ${anecdote.content} created!`);
  };

  const anecdoteById = (id) => {
    return anecdotes.find((a) => a.id === id);
  };

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="anecdotes/:id"
          element={<AnecdoteDetail anecdoteById={anecdoteById} />}
        />
        <Route path="about" element={<About />} />
        <Route path="create" element={<CreateNew addNew={addNew} />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
