import { useContext } from "react";
import "./searchInputStyle.css";
import { GlobalContext } from "../../context/context";
export default function SearchInput() {
  const { search, setSearch, fetchWeather, setSelectedWeather } =
    useContext(GlobalContext);

  function handleSearch(e) {
    e.preventDefault();
    setSelectedWeather(null); // Clears selected weather on new search
    fetchWeather(search, "weather"); // Fetches current weather
    fetchWeather(search, "forecast"); // Fetches forecast weather
  }

  return (
    <form className="search-input-form">
      <input
        type="text"
        placeholder="Enter City"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <button type="submit" onClick={handleSearch} className="search-btn">
        Search
      </button>
    </form>
  );
}
