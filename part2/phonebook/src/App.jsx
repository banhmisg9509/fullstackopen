import { getAllPeople } from "./services/PeopleService";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import People from "./components/People";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [people, setPeople] = useState([]);
  const [message, setMessage] = useState({
    content: "",
    type: "",
  });
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    getAllPeople().then((data) => setPeople(data));
  }, []);

  const setNotification = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage({ content: "", type: "" }), 3500);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
      <h3>Add a new</h3>
      <PersonForm
        people={people}
        setPeople={setPeople}
        setNotification={setNotification}
      />
      <h3>Numbers</h3>
      <People people={people} filterValue={filterValue} setPeople={setPeople} />
    </div>
  );
};

export default App;
