import React, { createContext, useContext, useEffect, useState } from "react";
import { startLoadingState, endLoadingState } from "../utils/setLoadingState";

const WeatherContext = createContext();

export const useWeatherContext = () => {
  return useContext(WeatherContext);
};

const API_KEY = "d2e080f60c01434b9a92c3d37932169f";

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const getUserLocation = async () => {
    const successCallback = async (position) => {
      const data = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
      setUserLocation(data);
    };

    const errorCallback = (error) => {
      setUserLocation("India");
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    let API_URL;

    if (userLocation?.lat && userLocation?.lon) {
      API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation?.lat}&lon=${userLocation?.lon}&appid=${API_KEY}&units=metric`;
    } else {
      API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${"Bangalore"}&appid=${API_KEY}&units=metric`;
    }

    const fetchData = async () => {
      try {
        await startLoadingState();

        const response = await fetch(API_URL);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(
              `Sorry, we couldn't find . Please double-check the spelling and try again.`
            );
          } else {
            throw new Error(
              "Oops! We're having trouble getting the latest weather information right now. Please try again later or contact support if the problem persists."
            );
          }
        }

        const currentWeatherData = await response.json();
        setWeatherData(currentWeatherData);

        await endLoadingState();
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [userLocation]);

  return (
    <WeatherContext.Provider value={{ weatherData, userLocation }}>
      {children}
    </WeatherContext.Provider>
  );
};
