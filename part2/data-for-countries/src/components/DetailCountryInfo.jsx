import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { fetchOneCountry } from "../services/coutryService";
import WeatherInfo from "./WeatherInfo";

const DetailCountryInfo = ({ country }) => {
  const [detailInfo, setDetailInfo] = useState(null);

  useEffect(() => {
    fetchOneCountry(country).then((data) => setDetailInfo(data));
  }, [country]);

  if (!detailInfo) return null;

  return (
    <div>
      <h2>{detailInfo.name.official}</h2>
      <div>
        <p>capital {detailInfo.capital.join(", ")}</p>
        <p>area {detailInfo.area}</p>
      </div>
      <h3>langagues</h3>
      <ul>
        {Object.values(detailInfo.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <div>
        <img src={detailInfo.flags.png} alt="flagImage" />
      </div>
      <WeatherInfo
        lat={detailInfo.capitalInfo.latlng[0]}
        lon={detailInfo.capitalInfo.latlng[1]}
        city={detailInfo.capital.join(",")}
      />
    </div>
  );
};
DetailCountryInfo.propTypes = {
  country: PropTypes.string,
};

export default DetailCountryInfo;
