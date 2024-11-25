import PropTypes from "prop-types";
import { deletePerson } from "../services/PeopleService";

const filterPeople = (people, name) => {
  const regex = new RegExp(name, "i");
  return people.filter((person) => regex.test(person.name));
};

const People = ({ people, setPeople, filterValue }) => {
  const handleRemovePerson = (person) => {
    deletePerson(person).then(() => {
      setPeople((list) => list.filter((p) => p.id !== person.id));
    });
  };

  return (
    <div>
      {filterPeople(people, filterValue).map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleRemovePerson(person)}>delete</button>
        </p>
      ))}
    </div>
  );
};
People.propTypes = {
  people: PropTypes.array,
  setPeople: PropTypes.func,
  filterValue: PropTypes.string,
};

export default People;
