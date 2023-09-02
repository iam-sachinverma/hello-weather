import humidityIcon from "../../img/animated/humidity.svg";
import sunSetIcon from "../../img/animated/sunset.svg";
import visibilityIcon from "../../img/animated/visibility.svg";

import { metersToKm, formatDate } from "../../utils/convertUnits";

const WeatherCardRight = ({ data }) => {
  return (
    <div className="current-weather-details-right">
      <div className="humidity-card">
        <img src={humidityIcon} className="humidity-icon" />
        <div className="humidity-details">
          <div className="humidity-title">Humidity</div>
          <div className="humidity-value dynamic-data loading">{`${data?.main.humidity}%`}</div>
        </div>
      </div>
      <div className="visibility-card">
        <img src={visibilityIcon} className="visibility-icon" />
        <div className="visibility-details">
          <div className="visibility-title">Visibility</div>
          <div className="visibility-value dynamic-data loading">
            {metersToKm(data?.visibility)}
          </div>
        </div>
      </div>
      <div className="sunset-card">
        <img src={sunSetIcon} className="sunset-icon" />
        <div className="sunset-details">
          <div className="sunset-title">Sunset</div>
          <div className="sunset-value dynamic-data loading">
            {formatDate(data?.sys.sunset, "hour")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCardRight;
