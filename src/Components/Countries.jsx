import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

function Countries({
  countries,
  selectedRegion,
  selectedSubregion,
  inputValue,
}) {
  console.log(selectedSubregion);
  const { darkMode } = useTheme();
 
  let filteredData = countries.filter((country) => {
     const matchesInput = (!inputValue || country.name.common.toLowerCase().includes(inputValue.toLowerCase()));
     const matchesRegion = (!selectedRegion || selectedRegion === country.region);
     const matchesSubregion = (!selectedSubregion || selectedSubregion === country.subregion);
     return matchesInput && matchesRegion && matchesSubregion;
  });

  return (
    <div className="countries">
      {filteredData.length === 0 ? (
        <h1>No such country</h1>
      ) : (
        filteredData.map((country) => (
          <Link
            key={country.cca3}
            to={`country/${country.cca3}`}
            className="custom-link"
          >
            <div
              key={country.cca3}
              className={darkMode ? "country country-dark" : "country"}
            >
              <img
                src={country.flags.svg}
                alt={country.name.common}
                className="country-image"
              />
              <div className="country-details">
                <h2>{country.name.common}</h2>
                <p>Population: <span>{country.population}</span> </p>
                <p>Region: <span>{country.region}</span> </p>
                <p>Capital: <span>{country.capital}</span> </p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default Countries;
