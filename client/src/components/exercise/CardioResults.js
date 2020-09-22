import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import PaginateResult from "./PaginateResult";
const data = require("../data/cardioListData.json");

const CardioResults = () => {
  const [isOpen, setOpen] = useState(0);

  const processedData = data.map((el, index) => {
    return (
      <Card
        key={el.Exercise}
        onClick={() => {
          setOpen(index);
        }}
        aria-controls="collapse-text"
        aria-expanded={isOpen}
        style={{ background: `#24154a`, backgroundSize: "cover" }}
      >
        <Card.Body>
          <Card.Title>{el.Exercise}</Card.Title>
        </Card.Body>
      </Card>
    );
  });
  const [isDisplayData, SetDisplayData] = useState(processedData.slice(0, 10));

  return (
    <div className="grid">
      <div className="col" id="ex-list-desc">
        {isDisplayData}
      </div>
      <Pagination size="sm">
        <PaginateResult
          href={"/exlist/cardio"}
          isOpen={isOpen}
          processedData={processedData}
          SetDisplayData={SetDisplayData}
        />
      </Pagination>
    </div>
  );
};
export default CardioResults;
