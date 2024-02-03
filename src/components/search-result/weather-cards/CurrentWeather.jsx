import { useContext } from "react";
import { GlobalContext } from "../../../context/context";

export default function CurrentWeather() {
  const {
    currentWeather, // State to Hold Current Weather data
    setIsCelsius, // State to Check if the temperature is in Celsius or not
    selectedWeather, // State to Hold Selected Weather data
    formatDate, // Function that Formats Date for easy readability
    convertTemp, // Function to Convert Temperature from Celsius to Fahrenheit and vice versa
  } = useContext(GlobalContext);

  // Converts Wind Degree to Wind Direction
  function getWindDirection(windDeg) {
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
    const index = Math.round(windDeg / 45) % 8; // Gets index according to the degree
    return directions[index]; // returns the direction
  }

  return (
    <div className="current-weather-container">
      {/* City, country name and weather date */}
      <div>
        <h2>
          {currentWeather?.name}, {currentWeather?.sys?.country}
        </h2>
        <h3>
          {/* if selectedWeather then sends selectedWeather date for formatting else formats current date  */}
          {selectedWeather ? formatDate(selectedWeather?.dt_txt) : formatDate()}
        </h3>
      </div>

      {/* Temperature Section */}
      <div>
        {/* Temperature toggling buttons */}
        <div className="temperature-unit-button">
          <button onClick={() => setIsCelsius(true)}>°C</button>
          <button onClick={() => setIsCelsius(false)}>°F</button>
        </div>
        {/* Average, min, max temperature */}
        <div>
          <h2 className="current-temp">
            {convertTemp((selectedWeather || currentWeather)?.main?.temp)}
          </h2>
          <div className="min-max-temp">
            <div>
              <h3>
                {convertTemp(
                  (selectedWeather || currentWeather)?.main?.temp_min
                )}
              </h3>
              <p>min</p>
            </div>
            <div>
              <h3>
                {convertTemp(
                  (selectedWeather || currentWeather)?.main?.temp_max
                )}
              </h3>
              <p>max</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Description with Icon */}
      <div className="weather-desc">
        <img
          src={`https://openweathermap.org/img/wn/${
            (selectedWeather || currentWeather)?.weather[0]?.icon
          }@2x.png`}
          alt={(selectedWeather || currentWeather)?.weather[0]?.description}
        />
        <h2>{(selectedWeather || currentWeather)?.weather[0]?.description}</h2>
      </div>

      {/* Weather Details - Humidity and Wind Speed and Direction */}
      <div className="weather-details">
        <div>
          <h3>{(selectedWeather || currentWeather)?.main?.humidity} %</h3>
          <p>Humidity</p>
        </div>
        <div>
          <h3>
            {(selectedWeather || currentWeather)?.wind?.speed} m/s{" "}
            {getWindDirection((selectedWeather || currentWeather)?.wind?.deg)}
          </h3>
          <p>Wind</p>
        </div>
      </div>
    </div>
  );
}
