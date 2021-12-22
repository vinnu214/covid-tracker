import React, { useEffect, useState } from "react";
import "./App.css";
import Routes from "./Routes";
import { AppContext } from "./Contexts/AppContext";
function App() {
  const [cardsList, setCardsList] = useState([]);
  const [modifiedCardsList, setmodifiedCardsList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchedState, setSearchedState] = useState("");
  const [isDistrictSelected, setIsDistrictSelected] = useState(false);
  const [sortingOrder, setSortingOrder] = useState(0);
  const displaySearchedStates = (listOfStates) => {
    const temp = listOfStates.filter((card) =>
      card?.stateName?.toLowerCase().includes(searchedState.toLowerCase())
    );
    return temp;
  };

  const changeSort = (listToBeSorted) => {
    let sortedList = Object.values(listToBeSorted);
    switch (sortingOrder) {
      case "1":
        sortedList.sort(
          (a, b) => a?.details?.total?.confirmed - b?.details?.total?.confirmed
        );
        break;
      case "2":
        sortedList.sort(
          (a, b) => b?.details?.total?.confirmed - a?.details?.total?.confirmed
        );
        break;
      case "3":
        sortedList.sort((a, b) => a.affected - b.affected);
        break;
      case "4":
        sortedList.sort((a, b) => b.affected - a.affected);
        break;
      case "5":
        sortedList.sort((a, b) => a.vaccinated - b.vaccinated);
        break;
      case "6":
        sortedList.sort((a, b) => b.vaccinated - a.vaccinated);
        break;
      default:
        sortedList.sort((a, b) => {
          let state1 = a?.stateName?.toLowerCase(),
            state2 = b?.stateName?.toLowerCase();

          if (state1 < state2) {
            return -1;
          }
          if (state1 > state2) {
            return 1;
          }
          return 0;
        });
        break;
    }
    return sortedList;
  };
  useEffect(() => {
    if (cardsList.length > 0) {
      setmodifiedCardsList(changeSort(displaySearchedStates(cardsList)));
    }
    // eslint-disable-next-line
  }, [searchedState]);
  return (
    <div className="App">
      <AppContext.Provider
        value={{
          cardsList,
          modifiedCardsList,
          searchedState,
          selectedDate,
          sortingOrder,
          isDistrictSelected,
          setSortingOrder,
          setSelectedDate,
          setSearchedState,
          setmodifiedCardsList,
          setCardsList,
          setIsDistrictSelected,
          displaySearchedStates,
          changeSort,
        }}
      >
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
