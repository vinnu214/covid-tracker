import React, { useState } from "react";
import { TableData } from "../DetailedView/DetailedView";
import "./Pagination.css";

const Pagination = ({ records }) => {
  const recordPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const pageNavClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const lastRecordIndex = currentPage * recordPerPage;
  const firstRecordIndex = lastRecordIndex - recordPerPage;
  const currentPageRecords = records.slice(firstRecordIndex, lastRecordIndex);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(records.length / recordPerPage); i++) {
    pageNumbers.push(i);
  }
  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <button
        key={number}
        id={number}
        className="Pagination__PageNumber"
        onClick={(e) => pageNavClick(e.target.id)}
      >
        {number}
      </button>
    );
  });
  const renderRecords = currentPageRecords.map((record) => {
    return (
      <TableData
        key={record[0]}
        date={record[0]}
        detailedViewData={record[1]}
      />
    );
  });
  return (
    <>
      <div>{renderRecords}</div>
      <div className="Pagination__Nav">{renderPageNumbers}</div>
    </>
  );
};

export default Pagination;
