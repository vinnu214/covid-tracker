import React from "react";
import "./Header.css";
import CovidIcon from "../../icons/icon-covid.png";
const Header = () => {
  return (
    <div className="header">
      <img src={CovidIcon} alt="APP Header" />
      Covid Tracker - India
    </div>
  );
};

export default Header;
