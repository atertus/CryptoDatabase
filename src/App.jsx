import { useState } from "react";
import "./App.css";
import CoinInfo from "/Components/CoinInfo.jsx";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  const searchItems = async () => {
    if (searchInput.trim() === "") {
      console.warn("Search input is empty.");
      setFilteredResults([]); // Clear results if input is empty
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`
      );
      const json = await response.json();

      if (json.Data) {
        const filteredData = Object.keys(json.Data)
          .filter((item) => item.toLowerCase().includes(searchInput.toLowerCase()))
          .map((coin) => json.Data[coin]); // Map symbol to full coin data

        setFilteredResults(filteredData);
      } else {
        console.warn("No data found in API response.");
        setFilteredResults([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFilteredResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="whole-page">
      <h1>Crypto Database</h1>
   
      
      <input
        type="text"
        placeholder="Search..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={searchItems}>Search</button>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {filteredResults.length > 0 ? (
            filteredResults.map((coin) =>
              coin && coin.ImageUrl ? (
                <CoinInfo
                  key={coin.Symbol}
                  image={coin.ImageUrl}
                  name={coin.FullName}
                  symbol={coin.Symbol}
                />
              ) : null
            )
          ) : (
            <li>No results found.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default App;
