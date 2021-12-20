import React from "react";
import { useHistory } from "react-router";
import "../Home/Home.css";
import "./DetailedView.css";

function DetailedView() {
  const history = useHistory();
  return (
    <div className="home__container">
      <div className="home__header">
        <h4>{history.location.state.stateName}</h4>
        <span>Date</span>
        <span>Sort By</span>
        <span>District</span>
      </div>
      <div className="detailedView__container">
        <table className="detailedview__subHeader">
          <thead>
            <tr>
              <th>Date</th>
              <th>Confirmed</th>
              <th>Recovered</th>
              <th>Deceased</th>
              <th>Delta</th>
              <th>Delta 7</th>
            </tr>
          </thead>
          <tbody className="detailedview__content">
            <tr>
              <td>2021-12-07</td>
              <td>100</td>
              <td>99</td>
              <td>0</td>
              <td>
                <p>Confirmed - 25</p>
                <p>Recovered - 5</p>
                <p>Deceased - 0</p>
              </td>
              <td>
                <p>Confirmed - 25</p>
                <p>Recovered - 5</p>
                <p>Deceased - 0</p>
              </td>
            </tr>
            <tr>
              <td>2021-12-07</td>
              <td>100</td>
              <td>99</td>
              <td>0</td>
              <td>
                <p>Confirmed - 25</p>
                <p>Recovered - 5</p>
                <p>Deceased - 0</p>
              </td>
              <td>
                <p>Confirmed - 25</p>
                <p>Recovered - 5</p>
                <p>Deceased - 0</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailedView;
