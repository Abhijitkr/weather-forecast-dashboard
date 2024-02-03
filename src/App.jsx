import "./App.css";
import SearchInput from "./components/search-input/SearchInput";
import SearchResult from "./components/search-result/SearchResult";

export default function App() {
  return (
    <main className="main-container">
      <h1>Weather Forecast Dashboard</h1>
      <SearchInput />
      <SearchResult />
    </main>
  );
}
