import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <NavLink to={`anecdotes/${anecdote.id}`}>{anecdote.content}</NavLink>
        </li>
      ))}
    </ul>
  </div>
);

AnecdoteList.propTypes = {
  anecdotes: PropTypes.array,
};

export default AnecdoteList;
