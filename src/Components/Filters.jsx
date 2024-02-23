import React,{useState} from 'react'
import { useTheme } from './ThemeContext';
import Countries from './Countries';

function Filters({countriesData,regions,inputValue}) {
  const {darkMode}=useTheme();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSubregion, setSelectedSubregion] = useState("");
  const [selectedOptions, setSelectedOptions] = useState("");
  const [sortedCountries, setSortedCountries] = useState([]);


  const handleSorting = (e) => {
    const option = e.target.value;
    setSelectedOptions(option);
    const sortedCountries = [...countriesData];
  
    if (option === 'population_asc') {
      sortedCountries.sort((a, b) => a.population - b.population);
    } else if (option === 'population_desc') {
      sortedCountries.sort((a, b) => b.population - a.population);
    } else if (option === 'area_asc') {
      sortedCountries.sort((a, b) => a.area - b.area);
    } else if (option === 'area_desc') {
      sortedCountries.sort((a, b) => b.area - a.area);
    }
    setSortedCountries(sortedCountries);
  };

  const subRegions = countriesData.reduce((acc, curr) => {
    if (selectedRegion && selectedRegion === curr.region) {
      if(!acc.includes(curr.subregion)){
        acc.push(curr.subregion);
      }
    }
    return acc;
  }, []);

  const handleSubregionChange = (e) => {
    const subregion = e.target.value;
    setSelectedSubregion(subregion);
  };
  
  return (
    <>
    <div className='filters'>

    <div className={darkMode ? "filter filter-dark" : "filter"}>
    <select
      id="filter-select"
      className={
        darkMode ? "filter-select filter-select-dark" : "filter-select"
      }
      values={selectedRegion}
      onChange={(e) => setSelectedRegion(e.target.value)}
    >
      <option value="" disabled hidden selected>Filter by Region</option>
      {regions.map((region, index) => {
        return (
          <option key={index} value={region}>
            {region}
          </option>
        );
      })}
    </select>
  </div>  
  <div
  className={
    darkMode ? "subregion-filter dark-mode" : "subregion-filter"
  }
>
  <select
    id="filter-subregion"
    className={
      darkMode
        ? "filter-subregion dark-mode"
        : "filter-subregion"
    }
    value={selectedSubregion}
    onChange={handleSubregionChange}
  >
    <option value="" disabled hidden selected>
      Filter by Sub-Region
    </option>
    {subRegions.map((subregion, index) => {
      return (
        <option key={index} value={subregion}>
          {subregion}
        </option>
      );
    })}
  </select>
</div>

<div className={darkMode ? "sort dark-mode" : "sort"}>
      <select
        id="sortDropdown"
        className={darkMode ? "sort-container dark-mode" : "sort-container"}
        value={selectedOptions}
        onChange={handleSorting}
      >
        <option value="" disabled hidden selected>
          Sort
        </option>

        <option value="population_asc">Population Low to High</option>
        <option value="population_desc">Population High to Low</option>
        <option value="area_asc">Area Low to High</option>
        <option value="area_desc">Area High to Low</option>
      </select>
    </div>
    </div>

    <div>
    <Countries countries={sortedCountries.length > 0 ? sortedCountries : countriesData} 
               selectedRegion={selectedRegion}
               selectedSubregion={selectedSubregion}
               inputValue={inputValue}
      />

    </div>
</>
  )
}

export default Filters
