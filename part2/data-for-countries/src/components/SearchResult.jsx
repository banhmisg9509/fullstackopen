import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DetailCountryInfo from "./DetailCountryInfo";

const SearchResult = ({ countries, searchTerm }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setSelectedCountry(null);
    }
  }, [searchTerm]);

  if (countries.length === 0 || !searchTerm) return null;

  const reg = new RegExp(searchTerm, "i");
  const filteredCountries = countries.filter((country) =>
    reg.test(country.name.common)
  );

  if (filteredCountries.length > 10) {
    return <p>To many matches, specify another filter</p>;
  }

  if (filteredCountries.length === 1) {
    return <DetailCountryInfo country={filteredCountries[0].name.common} />;
  }

  if (selectedCountry) return <DetailCountryInfo country={selectedCountry} />;

  return (
    <div>
      {filteredCountries.map((country) => (
        <p key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => setSelectedCountry(country.name.common)}>
            show
          </button>
        </p>
      ))}
    </div>
  );
};

SearchResult.propTypes = {
  countries: PropTypes.array,
  searchTerm: PropTypes.string,
};

export default SearchResult;
