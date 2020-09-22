import React, { useState } from "react";
import {
  OverlayTrigger,
  Tooltip,
  Collapse,
  Pagination,
  Card,
} from "react-bootstrap";
import PaginateResult from "./PaginateResult";
const data = require("../data/exerciseListData.json");

const ExerciseResults = () => {
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
          <Collapse key={index} in={isOpen === index}>
            <div id="collapse-text">
              <ul style={{ listStyleType: "none" }}>
                <li>Muscle Group: {el["Muscle Group"]}</li>
                <li>Level: {el.Level}</li>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id="button-tooltip">
                      <ul style={{ fontSize: "0.8em", paddingLeft: 0 }}>
                        <li>U–Upper Body</li>
                        <li>L–Lower Body</li>
                        <li>C–Core</li>
                      </ul>
                    </Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                    <li {...triggerHandler}>
                      <span ref={ref} style={{ paddingRight: "2rem" }}>
                        U/L/C: {el["U/L/C"]}
                      </span>
                    </li>
                  )}
                </OverlayTrigger>
                <li>Push/Pull: {el["P / P"]}</li>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id="button-tooltip">
                      <ul style={{ fontSize: "0.8em", paddingLeft: 0 }}>
                        <li>FW–Free Weights</li>
                        <li>C–Cables</li>
                        <li>M–Machine</li>
                      </ul>
                    </Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                    <li {...triggerHandler}>
                      <span ref={ref} style={{ paddingRight: "2rem" }}>
                        Modality: {el.Modality}
                      </span>
                    </li>
                  )}
                </OverlayTrigger>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id="button-tooltip">
                      <ul style={{ fontSize: "0.8em", paddingLeft: 0 }}>
                        <li>M–Multi-Joint Exercise</li>
                        <li>S–Single-Joint Exercise</li>
                      </ul>
                    </Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                    <li {...triggerHandler}>
                      <span ref={ref} style={{ paddingRight: "2rem" }}>
                        Joint: {el.Joint}
                      </span>
                    </li>
                  )}
                </OverlayTrigger>
              </ul>
            </div>
          </Collapse>
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
          href={"/exlist/weight_lifting"}
          isOpen={isOpen}
          processedData={processedData}
          SetDisplayData={SetDisplayData}
        />
      </Pagination>
    </div>
  );
};
export default ExerciseResults;
