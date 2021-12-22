import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import "../Home/Home.css";
import "../StateCard/StateCard.css";
import NotFound from "../NotFound/NotFound";
import { defaultData, DisplayCount } from "../StateCard/StateCard";
import "./DetailedView.css";
import Select from "../Select/Select";
import { AppContext } from "../../Contexts/AppContext";
import Pagination from "../Pagination/Pagination";

export const TableData = ({ detailedViewData, date = "Total" }) => {
  return (
    <div className="detailView__content">
      <div>{date}</div>
      <div className="cardSummary_cnt" style={{ color: "#caca28" }}>
        {detailedViewData?.total?.confirmed ?? 0}
      </div>
      <div className="cardSummary_cnt" style={{ color: "#068206" }}>
        {detailedViewData?.total?.recovered ?? 0}
      </div>
      <div className="cardSummary_cnt" style={{ color: "#ff0000" }}>
        {detailedViewData?.total?.deceased ?? 0}
      </div>

      <div>
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
      </div>
      <div>
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
      </div>
    </div>
  );
};

function DetailedView() {
  const history = useHistory();
  const [statedatewiseList, setStatedatewiseList] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const {
    setIsDistrictSelected,
    setSelectedDate,
    selectedDate,

    setSortingOrder,
  } = useContext(AppContext);

  const detailedViewData = history.location.state?.details ?? {};
  useEffect(() => {
    fetch("https://data.covid19india.org/v4/min/timeseries.min.json")
      .then((res) => res.json())
      .then((result) => {
        const data = Object.entries(
          result[history.location.state.stateCode].dates
        );
        setStatedatewiseList(data);
      });
    return () => {
      setSortingOrder("");
    };
    // eslint-disable-next-line
  }, []);

  const sortData = (sortingOrder) => {
    const sortedData = [...statedatewiseList].sort((a, b) => {
      let value1 = a[1]?.total?.confirmed;
      let value2 = b[1]?.total?.confirmed;
      if (sortingOrder === "ASC") {
        return !value1
          ? 1
          : !value2
          ? -1
          : value1 === value2
          ? 0
          : value1 > value2
          ? 1
          : -1;
      }
      return !value1
        ? 1
        : !value2
        ? -1
        : value1 === value2
        ? 0
        : value2 > value1
        ? 1
        : -1;
    });
    setStatedatewiseList(sortedData);
  };

  const onDistrictChanged = (e) => {
    setSelectedDistrict(e.target.value);
    if (e.target.value) {
      setIsDistrictSelected(true);
    } else {
      setIsDistrictSelected(false);
    }
  };
  const showData = () => {
    if (!selectedDistrict && !selectedDate) {
      return <Pagination records={statedatewiseList} />;
    } else if (selectedDate) {
      const selectedDateData =
        statedatewiseList.filter((record) => record[0] === selectedDate)[0] ??
        defaultData;
      return (
        <div className="detailedview__content">
          <TableData
            date={selectedDateData[0]}
            detailedViewData={selectedDateData[1]}
          />
        </div>
      );
    } else {
      return (
        <div className="detailedview__content">
          <TableData
            detailedViewData={detailedViewData?.districts[selectedDistrict]}
          />
        </div>
      );
    }
  };

  return history.location.state &&
    Object.keys(history.location.state).length > 0 ? (
    <div className="home__container">
      <div className="home__header">
        <h4>{history.location.state.stateName}</h4>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <select onChange={(e) => sortData(e.target.value)}>
          <option value="0">Select</option>
          <option value="ASC">Confirmed Count - Ascending</option>
          <option value="DSC">Confirmed Count - Descending</option>
        </select>
        <Select
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          options={detailedViewData?.districts}
          changed={onDistrictChanged}
        />
      </div>
      <div className="detailedView__container">
        {selectedDistrict && selectedDate ? (
          <NotFound message="Data for selected creteria was not found" />
        ) : statedatewiseList?.length > 0 ? (
          <div>
            <div className="detailedview__Header">
              <h4>Date</h4>
              <h4>Confirmed</h4>
              <h4>Recovered</h4>
              <h4>Deceased</h4>
              <h4>Delta</h4>
              <h4>Delta 7</h4>
            </div>
            {showData()}
          </div>
        ) : (
          <h2 className="detailedView__loading">Loading ...</h2>
        )}
      </div>
    </div>
  ) : (
    <NotFound message="Data is not found for requested scenario" />
  );
}

export default DetailedView;
