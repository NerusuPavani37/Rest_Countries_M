import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";

function Search({inputValue }) {
  const { darkMode } = useTheme();
  

  const handleInputChange = (e) => {
    inputValue(e.target.value)
  }

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
            onChange={(e)=>handleInputChange(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
