import React from "react";
import { useTheme } from "./ThemeContext";

function Countries({countries,selectedRegion, selectedSubregion}) {
  const {darkMode}=useTheme();
  const filteredCountries = countries.filter((country) => {
    if (selectedRegion && selectedSubregion) {
      return country.region === selectedRegion && country.subregion === selectedSubregion;
    } else if (selectedRegion) {
      return country.region === selectedRegion;
    } else {
      return true; 
    }
  });

  return (
    <div className="countries">
      {filteredCountries.map((country) => (
        <div key={country.cca3} className={darkMode ? "country country-dark" : "country"}>
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="country-image"
          />
          <div className="country-details">
            <h2>{country.name.common}</h2>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Subregion: {country.subregion}</p>
            <p>Capital: {country.capital}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Countries;