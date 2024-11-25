import PropTypes from "prop-types";
import Part from './Part'

const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};
Content.propTypes = {
  parts: PropTypes.array,
};

export default Content;
