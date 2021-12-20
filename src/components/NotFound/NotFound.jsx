import React from "react";
import NotFoundIcon from "../../icons/icon-not_found.svg";
import "./NotFound.css";

const NotFound = ({ message = "No Data Found" }) => {
  return (
    <div className="not-found">
      <img src={NotFoundIcon} alt="Not Found" />
      <h2 className="no-data">{message}</h2>
    </div>
  );
};

export default NotFound;
