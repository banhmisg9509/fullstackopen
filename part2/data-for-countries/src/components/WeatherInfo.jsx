import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getWeatherInfo } from "../services/weatherService";

const WEATHER_ICON_URL = "https://openweathermap.org/img/wn";

const WeatherInfo = ({ lon, lat, city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    getWeatherInfo(lon, lat).then((data) => setWeatherData(data));
  }, [lon, lat]);

  if (!weatherData) return null;

  return (
    <>
      <h2>Weather in {city}</h2>
      <p>temperature {weatherData.main.temp} Celcius</p>
      <div>
        <img
          src={`${WEATHER_ICON_URL}/${weatherData.weather[0].icon}.png`}
          alt="weatherIcon"
        />
      </div>
      <p>wind {weatherData.wind.speed} m/s</p>
    </>
  );
};

WeatherInfo.propTypes = {
  lon: PropTypes.number,
  lat: PropTypes.number,
  city: PropTypes.string,
};

export default WeatherInfo;
