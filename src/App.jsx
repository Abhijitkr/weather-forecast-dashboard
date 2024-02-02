import "./App.css";
import { useEffect, useState } from "react";
import SearchInput from "./components/search-input/SearchInput";
import SearchResult from "./components/search-result/SearchResult";

export default function App() {
  const [search, setSearch] = useState("Jamshedpur");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [futureWeather, setFutureWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // console.log(currentWeather, "current");
  console.log(futureWeather, "future");

  useEffect(() => {
    fetchWeather(search, "weather");
    fetchWeather(search, "forecast");
  }, []);

  return (
    <main className="main-container">
      <h1>Weather App Project</h1>
      <SearchInput
        search={search}
        setSearch={setSearch}
        fetchWeather={fetchWeather}
      />
      <SearchResult
        currentWeather={currentWeather}
        futureWeather={futureWeather}
        loading={loading}
        error={error}
      />
    </main>
  );
}
