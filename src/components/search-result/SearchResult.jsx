import { useState } from "react";
import "./searchResultStyle.css";
export default function SearchResult({ weather, loading, error }) {
  const [isCelsius, setIsCelsius] = useState(true);

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

  const convertTemp = (temp) => {
    if (isCelsius) {
      return `${temp} °C`;
    } else {
      const fahrenheit = (temp * 9) / 5 + 32;
      return `${fahrenheit.toFixed(2)} °F`;
    }
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
        <div className="temperature-unit-button">
          <button onClick={() => setIsCelsius(true)}>°C</button>
          <button onClick={() => setIsCelsius(false)}>°F</button>
        </div>
        <div>
          <h2 className="current-temp">{convertTemp(weather?.main?.temp)}</h2>
          <div className="min-max-temp">
            <div>
              <span>{convertTemp(weather?.main?.temp_min)}</span>
              <p>min</p>
            </div>
            <div>
              <span>{convertTemp(weather?.main?.temp_max)}</span>
              <p>max</p>
            </div>
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
