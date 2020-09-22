import React from "react";
import { MdRemoveCircle, MdDone } from "react-icons/md";
const SubmitRemoveLog = ({ isDelete, onDelete }) => {
  return (
    <>
      <div className={"d-flex d-inline-flex"}>
        <button
          style={{
            borderRadius: "10vw",
            background: "none",
            borderStyle: "hidden",
            borderColor: "none",
          }}
          onClick={onDelete}
        >
          {!isDelete ? (
            <>
              <MdRemoveCircle
                size={"2em"}
                style={{ color: "red", outline: "none" }}
              />
              <span
                className="ml-2 p-2 font-weight-bold"
                style={{ color: "white" }}
              >
                Remove Log
              </span>
            </>
          ) : (
            <>
              <MdDone
                size={"2em"}
                style={{ color: "orange", outline: "none" }}
              />
              <span
                className="ml-2 p-2 font-weight-bold"
                style={{ color: "white" }}
              >
                Done?
              </span>
            </>
          )}
        </button>
        <br />
      </div>
    </>
  );
};
export default SubmitRemoveLog;
