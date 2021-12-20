import React from "react";
import "./AlertPopup.css";
import { ReactComponent as WarningIcon } from "../../icons/icon-warning.svg";

const AlertPopup = ({ showAlert = true, setShowAlert, errorMsg }) => {
  return showAlert ? (
    <div className="alert__container">
      <div className="alert__content">
        <div className="alert__warning">
          <WarningIcon />
          <h2>Warning</h2>
          <h4>{errorMsg ?? "Error"}</h4>
          <button
            onClick={() => {
              setShowAlert(false);
            }}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AlertPopup;
