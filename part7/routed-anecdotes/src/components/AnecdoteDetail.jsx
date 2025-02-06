import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const AnecdoteDetail = ({ anecdoteById }) => {
  const { id } = useParams();
  const anecdote = anecdoteById(Number(id));

  if (!anecdote) return <p>Not found!</p>;

  return (
    <>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </>
  );
};

AnecdoteDetail.propTypes = {
  anecdoteById: PropTypes.func,
}

export default AnecdoteDetail;
