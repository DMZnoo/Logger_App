import React from "react";
import { FaRegEdit } from "react-icons/fa";

const ToggleEdit = ({
  isEdit,
  SetEdit,
  target,
  textColor = null,
  multiple = false,
}) => {
  return (
    <>
      {!isEdit && (
        <div className={"d-flex d-inline-flex"} style={{ textAlign: "center" }}>
          <button
            style={{
              borderRadius: "10vw",
              background: "none",
              borderStyle: "hidden",
            }}
            onClick={() => {
              SetEdit(!isEdit);
            }}
          >
            <>
              <FaRegEdit size={"2em"} color={"orange"} />
              <span
                className="d-flex d-inline-flex p-2 font-weight-bold"
                style={{ color: "black" }}
              >
                Edit {target}
              </span>
            </>
          </button>
          <br />
        </div>
      )}
    </>
  );
};
export default ToggleEdit;
