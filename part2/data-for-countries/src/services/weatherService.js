const OPEN_WEATHER_API = import.meta.env.VITE_OPEN_WEATHER_API;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const getWeatherInfo = async (lon, lat) => {
  const response = await fetch(
    `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API}`
  );
  const data = await response.json();
  return data;
};

export { getWeatherInfo };
