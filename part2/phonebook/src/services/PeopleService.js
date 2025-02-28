import axios from "axios";

const URL = "/api/persons";

const getAllPeople = async () => {
  return axios.get(URL).then((response) => response.data);
};

const addPerson = async (person) => {
  return axios.post(URL, person).then((response) => response.data);
};

const deletePerson = async (person) => {
  if (confirm(`Delete ${person.name} ?`)) {
    return axios.delete(`${URL}/${person._id}`);
  }
};

const updatePerson = async (person) => {
  if (
    confirm(
      `${person.name} is already added to phonebook, replace the old number with a new one?`
    )
  ) {
    return axios.put(`${URL}/${person._id}`, person);
  }
};

export { getAllPeople, updatePerson, addPerson, deletePerson };
