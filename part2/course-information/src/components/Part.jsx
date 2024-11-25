import PropTypes from "prop-types";
const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};
Part.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  exercises: PropTypes.number,
};

export default Part;
