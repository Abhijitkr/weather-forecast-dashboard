export default function CurrentWeather({
  currentWeather,
  formatDate,
  convertTemp,
  setIsCelsius,
  selectedWeather,
}) {
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
    const index = Math.round((windDeg % 360) / 45);
    return directions[index % 8];
  }

  return (
    <div className="current-weather-container">
      <div>
        <h2>
          {currentWeather?.name}, {currentWeather?.sys?.country}
        </h2>
        <h5>
          {selectedWeather ? formatDate(selectedWeather?.dt_txt) : formatDate()}
        </h5>
      </div>
      <div>
        <div className="temperature-unit-button">
          <button onClick={() => setIsCelsius(true)}>°C</button>
          <button onClick={() => setIsCelsius(false)}>°F</button>
        </div>
        <div>
          <h2 className="current-temp">
            {convertTemp((selectedWeather || currentWeather)?.main?.temp)}
          </h2>
          <div className="min-max-temp">
            <div>
              <span>
                {convertTemp(
                  (selectedWeather || currentWeather)?.main?.temp_min
                )}
              </span>
              <p>min</p>
            </div>
            <div>
              <span>
                {convertTemp(
                  (selectedWeather || currentWeather)?.main?.temp_max
                )}
              </span>
              <p>max</p>
            </div>
          </div>
        </div>
      </div>
      <div className="weather-desc">
        <img
          src={`https://openweathermap.org/img/wn/${
            (selectedWeather || currentWeather)?.weather[0]?.icon
          }@2x.png`}
          alt={(selectedWeather || currentWeather)?.weather[0]?.description}
        />
        <h2>{(selectedWeather || currentWeather)?.weather[0]?.description}</h2>
      </div>
      <div className="weather-details">
        <div>
          <h3>{(selectedWeather || currentWeather)?.main?.humidity} %</h3>
          <p>Humidity</p>
        </div>
        <div>
          <h3>
            {(selectedWeather || currentWeather)?.wind?.speed} m/s{" "}
            {getWindDirection((selectedWeather || currentWeather)?.wind?.speed)}
          </h3>
          <p>Wind</p>
        </div>
      </div>
    </div>
  );
}
