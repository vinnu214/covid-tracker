import React, { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";

const SearchInput = ({ searchBy }) => {
  const { setSearchedState } = useContext(AppContext);
  return (
    <input
      type="text"
      placeholder={`Search By ${searchBy}`}
      onChange={(e) => setSearchedState(e.target.value)}
    />
  );
};

export default SearchInput;
