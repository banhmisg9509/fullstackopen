import PropTypes from "prop-types";

const Header = (props) => {
  return <h1>{props.name}</h1>;
};

Header.propTypes = {
  name: PropTypes.string,
};

const Content = (props) => {
  return (
    <>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
    </>
  );
};
Content.propTypes = {
  parts: PropTypes.array,
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};
Part.propTypes = {
  name: PropTypes.string,
  exercises: PropTypes.number,
};

const Total = (props) => {
  return (
    <p>
      Number of exercides{" "}
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </p>
  );
};
Total.propTypes = {
  parts: PropTypes.array,
};
const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  return (
    <div>
      <Header name={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
