import windSpeedIcon from "../../img/animated/wind-speed.svg";
import pressureIcon from "../../img/animated/pressure.svg";
import sunRiseIcon from "../../img/animated/sunrise.svg";

import { mpsToKmh, metersToKm, formatDate } from "../../utils/convertUnits";

const WeatherCardLeft = ({ data }) => {
  return (
    <div className="current-weather-details-left">
      <div className="wind-speed-card">
        <img src={windSpeedIcon} className="wind-speed-icon" />
        <div className="wind-speed-details">
          <div className="wind-speed-title">Wind Speed</div>
          <div className="wind-speed-value dynamic-data loading">
            {mpsToKmh(data?.wind.speed)}
          </div>
        </div>
      </div>
      <div className="pressure-card">
        <img src={pressureIcon} className="pressure-icon" />
        <div className="pressure-details">
          <div className="pressure-title">Pressure</div>
          <div className="pressure-value dynamic-data loading">{`${data?.main.pressure} hPa`}</div>
        </div>
      </div>
      <div className="sunrise-card">
        <img src={sunRiseIcon} className="sunrise-icon" />
        <div className="sunrise-details">
          <div className="sunrise-title">Sunrise</div>
          <div className="sunrise-value dynamic-data loading">
            {formatDate(data?.sys.sunrise, "hour")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCardLeft;
