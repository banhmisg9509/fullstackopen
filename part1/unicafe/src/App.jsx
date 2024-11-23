import { useState } from "react";
import PropTypes from "prop-types";

const calculateAverageScore = ({ good, bad, neutral }) => {
  return ((good - bad) / (good + bad + neutral)).toFixed(1);
};

const calculatePositivePercent = ({ good, bad, neutral }) => {
  return (100 * (good / (good + bad + neutral))).toFixed(1);
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

StatisticLine.propTypes = {
  text: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const Statistics = ({ good, bad, neutral }) => {
  if ([good, bad, neutral].every((number) => number === 0)) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={good + bad + neutral} />
        <StatisticLine
          text={"average"}
          value={calculateAverageScore({ good, bad, neutral })}
        />
        <StatisticLine
          text={"positive"}
          value={`${calculatePositivePercent({ good, bad, neutral })} %`}
        />
      </tbody>
    </table>
  );
};

Statistics.propTypes = {
  good: PropTypes.number,
  bad: PropTypes.number,
  neutral: PropTypes.number,
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <button onClick={() => setGood((value) => value + 1)}>good</button>
        <button onClick={() => setNeutral((value) => value + 1)}>
          neutral
        </button>
        <button onClick={() => setBad((value) => value + 1)}>bad</button>
      </div>
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
