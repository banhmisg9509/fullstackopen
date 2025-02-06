import React, { useState, useEffect } from "react";
import axios from "axios";

const client = axios.create({
  baseURL: "https://studies.cs.helsinki.fi/restcountries/api/name/",
});

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const fetchCountryByName = async (countryName) => {
  const response = await client.get(countryName);
  return response.data;
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) return;
    fetchCountryByName(name)
      .then((data) => {
        setCountry({
          found: true,
          capital: data.capital.join(""),
          name: data.name.common,
          population: data.population,
          flag: data.flags.png,
        });
      })
      .catch((error) => setCountry({ found: false }));
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population.toLocaleString()}</div>
      <img src={country.flag} height="100" alt={`flag of ${country.name}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
