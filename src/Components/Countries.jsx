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
 
  let filteredeData = countries.filter((country) => {
    return (
      (!inputValue ||
        country.name.common.toLowerCase().includes(inputValue.toLowerCase())) &&
      (!selectedRegion || selectedRegion === country.region) &&
      (!selectedSubregion || selectedSubregion === country.subregion)
    );
  });

  return (
    <div className="countries">
      {filteredeData.length === 0 ? (
        <h1>No such country</h1>
      ) : (
        filteredeData.map((country) => (
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
                <p>Population: {country.population}</p>
                <p>Region: {country.region}</p>
                <p>Subregion: {country.subregion}</p>
                <p>Capital: {country.capital}</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default Countries;
