import React from "react";
import { FaRegEdit } from "react-icons/fa";

const ToggleEdit = ({
  isEdit,
  index = -1,
  SetEdit,
  target,
  textColor = null,
  multiple = false,
}) => {
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
              if (multiple) {
                SetEdit((isEdit) => [
                  ...isEdit.slice(0, index),
                  !isEdit[index],
                  ...isEdit.slice(index + 1),
                ]);
              } else {
                SetEdit(!isEdit);
              }
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
