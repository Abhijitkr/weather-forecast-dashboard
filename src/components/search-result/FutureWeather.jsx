export default function FutureWeather({
  futureWeather,
  formatDate,
  convertTemp,
  setSelectedWeather,
}) {
  const uniqueDates = [
    ...new Set(futureWeather?.list?.map((item) => item.dt_txt.split(" ")[0])),
  ];

  const uniqueForecastData = uniqueDates.map((date) => {
    const selectedTimeData = futureWeather?.list?.find((item) =>
      item.dt_txt.startsWith(`${date} 12:00:00`)
    );
    return selectedTimeData;
  });

  return (
    <div className="future-weather">
      {uniqueForecastData.slice(1).map((item) => (
        <div
          key={item?.dt}
          className="weather-card"
          onClick={() => setSelectedWeather(item)}
        >
          <h4>{formatDate(item?.dt_txt)}</h4>
          <h2>{convertTemp(item?.main?.temp)}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${item?.weather[0]?.icon}@2x.png`}
            alt={item?.weather[0]?.description}
          />
          <h3>{item?.weather[0]?.description}</h3>
        </div>
      ))}
    </div>
  );
}
