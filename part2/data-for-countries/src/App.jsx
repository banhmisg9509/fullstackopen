import { useState, useEffect } from "react";
import { fetchAllCountries } from "./services/coutryService";
import SearchResult from './components/SearchResult'

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAllCountries().then((data) => setCountries(data));
  }, []);

  return (
    <>
      <div>
        <label>
          find countries{" "}
          <input
            disabled={countries.length < 1}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>

      <SearchResult countries={countries} searchTerm={searchTerm} />
    </>
  );
}

export default App;
