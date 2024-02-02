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

  const getWindDirection = (windDeg) => {
    const directions = [
      "North ↑",
      "North-East ↗",
      "East →",
      "South-East ↘",
      "South ↓",
      "South-West ↙",
      "West ←",
      "North-West ↖",
    ];
    const index = Math.round((windDeg % 360) / 45);
    return directions[index % 8];
  };

  if (error) return <h2 className="error">{error}</h2>;

  return !loading && !error ? (
    <div className="search-result-container">
      <div>
        <h2>
          {weather?.name}, {weather?.sys?.country}
        </h2>
        <h5>{getCurrentDate()}</h5>
      </div>
      <div>
        <h2>{weather?.main?.temp} °C</h2>
        <div className="min-max-temp">
          <div>
            <span>{weather?.main?.temp_min} °C</span>
            <p>min</p>
          </div>
          <div>
            <span>{weather?.main?.temp_max} °C</span>
            <p>max</p>
          </div>
        </div>
      </div>
      <div className="weather-desc">
        <img
          src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
          alt={weather?.weather[0]?.description}
        />
        <h2>{weather?.weather[0]?.description}</h2>
      </div>
      <div className="weather-details">
        <div>
          <h3>{weather?.main?.humidity} %</h3>
          <p>Humidity</p>
        </div>
        <div>
          <h3>
            {weather?.wind?.speed} m/s {getWindDirection(weather?.wind?.speed)}
          </h3>
          <p>Wind</p>
        </div>
      </div>
    </div>
  ) : (
    <h3 className="loading">Loading...</h3>
  );
}
