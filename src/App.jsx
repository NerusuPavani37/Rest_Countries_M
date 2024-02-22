import React, { useState, useEffect } from "react";
import {Routes, Route} from 'react-router-dom';
import "./App.css";
import { ThemeProvider } from "./Components/ThemeContext.jsx";
import Header from "./Components/Header.jsx";
import Search from "./Components/Search.jsx";
import Filters from "./Components/Filters.jsx";
import Details from "./Components/Details.jsx";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  
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
      <Routes>
          <Route path="/">
              <Route index element={<>
                <Search inputValue={setInputValue}/>
                <Filters countriesData= {countriesData} 
                regions={regions} 
                inputValue={inputValue}/>
               </>} />
          </Route>
          <Route path="/country/:id" element={<Details />}></Route>
          <Route path="*" element={<h1>Invalid Request</h1>} />
       </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
