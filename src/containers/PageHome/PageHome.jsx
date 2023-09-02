import React, { Suspense } from "react";

import { useWeatherContext } from "../../context/WeatherContext";

import WeatherCard from "../../components/Cards/WeatherCard";
import WeatherCardLeft from "../../components/Cards/WeatherCardLeft";
import WeatherCardRight from "../../components/Cards/WeatherCardRight";

const MyThreeJSComponent = React.lazy(() =>
  import("../../components/Earth/Earth")
);

const PageHome = () => {
  const { weatherData, userLocation } = useWeatherContext();

  return (
    <>
      <div className="heading">Today Overview</div>
      <div className="current-weather-section">
        <WeatherCard data={weatherData} />
        <WeatherCardLeft data={weatherData} />
        <WeatherCardRight data={weatherData} />
        <div className="hourly-weather-forecast-section">
          <Suspense
            fallback={
              <div className="dynamic-data loading">...loading earth</div>
            }
          >
            <MyThreeJSComponent location={userLocation} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default PageHome;
