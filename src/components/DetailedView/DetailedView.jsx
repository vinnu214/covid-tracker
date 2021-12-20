import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "../Home/Home.css";
import "../StateCard/StateCard.css";
import NotFound from "../NotFound/NotFound";
import { DisplayCount } from "../StateCard/StateCard";
import "./DetailedView.css";

export const TableData = ({ detailedViewData, date = "Total" }) => {
  return (
    <tr>
      <td>{date}</td>
      <td className="cardSummary_cnt" style={{ color: "#caca28" }}>
        {detailedViewData?.total?.confirmed ?? 0}
      </td>
      <td className="cardSummary_cnt" style={{ color: "#068206" }}>
        {detailedViewData?.total?.recovered ?? 0}
      </td>
      <td className="cardSummary_cnt" style={{ color: "#ff0000" }}>
        {detailedViewData?.total?.deceased ?? 0}
      </td>

      <td>
        <div>
          <DisplayCount
            subHeading="Confirmed"
            color="#caca28"
            cnt={detailedViewData?.delta?.confirmed}
          />
          <DisplayCount
            subHeading="Recovered"
            color="#068206"
            cnt={detailedViewData?.delta?.recovered}
          />
          <DisplayCount
            subHeading="Deceased"
            color="#ff0000"
            cnt={detailedViewData?.delta?.deceased}
          />
        </div>
      </td>
      <td>
        <div>
          <DisplayCount
            subHeading="Confirmed"
            color="#caca28"
            cnt={detailedViewData?.delta7?.confirmed}
          />
          <DisplayCount
            subHeading="Recovered"
            color="#068206"
            cnt={detailedViewData?.delta7?.recovered}
          />
          <DisplayCount
            subHeading="Deceased"
            color="#ff0000"
            cnt={detailedViewData?.delta7?.deceased}
          />
        </div>
      </td>
    </tr>
  );
};

function DetailedView() {
  const history = useHistory();
  const [statedatewiseList, setStatedatewiseList] = useState([]);
  const detailedViewData = history.location.state?.details ?? {};
  useEffect(() => {
    fetch("https://data.covid19india.org/v4/min/timeseries.min.json")
      .then((res) => res.json())
      .then((result) => {
        setStatedatewiseList(
          Object.entries(result[history.location.state.stateCode].dates)
        );
      });
  }, []);

  return history.location.state &&
    Object.keys(history.location.state).length > 0 ? (
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
            <TableData detailedViewData={detailedViewData} />
            {statedatewiseList.map((record) => (
              <TableData
                key={record[0]}
                date={record[0]}
                detailedViewData={record[1]}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <NotFound message="Data is not found for requested scenario" />
  );
}

export default DetailedView;
