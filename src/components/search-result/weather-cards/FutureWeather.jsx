import { useContext } from "react";
import { GlobalContext } from "../../../context/context";

export default function FutureWeather() {
  const {
    futureWeather, // State to Hold 5 day Forecast Weather data
    formatDate, // Function that Formats Date for easy readability
    convertTemp, // Function to Convert Temperature from Celsius to Fahrenheit and vice versa
    selectedWeather, // State to Hold Selected Weather data
    setSelectedWeather, // Sets the State to Hold Selected Weather data
    currentWeather, // State to Hold Current Weather data
  } = useContext(GlobalContext);

  // Gets weather dataset of unique dates (5 days)
  const uniqueDates = [
    ...new Set(futureWeather?.list?.map((item) => item.dt_txt.split(" ")[0])),
  ];

  // Gets the weather data of 00:00:00 time
  const uniqueForecastData = uniqueDates.map((date) => {
    const selectedTimeData = futureWeather?.list?.find((item) =>
      item.dt_txt.startsWith(`${date} 00:00:00`)
    );
    return selectedTimeData;
  });

  return (
    <div className="future-weather">
      {/* Renders the currentWeather card in forecast area with little details */}
      <div
        key={currentWeather?.dt}
        className={
          selectedWeather?.dt === currentWeather?.dt
            ? "weather-card selected"
            : "weather-card"
        }
        onClick={() => setSelectedWeather(currentWeather)}
      >
        <h4>{formatDate(currentWeather?.dt_txt)}</h4>
        <h2>{convertTemp(currentWeather?.main?.temp)}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0]?.icon}@2x.png`}
          alt={currentWeather?.weather[0]?.description}
        />
        <h3>{currentWeather?.weather[0]?.description}</h3>
      </div>

      {/* Renders the 5 day forecast card in forecast area with little details */}
      {uniqueForecastData.slice(1).map((item) => (
        <div
          key={item?.dt}
          className={
            selectedWeather?.dt === item?.dt
              ? "weather-card selected"
              : "weather-card"
          }
          onClick={() => setSelectedWeather(item)}
        >
          <h4>{formatDate(item?.dt_txt)}</h4>
          <h2>{convertTemp(item?.main?.temp)}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${item?.weather[0]?.icon}@2x.png`}
            alt={item?.weather[0]?.description}
          />
          <h3>{item?.weather[0]?.description}</h3>
        </div>
      ))}
    </div>
  );
}
