import React from "react";

const Select = ({ changed, options = [] }) => {
  return (
    <>
      <select onChange={(e) => changed(e)}>
        <option value="">Select a District</option>
        {Object.keys(options).map((district, idx) => (
          <option value={district} key={idx}>
            {district}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
