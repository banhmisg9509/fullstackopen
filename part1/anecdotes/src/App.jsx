import { useState } from "react";

const getRandomInt = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
};

const getNextIndex = (selectedIndex, maxRange) => {
  let nextIndex = 0;
  do {
    nextIndex = getRandomInt(0, maxRange);
  } while (nextIndex === selectedIndex);
  return nextIndex;
};

const findLargestPointIndex = (points) => {
  let largestIndex = 0;
  for (let i = 0; i < points.length; i++) {
    if (points[i] > points[largestIndex]) largestIndex = i;
  }
  return largestIndex;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(
    Array.from({ length: anecdotes.length }, () => 0)
  );

  const voteAnecdote = (id) => {
    setPoints((oldPoints) => oldPoints.map((v, i) => (i === id ? v + 1 : v)));
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <div>
        <button onClick={() => voteAnecdote(selected)}>vote</button>
        <button
          onClick={() => setSelected(getNextIndex(selected, anecdotes.length))}
        >
          next anecdote
        </button>
      </div>

      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[findLargestPointIndex(points)]}</div>
    </div>
  );
};

export default App;
