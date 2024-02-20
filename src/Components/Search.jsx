import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";

function Search({ countries,setFilteredCountries }) {
  const { darkMode } = useTheme();
  const [inputValue, setInputValue] = useState("");
  
  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setInputValue(inputValue);
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(inputValue)
    );
    setFilteredCountries(filtered);
  };

  const handleKeyPress = (e) => {
    const inputValue = e.target.value.toLowerCase();
    if (e.key === "Enter") {
      const exactMatch = countries.filter(
        (country) => country.name.common.toLowerCase() === inputValue
      );
      setFilteredCountries(exactMatch);
    }
  };
  return (
    <div>
      <div className={darkMode ? "search dark-mode" : "search"}>
        <div
          className={
            darkMode ? "search-container dark-mode" : "search-container"
          }
        >
          <ion-icon name="search-outline" className="search-icon"></ion-icon>
          <input
            type="text"
            placeholder="Search for a country..."
            className={darkMode ? "search-input dark-mode" : "search-input"}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
