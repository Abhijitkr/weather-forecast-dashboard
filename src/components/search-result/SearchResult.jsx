import "./searchResultStyle.css";
import CurrentWeather from "./CurrentWeather";
import FutureWeather from "./FutureWeather";
import { useContext } from "react";
import { GlobalContext } from "../../context/context";
export default function SearchResult() {
  const { loading, error } = useContext(GlobalContext);

  if (error) return <h2 className="error">{error}</h2>;

  return !loading && !error ? (
    <div className="search-result-container">
      <CurrentWeather />
      <FutureWeather />
    </div>
  ) : (
    <h3 className="loading">Loading...</h3>
  );
}
