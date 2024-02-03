import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [search, setSearch] = useState("Jamshedpur"); // Holds Searched City
  const [currentWeather, setCurrentWeather] = useState(null); // Holds Current Weather data
  const [futureWeather, setFutureWeather] = useState(null); // Holds 5 days Forecast Weather data
  const [loading, setLoading] = useState(false); // Maintains the loading state while api fetch
  const [error, setError] = useState(null); // Handles error
  const [isCelsius, setIsCelsius] = useState(true); // Checks if the temperature is in Celsius or not
  const [selectedWeather, setSelectedWeather] = useState(null); // Holds Selected Weather data

  const baseUrl = "https://api.openweathermap.org/data/2.5"; // BaseUrl for fetching weather forecast
  const api = import.meta.env.VITE_OPENWEATHER_API; // gets openWeatherMap API from environment variable

  // Fetches weather forecast data from openWeatherMap
  async function fetchWeather(search, searchType) {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/${searchType}?q=${search}&units=metric&appid=${api}`
      );
      const data = await response.json();
      if (response.ok) {
        if (searchType === "weather") {
          // Checks if the search type is for current weather or forecast weather
          setCurrentWeather(data);
          setSelectedWeather(data); // Default selection is for current weather
        } else setFutureWeather(data); // Set state for forecast weather
        setError(null);
      }
      setError(data.message); // Set error message if City not found
      setSearch(""); // Clears input field
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // Formats Date for user readability
  function formatDate(date) {
    const currentDate = date ? new Date(date) : new Date();
    return currentDate.toLocaleDateString("en-us", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // Converts Temperature from Celsius to Fahrenheit and vice versa
  const convertTemp = (temp) => {
    if (isCelsius) {
      return `${temp} °C`;
    } else {
      const fahrenheit = (temp * 9) / 5 + 32;
      return `${fahrenheit.toFixed(2)} °F`;
    }
  };

  // Fetches current and forecast weather on page load
  useEffect(() => {
    fetchWeather(search, "weather");
    fetchWeather(search, "forecast");
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        search,
        setSearch,
        fetchWeather,
        loading,
        error,
        formatDate,
        convertTemp,
        setIsCelsius,
        currentWeather,
        futureWeather,
        selectedWeather,
        setSelectedWeather,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
