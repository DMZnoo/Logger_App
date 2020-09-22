import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { Link, useLocation } from "react-router-dom";

const PaginateResult = ({ href, processedData, SetDisplayData, isOpen }) => {
  const location = useLocation();
  const pages = [];
  const [isCurrPage, SetCurrPage] = useState(1);
  const [isPageRange, SetPageRange] = useState([1, 10]);
  useEffect(() => {
    SetCurrPage(Number(location.pathname.match(/\d+/g)));
    SetDisplayData(processedData.slice(isCurrPage * 10 - 10, isCurrPage * 10));
    let baseNum = Math.trunc(isCurrPage / 10) + 1;
    SetPageRange([baseNum * 10 - 9, baseNum * 10]);
  }, [isOpen, isCurrPage, location]);
  pages.push(
    <li className={"page-item"}>
      <Link className={"page-link"} to={`${href}/1`}>
        <span aria-hidden="true">«</span>
        <span className="sr-only">First</span>
      </Link>
    </li>
  );
  if (isPageRange[0] - 1 > 0)
    pages.push(
      <Pagination.Prev
        onClick={() => {
          SetPageRange([isPageRange[0] - 10, isPageRange[1] - 10]);
        }}
      />
    );

  if (isPageRange[0] > 3) {
    pages.push(<Pagination.Ellipsis />);
  }
  for (let i = isPageRange[0]; i <= isPageRange[1]; i++) {
    if (
      i <=
      Math.trunc(processedData.length / 10) +
        (processedData.length % 10 >= 1 ? 1 : 0)
    ) {
      if (i === isCurrPage) {
        pages.push(
          <li className={"page-item active"} key={i}>
            <Link className={"page-link"} to={`${href}/${i}/`}>
              {i}
            </Link>
          </li>
        );
      } else {
        pages.push(
          <li className={"page-item"} key={i}>
            <Link className={"page-link"} to={`${href}/${i}/`}>
              {i}
            </Link>
          </li>
        );
      }
    }
  }

  if (
    isPageRange[1] <
    Math.trunc(processedData.length / 10) +
      (processedData.length % 10 >= 1 ? 1 : 0)
  ) {
    pages.push(<Pagination.Ellipsis key={"page-ellipsis"} />);
    pages.push(
      <Pagination.Next
        onClick={() => {
          SetPageRange([isPageRange[0] + 10, isPageRange[1] + 10]);
        }}
      />
    );
  }
  pages.push(
    <li className={"page-item"}>
      <Link
        className={"page-link"}
        to={`${href}/${
          Math.trunc(processedData.length / 10) +
          (processedData.length % 10 >= 1 ? 1 : 0)
        }`}
      >
        <span aria-hidden="true">»</span>
        <span className="sr-only">Last</span>
      </Link>
    </li>
  );

  return pages;
};
export default PaginateResult;
