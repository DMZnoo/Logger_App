import React, { useContext } from "react";
import { MdRemoveCircle } from "react-icons/md";
import { Context } from "../../../../../context/AppContext";

const RemoveWorkout = ({ logIndex, textColor = null, exerciseId }) => {
  const { deleteExercise } = useContext(Context);
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
            deleteExercise(logIndex, exerciseId);
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
