import React, { useContext, useEffect, useState } from "react";
import { states } from "../../constants";
import { AppContext } from "../../Contexts/AppContext";
import SearchInput from "../Search/Search";
import StateCard from "../StateCard/StateCard";
import "./Home.css";
import AlertPopup from "../Alert/AlertPopup";
import NotFound from "../NotFound/NotFound";

function Home() {
  const {
    modifiedCardsList,
    setmodifiedCardsList,
    setCardsList,
    selectedDate,
    sortingOrder,
    changeSort,
    setSortingOrder,
    displaySearchedStates,
    setSelectedDate,
    isDistrictSelected,
  } = useContext(AppContext);
  const [isWarning, setIsWarning] = useState(false);
  useEffect(() => {
    let finalList = JSON.parse(localStorage.getItem("dataList") ?? "[]");
    if (!Object.keys(finalList).length > 0) {
      fetch("https://data.covid19india.org/v4/min/data.min.json")
        .then((res) => res.json())
        .then((result) => {
          finalList = Object.entries(result).map((state) => ({
            stateCode: state[0],
            stateName: states[state[0]],
            details: state[1],
            affected:
              ((state[1]?.total?.confirmed ?? 0) /
                (state[1]?.meta?.population ?? 1)) *
              100,
            vaccinated:
              ((state[1]?.total?.vaccinated1 ?? 0) /
                (state[1]?.meta?.population ?? 1)) *
              100,
          }));
          localStorage.setItem("dataList", JSON.stringify(finalList));
          finalList.sort((a, b) => {
            let state1 = a.stateName.toLowerCase(),
              state2 = b.stateName.toLowerCase();

            if (state1 < state2) {
              return -1;
            }
            if (state1 > state2) {
              return 1;
            }
            return 0;
          });
          setCardsList(finalList);
          setmodifiedCardsList(finalList);
        });
    } else {
      setCardsList(finalList);
      setmodifiedCardsList(finalList);
    }
  }, []);

  // data w.r.to time
  useEffect(() => {
    if (selectedDate) {
      let finalList = JSON.parse(localStorage.getItem("dataTimeList")) ?? {};
      if (!finalList[selectedDate]) {
        fetch("https://data.covid19india.org/v4/min/timeseries.min.json")
          .then((res) => res.json())
          .then((result) => {
            let tempList = { ...finalList };
            console.log(
              Object.entries(result),
              result,
              tempList,
              "Time Initial Result"
            );
            let dataForSelectedDate = [];
            Object.keys(states).forEach((state) => {
              dataForSelectedDate.push({
                stateCode: state,
                stateName: states[state],
                details: result[state]?.dates[selectedDate],
              });
            });
            tempList[selectedDate] = dataForSelectedDate;

            localStorage.setItem("dataTimeList", JSON.stringify(tempList));
            setCardsList(tempList[selectedDate]);
            setmodifiedCardsList(
              changeSort(displaySearchedStates(tempList[selectedDate]))
            );
          });
      } else {
        setCardsList(finalList[selectedDate]);
        setmodifiedCardsList(
          changeSort(displaySearchedStates(finalList[selectedDate]))
        );
      }
    } else {
      const list = JSON.parse(localStorage.getItem("dataList")) ?? [];
      setCardsList(list);
      setmodifiedCardsList(changeSort(displaySearchedStates(list)));
    }
  }, [selectedDate]);
  useEffect(() => {
    if (modifiedCardsList.length > 0) {
      setmodifiedCardsList(
        changeSort(displaySearchedStates(modifiedCardsList))
      );
    }
  }, [sortingOrder]);

  return (
    <>
      <div className="home__container">
        <div className="home__header">
          <h4>States</h4>

          <SearchInput searchBy="State" />

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              if (!isDistrictSelected) {
                setSelectedDate(e.target.value);
              } else {
                setIsWarning(true);
              }
            }}
          />

          <select
            value={sortingOrder}
            onChange={(e) => setSortingOrder(e.target.value)}
          >
            {!sortingOrder && <option value="0">Select</option>}
            <option value="1">Confirmed Count - Ascending</option>
            <option value="2">Confirmed Count - Descending</option>
            {!selectedDate && (
              <>
                <option value="3">Affected % - Ascending</option>
                <option value="4">Affected % - Descending</option>
                <option value="5">Vaccinated % - Ascending</option>
                <option value="6">Vaccinated % - Descending</option>
              </>
            )}
          </select>
        </div>
        {modifiedCardsList.length > 0 ? (
          <div className="home__states">
            {modifiedCardsList.map((card, idx) => (
              <StateCard {...card} key={card.stateCode + idx} />
            ))}
          </div>
        ) : (
          <NotFound />
        )}
      </div>
      <AlertPopup
        showAlert={isWarning}
        setShowAlert={setIsWarning}
        errorMsg="Please clear the district filter if selected any."
      />
    </>
  );
}

export default Home;
