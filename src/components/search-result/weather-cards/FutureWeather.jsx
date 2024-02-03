import { useContext } from "react";
import { GlobalContext } from "../../../context/context";

export default function FutureWeather() {
  const {
    futureWeather,
    formatDate,
    convertTemp,
    selectedWeather,
    setSelectedWeather,
    currentWeather,
  } = useContext(GlobalContext);

  const uniqueDates = [
    ...new Set(futureWeather?.list?.map((item) => item.dt_txt.split(" ")[0])),
  ];

  const uniqueForecastData = uniqueDates.map((date) => {
    const selectedTimeData = futureWeather?.list?.find((item) =>
      item.dt_txt.startsWith(`${date} 00:00:00`)
    );
    return selectedTimeData;
  });

  return (
    <div className="future-weather">
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