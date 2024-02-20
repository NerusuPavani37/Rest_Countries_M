import React from 'react'
import { useTheme } from './ThemeContext';

function Header() {
  const {darkMode, toggleDarkMode}=useTheme();
  return (
    <>
      <header className={darkMode ? "header dark-mode" : "header"}>
        <div className="content">
          <h2>Where in the world?</h2>
        </div>
        <div className="mode" onClick={toggleDarkMode}>
          <ion-icon name={darkMode ? "moon" : "moon-outline"} className="moon"></ion-icon> 
          Dark Mode
        </div>
      </header>
    </>
  );
}

export default Header;