import "./App.css";
import { useEffect, useState } from "react";
import SearchInput from "./components/search-input/SearchInput";
import SearchResult from "./components/search-result/SearchResult";

export default function App() {
  const [search, setSearch] = useState("Jamshedpur");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = "https://api.openweathermap.org/data/2.5";
  const api = import.meta.env.VITE_OPENWEATHER_API;

  async function fetchWeather(search) {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/weather?q=${search}&units=metric&appid=${api}`
      );
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
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

  console.log(weather);

  useEffect(() => {
    fetchWeather(search);
  }, []);

  return (
    <main className="main-container">
      <h1>Weather App Project</h1>
      <SearchInput
        search={search}
        setSearch={setSearch}
        fetchWeather={fetchWeather}
      />
      <SearchResult weather={weather} loading={loading} error={error} />
    </main>
  );
}
