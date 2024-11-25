import PropTypes from "prop-types";
import { useState } from "react";
import { addPerson, updatePerson } from "../services/PeopleService";

const checkIsNameExists = (people, name) => {
  return people.find((person) => person.name === name);
};

const PersonForm = ({ people, setPeople, setNotification }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const person = {
      name,
      number,
      id: String(people.length + 1),
    };

    const foundPerson = checkIsNameExists(people, name);

    if (foundPerson) {
      person.id = foundPerson.id;
      updatePerson(person)
        .then(() => {
          setPeople((list) =>
            list.map((p) => (p.id === person.id ? person : p))
          );
        })
        .catch((e) => {
          if (e.status === 404) {
            setNotification({
              content: `Information of ${person.name} has already been removed from server`,
              type: "error",
            });
          }
        });
    } else {
      addPerson(person).then(() => {
        setPeople((list) => [...list, person]);
        setNotification({ content: `Added ${person.name}`, type: "" });
      });
    }

    setName("");
    setNumber("");
  };

  return (
    <form>
      <div>
        name: <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        number:
        <input value={number} onChange={(e) => setNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          add
        </button>
      </div>
    </form>
  );
};
PersonForm.propTypes = {
  people: PropTypes.array,
  setPeople: PropTypes.func,
  setNotification: PropTypes.func,
};

export default PersonForm;
