import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useTheme } from "./ThemeContext";

function Details() {
  const { id } = useParams();
  const { darkMode } = useTheme();

  const [dataFetch, setDataFetch] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDataFetch("loaded");
        if (data.status) {
          setDataFetch("error");
          return;
        }
        setData(data[0]);
      });
  }, [id]);

  let currencyArr = [];

  if (data.currencies) {
    currencyArr = Object.keys(data.currencies).map((code, index) => {
      if (index == 0) {
        return data.currencies[code].name;
      }
      return `${data.currencies[code].name}`;
    });
  }

  let languageArr = [];

  if (data.languages) {
    languageArr = Object.keys(data.languages).map((code, index) => {
      if (index == 0) {
        return data.languages[code];
      }
      return `${data.languages[code]}`;
    });
  }

  let nativeName = "";
  if (data && data.name && data.name.nativeName) {
    nativeName =
      data.name.nativeName[Object.keys(data.name.nativeName)[0]].common;
  }

  if (dataFetch == "loaded") {
    return (
      <div
        className={darkMode ? "detail-container dark-mode" : "detail-container"}
      >
        <div className="backBtn">
          <Link to="/">
            <button className={darkMode ? "btn dark-mode" : "btn"}>
              <ion-icon name="arrow-back-outline"></ion-icon> Back
            </button>
          </Link>
        </div>

        <div className={darkMode ? "details-div dark-mode" : "details-div"}>
          <img src={data.flags.png} alt="" />

          <div className="country-detail">
            <h1>{data.name.common}</h1>

            <div className="container">
              <div className="details">
                <p>Native Name: <span>{nativeName}</span></p>
                <p>Population: <span>{data.population}</span></p>
                <p>Region: <span>{data.region}</span></p>
                <p>Subregion: <span>{data.subregion}</span></p>
                <p>Capital: <span>{data.capital}</span></p>
              </div>

              <div className="more-details">
                <p>Top Level Domain:  <span>{data.tld}</span></p>
                <p>Currencies:  <span>{currencyArr}</span></p>
                <p>Languages:  <span>{languageArr}</span></p>
              </div>
            </div>

            <div className="border">
              <h3>Border Countries :</h3>

              <div
                className={
                  darkMode ? "border-countries dark-mode" : "border-countries"
                }
              >
                {data.borders ? (
                  data.borders.map((border, i) => <div key={i}>{border}</div>)
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    if (dataFetch == "error") {
      <div className="notFound" id="noCountry">
        ERROR 404 (NOT FOUND!)
      </div>;
    }
  }
}

export default Details;
