import PropTypes from "prop-types";
import Header from './Header'
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
Course.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    parts: PropTypes.array,
  }),
};

export default Course;
