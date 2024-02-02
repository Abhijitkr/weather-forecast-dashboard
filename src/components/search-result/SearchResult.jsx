import "./searchResultStyle.css";
export default function SearchResult({ weather, loading, error }) {
  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  if (error) return <h2 className="error">{error}</h2>;

  return !loading && !error ? (
    <div className="search-result-container">
      <div>
        <h2>
          {weather?.name}, {weather?.sys?.country}
        </h2>
        <h3>{getCurrentDate()}</h3>
      </div>
      <div>
        <h1>{weather?.main?.temp} °C</h1>
        <h2>{weather?.weather[0]?.description}</h2>
      </div>
      <div>
        <h1>{weather?.wind?.speed}</h1>
        <h3>Wind Speed</h3>
      </div>
      <div>
        <h1>{weather?.main?.humidity}</h1>
        <h3>Humidity</h3>
      </div>
    </div>
  ) : (
    <h3 className="loading">Loading...</h3>
  );
}
