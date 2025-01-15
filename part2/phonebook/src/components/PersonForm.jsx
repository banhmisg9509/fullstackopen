import PropTypes from "prop-types";
import { useState } from "react";
import { addPerson, updatePerson } from "../services/PeopleService";

const checkIsNameExists = (people, name) => {
  return people.find((person) => person.name === name);
};

const PersonForm = ({ people, setPeople, setNotification }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const resetValues = () => {
    setName("");
    setNumber("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const person = {
      name,
      number,
    };

    const foundPerson = checkIsNameExists(people, name);

    if (foundPerson) {
      person._id = foundPerson._id;
      updatePerson(person)
        .then(() => {
          setPeople((list) =>
            list.map((p) => (p._id === person._id ? person : p))
          );
          resetValues();
        })
        .catch((e) => {
          if (e.status === 404) {
            setNotification({
              content: `Information of ${person.name} has already been removed from server`,
              type: "error",
            });
          }

          if (e.status === 400) {
            setNotification({
              content: e.response.data.error,
              type: "error",
            });
          }
        });
    } else {
      addPerson(person)
        .then((newPerson) => {
          setPeople((list) => [...list, newPerson]);
          setNotification({ content: `Added ${person.name}`, type: "" });
          resetValues();
        })
        .catch((e) => {
          if (e.status === 400) {
            setNotification({
              content: e.response.data.error,
              type: "error",
            });
          }
        });
    }
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
