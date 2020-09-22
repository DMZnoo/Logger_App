import React from "react";
import { MdRemoveCircle, MdDone } from "react-icons/md";
import { Table } from "react-bootstrap";
const ToggleRemoval = ({
  isDelete,
  onDelete,
  target,
  textColor = null,
  multiple = false,
  index = -1,
}) => {
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
          onClick={(e) => {
            if (!multiple) onDelete();
            else
              onDelete((isDelete) => [
                ...isDelete.slice(0, index),
                !isDelete[index],
                ...isDelete.slice(index + 1),
              ]);
          }}
        >
          {!isDelete ? (
            <>
              <MdRemoveCircle
                size={"2em"}
                style={{ color: "red", outline: "none" }}
              />
              <span
                className="p-2 font-weight-bold"
                style={textColor !== null ? textColor : { color: "white" }}
              >
                Remove {target}
              </span>
            </>
          ) : (
            <>
              <MdDone
                size={"2em"}
                style={{ color: "orange", outline: "none" }}
              />
              <span
                className="p-2 font-weight-bold"
                style={textColor !== null ? textColor : { color: "white" }}
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
export default ToggleRemoval;
