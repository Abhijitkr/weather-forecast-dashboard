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

  if (error)
    return <h2 className="text-3xl font-bold text-red-300">{error}</h2>;

  return !loading && !error ? (
    <div className="bg-green-500 p-5 rounded text-center text-white w-[500px] flex flex-col gap-4">
      {/* <h2 className="text-2xl font-bold">Weather</h2> */}

      <div>
        <p className="text-3xl font-semibold">
          {weather?.name}, {weather?.sys?.country}
        </p>
        <p className="text-base">{getCurrentDate()}</p>
      </div>
      <div>
        <p className="text-4xl font-bold">{weather?.main?.temp} °C</p>
        <p className="text-3xl font-semibold">
          {weather?.weather[0]?.description}
        </p>
      </div>
      <div>
        <p className="text-2xl font-bold">{weather?.wind?.speed}</p>
        <p className="text-base">Wind Speed</p>
      </div>
      <div>
        <p className="text-2xl font-bold">{weather?.main?.humidity}</p>
        <p className="text-base">Humidity</p>
      </div>
    </div>
  ) : (
    <h3 className="text-3xl text-white">Loading...</h3>
  );
}
