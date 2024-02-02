import "./searchResultStyle.css";
import CurrentWeather from "./CurrentWeather";
import FutureWeather from "./FutureWeather";
import { useState } from "react";
export default function SearchResult({
  currentWeather,
  futureWeather,
  loading,
  error,
}) {
  const [isCelsius, setIsCelsius] = useState(true);

  function formatDate(date = "") {
    return new Date(date).toLocaleDateString("en-us", {
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

  if (error) return <h2 className="error">{error}</h2>;

  return !loading && !error ? (
    <div className="search-result-container">
      <CurrentWeather
        currentWeather={currentWeather}
        formatDate={formatDate}
        convertTemp={convertTemp}
        setIsCelsius={setIsCelsius}
      />
      <FutureWeather
        futureWeather={futureWeather}
        formatDate={formatDate}
        convertTemp={convertTemp}
      />
    </div>
  ) : (
    <h3 className="loading">Loading...</h3>
  );
}
