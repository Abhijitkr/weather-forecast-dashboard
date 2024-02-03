import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [search, setSearch] = useState("Jamshedpur");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [futureWeather, setFutureWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [selectedWeather, setSelectedWeather] = useState(null);

  const baseUrl = "https://api.openweathermap.org/data/2.5";
  const api = import.meta.env.VITE_OPENWEATHER_API;

  async function fetchWeather(search, searchType) {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/${searchType}?q=${search}&units=metric&appid=${api}`
      );
      const data = await response.json();
      if (response.ok) {
        if (searchType === "weather") setCurrentWeather(data);
        else setFutureWeather(data);
        setError(null);
      }
      setError(data.message);
      setSearch("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(date) {
    const currentDate = date ? new Date(date) : new Date();
    return currentDate.toLocaleDateString("en-us", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const convertTemp = (temp) => {
    if (isCelsius) {
      return `${temp} °C`;
    } else {
      const fahrenheit = (temp * 9) / 5 + 32;
      return `${fahrenheit.toFixed(2)} °F`;
    }
  };

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
