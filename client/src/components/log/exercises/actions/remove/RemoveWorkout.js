import React from "react";
import { MdRemoveCircle } from "react-icons/md";
import axios from "axios";
import update from "immutability-helper";

const RemoveWorkout = ({
  exercise,
  logIndex,
  isCurrID,
  updateData,
  textColor = null,
  exerciseIndex,
  user,
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
            e.preventDefault();
            console.log("deleting", exercise);
            console.log("at", isCurrID[logIndex]);

            axios
              .put(`/api/logs/delete/${isCurrID[logIndex]}`, {
                exerciseID: exercise,
              })
              .then((response) => {
                console.log(response);
                updateData(logIndex, exerciseIndex);
              })
              .catch((err) => {
                console.log("ERROR:", err);
              });
          }}
        >
          <>
            <MdRemoveCircle
              size={"2em"}
              style={{ color: "red", outline: "none" }}
            />
            <span
              className="p-2 font-weight-bold d-flex d-inline-flex"
              style={textColor !== null ? textColor : { color: "white" }}
            >
              Remove Exercise
            </span>
          </>
        </button>
        <br />
      </div>
    </>
  );
};
export default RemoveWorkout;
