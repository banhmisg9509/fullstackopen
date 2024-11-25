const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api/";


const fetchAllCountries = async () => {
  const response = await fetch(`${BASE_URL}/all`);
  const data = await response.json();
  return data;
};

const fetchOneCountry = async (countryName) => {
  const response = await fetch(`${BASE_URL}/name/${countryName}`);
  const data = await response.json();
  return data;
};

export { fetchAllCountries, fetchOneCountry };
