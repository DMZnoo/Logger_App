import React, { useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import EditableTable from "../../../../partials/EditableTable";
import SubmitWorkout from "./SubmitWorkout";
import { Modal } from "react-bootstrap";
import { FcPlus } from "react-icons/fc";
import axios from "axios";

const SetNewWorkout = ({
  logIndex,
  isShown,
  SetShown,
  isCurrID,
  SetNewExercise,
}) => {
  const [isWorkoutDesc, SetWorkoutDesc] = useState([]);
  const submitNewWorkout = (e, idx) => {
    let exerciseName = document.querySelector(`#new-workout-name-${idx}`).value;
    let exerciseDesc = document.querySelector(`#new-workout-desc-${idx}`).value;
    if (exerciseName === null || exerciseName === "") {
      alert("Please provide the name");
      return;
    }
    axios
      .post(`api/logs/add/${isCurrID[idx]}`, {
        name: exerciseName,
        description: exerciseDesc,
        set: isWorkoutDesc[idx].set,
        reps: isWorkoutDesc[idx].reps,
        weight: isWorkoutDesc[idx].weight,
      })
      .then((response) => {
        SetNewExercise(response.data, idx);
        toggleNewWorkout(e, idx);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const SetExerciseDescription = (state, idx) => {
    SetWorkoutDesc((isWorkoutDesc) => [
      ...isWorkoutDesc.slice(0, idx),
      state,
      ...isWorkoutDesc.slice(idx + 1),
    ]);
  };
  const toggleNewWorkout = (e, index) => {
    e.preventDefault();
    SetShown((isShown) => [
      ...isShown.slice(0, index),
      !isShown[index],
      ...isShown.slice(index + 1),
    ]);
  };
  return (
    <>
      {isShown[logIndex] && (
        <>
          <BrowserView>
            <div className={"form-group"}>
              <label
                for={`new-workout-name-${logIndex}`}
                className={"bmd-label-floating"}
              >
                Name:
              </label>
              <input
                size={25}
                className={"form-control"}
                id={`new-workout-name-${logIndex}`}
              />
            </div>
            <div className={"form-group"}>
              <label
                for={`new-workout-desc-${logIndex}`}
                className={"bmd-label-floating"}
              >
                Description:{" "}
              </label>{" "}
              <textarea
                className={"form-control"}
                rows={5}
                id={`new-workout-desc-${logIndex}`}
              />
            </div>
            <div className={"container"} style={{ overflowX: "auto" }}>
              <EditableTable
                index={logIndex}
                thead={["Set", "Reps", "Weight"]}
                SetData={SetExerciseDescription}
                style={{
                  color: "black",
                  width: "100%",
                }}
                dataAvailable={[[1], [5], [5]]}
              />
              <div
                className={"d-flex d-inline-flex"}
                style={{ float: "right" }}
              >
                <SubmitWorkout
                  submitNewWorkout={submitNewWorkout}
                  cancelNewWorkout={toggleNewWorkout}
                  index={logIndex}
                />
              </div>
            </div>
          </BrowserView>
          <MobileView>
            <div className={"container"} style={{ overflowX: "scroll" }}>
              <Modal show={isShown[logIndex]}>
                <Modal.Header closeButton>
                  <Modal.Title>Add new workout</Modal.Title>
                </Modal.Header>
                <Modal.Body className={"container"}>
                  <div className={"form-group"}>
                    <label
                      htmlFor={`new-workout-name-${logIndex}`}
                      className={"bmd-label-floating"}
                    >
                      Name:
                    </label>
                    <input
                      size={25}
                      className={"form-control"}
                      id={`new-workout-name-${logIndex}`}
                    />
                  </div>
                  <div className={"form-group"}>
                    <label
                      htmlFor={`new-workout-desc-${logIndex}`}
                      className={"bmd-label-floating"}
                    >
                      Description:{" "}
                    </label>{" "}
                    <textarea
                      className={"form-control"}
                      rows={5}
                      id={`new-workout-desc-${logIndex}`}
                    />
                  </div>
                  <EditableTable
                    index={logIndex}
                    thead={["Set", "Reps", "Weight"]}
                    SetData={SetExerciseDescription}
                    style={{
                      color: "black",
                      width: "100%",
                    }}
                    dataAvailable={[[1], [5], [5]]}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <SubmitWorkout
                    submitNewWorkout={submitNewWorkout}
                    cancelNewWorkout={toggleNewWorkout}
                    index={logIndex}
                  />
                </Modal.Footer>
              </Modal>
            </div>
          </MobileView>
        </>
      )}
      <div className={"d-flex d-inline-flex"} style={{ textAlign: "center" }}>
        <button
          id={logIndex}
          style={{
            borderRadius: "10vw",
            background: "none",
            borderStyle: "hidden",
          }}
          onClick={(e) => {
            e.preventDefault();
            SetShown((isShown) => [
              ...isShown.slice(0, logIndex),
              !isShown[logIndex],
              ...isShown.slice(logIndex + 1),
            ]);
          }}
        >
          <FcPlus size={"2em"} />
          <span className="p-2 font-weight-bold" style={{ color: "black" }}>
            Add New Exercise
          </span>
        </button>
        <br />
      </div>
    </>
  );
};
export default SetNewWorkout;
