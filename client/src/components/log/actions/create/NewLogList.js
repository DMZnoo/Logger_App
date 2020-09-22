import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import SubmitNewLog from "./SubmitNewLog";
import { FcPlus } from "react-icons/fc";
import { isMobile } from "react-device-detect";
const NewLogList = ({ updateData }) => {
  const [isNewLog, SetNewLog] = useState(null);
  return (
    <>
      {isNewLog}
      <div className={"d-flex d-inline-flex"}>
        <button
          style={{
            borderRadius: "10vw",
            background: "none",
            borderStyle: "hidden",
          }}
          onClick={(e) => {
            e.preventDefault();
            SetNewLog(
              <>
                <Accordion className={"p-2"} defaultActiveKey="0">
                  <Card style={{ overflowX: "scroll" }}>
                    <Card.Header>
                      <label
                        for={`new-log-title`}
                        className={"bmd-label-floating"}
                      >
                        Title:
                      </label>
                      <input
                        size={25}
                        className={"form-control"}
                        id={"new-log-title"}
                      />
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <div className={"form-group"}>
                          <label
                            for={"new-log-desc"}
                            className={"bmd-label-floating"}
                          >
                            Description:{" "}
                          </label>{" "}
                          <textarea
                            className={"form-control"}
                            rows={10}
                            id={"new-log-desc"}
                          />
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
                <div
                  className={"d-flex d-inline-start"}
                  style={{ float: "right" }}
                >
                  <SubmitNewLog SetNewLog={SetNewLog} updateData={updateData} />
                </div>
              </>
            );
          }}
        >
          <>
            <FcPlus size={"2em"} />
            <span
              className="ml-2 p-2 font-weight-bold"
              style={{ color: "white" }}
            >
              Add Log
            </span>
          </>
        </button>
        <br />
      </div>
    </>
  );
};
export default NewLogList;
