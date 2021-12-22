import React, { useEffect, useState } from "react";
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
  const PageNumbersDesign = pageNumbers.map((number) => {
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
  useEffect(() => {
    renderPagination(currentPage);
  }, [currentPage]);
  const renderPagination = (pageNum) => {
    pageNum = parseInt(pageNum);
    return (
      <>
        {pageNum !== 1 && <>{PageNumbersDesign.slice(0, 1)}..............</>}
        {pageNum < PageNumbersDesign.length / 2 - 1 && (
          <>
            {PageNumbersDesign.slice(pageNum - 1, pageNum + 2)}
            ....................
          </>
        )}
        {(pageNum < PageNumbersDesign.length / 2 + 1 ||
          pageNum > PageNumbersDesign.length / 2 + 2) && (
          <>
            {PageNumbersDesign.slice(
              PageNumbersDesign.length / 2,
              PageNumbersDesign.length / 2 + 2
            )}
          </>
        )}
        {pageNum > PageNumbersDesign.length / 2 && (
          <>
            ....................
            {PageNumbersDesign.slice(pageNum - 1, pageNum + 2)}
          </>
        )}

        {pageNum !== PageNumbersDesign.length && (
          <>
            ....................
            {PageNumbersDesign.slice(
              PageNumbersDesign.length - 1,
              PageNumbersDesign.length
            )}
          </>
        )}
      </>
    );
  };
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
      <div className="Pagination__Nav">{renderPagination(currentPage)}</div>
    </>
  );
};

export default Pagination;
