import React from "react";
import { isMobile } from "react-device-detect";
import update from "immutability-helper";
const EditWorkout = ({
  exercise,
  isKeyList,
  SetValues,
  isValues,
  exerciseIndex,
  logIndex,
}) => {
  return (
    <>
      <div className={"form-group"}>
        <label
          for={`exercise-input-${exerciseIndex}`}
          className={"bmd-label-floating"}
        >
          Name:{" "}
        </label>
        <input
          id={`exercise-input-${exerciseIndex}`}
          className={"form-control"}
          type="text"
          size={isMobile ? 20 : 30}
          placeholder={exercise[isKeyList[exerciseIndex].indexOf("name")]}
          onChange={(e) => {
            const val = e.target.value;
            SetValues((isValues) =>
              update(isValues, {
                [exerciseIndex]: {
                  [isKeyList[exerciseIndex].indexOf("name")]: { $set: val },
                },
              })
            );
          }}
        />
      </div>
      <hr />
      <div className="form-group">
        <label
          for={`exercise-desc-${exerciseIndex}`}
          className={"bmd-label-floating"}
        >
          Description:
        </label>
        <br />
        <textarea
          id={`exercise-desc-${exerciseIndex}`}
          className={"form-control"}
          placeholder={
            exercise[isKeyList[exerciseIndex].indexOf("description")]
          }
          cols={isMobile ? 25 : 50}
          rows={10}
          onChange={(e) => {
            const val = e.target.value;
            SetValues((isValues) =>
              update(isValues, {
                [exerciseIndex]: {
                  [isKeyList[exerciseIndex].indexOf("description")]: {
                    $set: val,
                  },
                },
              })
            );
          }}
        />
      </div>
    </>
  );
};
export default EditWorkout;
