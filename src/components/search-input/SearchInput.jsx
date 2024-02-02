import "./searchInputStyle.css";
export default function SearchInput({ search, setSearch, fetchWeather }) {
  function handleSearch(e) {
    e.preventDefault();
    fetchWeather(search);
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
