import React, { createContext, useContext, useEffect, useState } from "react";
import { startLoadingState, endLoadingState } from "../utils/setLoadingState";
import { handleError } from "../utils/handleError.js";

const WeatherContext = createContext();

export const useWeatherContext = () => {
  return useContext(WeatherContext);
};

const API_KEY = "d2e080f60c01434b9a92c3d37932169f";

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [query, setQuery] = useState(null);

  const getUserLocation = async () => {
    const successCallback = async (position) => {
      const data = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
      setQuery(data);
    };

    const errorCallback = (error) => {
      console.log(error);
      setQuery("Delhi");
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (!query) {
      return;
    }

    let API_URL;

    if (query?.lat && query?.lon) {
      API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${query?.lat}&lon=${query?.lon}&appid=${API_KEY}&units=metric`;
    } else {
      API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`;
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
        if (error.message === "Failed to fetch") {
          await handleError(
            "Uh oh! It looks like you're not connected to the internet. Please check your connection and try again.",
            "Refresh Page"
          );
        } else {
          await handleError(error.message, "Try Again");
        }
      }
    };

    fetchData();
  }, [query]);

  return (
    <WeatherContext.Provider value={{ weatherData, query, setQuery }}>
      {children}
    </WeatherContext.Provider>
  );
};
