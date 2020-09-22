import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDone } from "react-icons/md";

const ToggleEditLog = ({ isEdit, SetEdit, index }) => {
  return (
    <>
      {!isEdit[index] && (
        <div className={"d-flex d-inline-flex"} style={{ textAlign: "center" }}>
          <button
            id={index}
            style={{
              borderRadius: "10vw",
              background: "none",
              borderStyle: "hidden",
            }}
            onClick={() => {
              SetEdit((isEdit) => [
                ...isEdit.slice(0, index),
                !isEdit[index],
                ...isEdit.slice(index + 1),
              ]);
            }}
          >
            <>
              <FaRegEdit size={"2em"} color={"orange"} />
              <span className="p-2 font-weight-bold" style={{ color: "black" }}>
                Edit Log
              </span>
            </>
          </button>
          <br />
        </div>
      )}
    </>
  );
};
export default ToggleEditLog;
