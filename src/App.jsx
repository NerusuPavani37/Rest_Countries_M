import React, { useState, useEffect } from "react";
import "./App.css";
import { ThemeProvider } from "./Components/ThemeContext.jsx";
import Header from "./Components/Header.jsx";
import Search from "./Components/Search.jsx";
import Filters from "./Components/Filters.jsx";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountriesData(sortedCountries);

        const regionNames = data.reduce((acc, curr) => {
          const region = curr.region;
          if (!acc.includes(region)) {
            acc.push(region);
          }
          return acc;
        }, []);
  
        const sortedRegionNames = regionNames.sort((a, b) =>
          a.localeCompare(b)
        );
        setRegions(sortedRegionNames);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
      });
  }, []);

  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <Search countries={countriesData} setFilteredCountries={setFilteredCountries} />
        <Filters countriesData={filteredCountries.length > 0 ? filteredCountries : countriesData} regions={regions} />
      </div>
    </ThemeProvider>
  );
}

export default App;
