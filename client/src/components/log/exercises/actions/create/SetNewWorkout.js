import React, { useState } from "react";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import EditableTable from "../../../../partials/EditableTable";
import SubmitWorkout from "./SubmitWorkout";
import { Button, Modal } from "react-bootstrap";
import { FcPlus } from "react-icons/fc";
import { useForm } from "react-hook-form";
import axios from "axios";

const SetNewWorkout = ({
  logIndex,
  isShown,
  SetShown,
  isCurrID,
  SetNewExercise,
}) => {
  const [isWorkoutDesc, SetWorkoutDesc] = useState([]);
  const { register, handleSubmit } = useForm();

  const submitNewWorkout = (data) => {
    console.log(data);
    axios
      .post(`api/logs/add/${isCurrID[logIndex]}`, {
        name: data[`new-workout-name-${logIndex}`],
        description: data[`new-workout-desc-${logIndex}`],
        set: isWorkoutDesc[logIndex].set,
        reps: isWorkoutDesc[logIndex].reps,
        weight: isWorkoutDesc[logIndex].weight,
      })
      .then((response) => {
        SetNewExercise(response.data, logIndex);
        toggleNewWorkout(logIndex);
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
  const toggleNewWorkout = (index) => {
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
            <form
              className={"form-group"}
              onSubmit={handleSubmit(submitNewWorkout)}
            >
              <label
                for={`new-workout-name-${logIndex}`}
                className={"bmd-label-floating"}
              >
                Name:
              </label>
              <input
                name={`new-workout-name-${logIndex}`}
                ref={register({ required: true, minLength: 5, maxLength: 20 })}
                size={25}
                className={"form-control"}
              />
              <label
                for={`new-workout-desc-${logIndex}`}
                className={"bmd-label-floating"}
              >
                Description:{" "}
              </label>{" "}
              <textarea
                className={"form-control"}
                rows={5}
                ref={register({ maxLength: 200 })}
                name={`new-workout-desc-${logIndex}`}
              />
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
                <Button
                  type={"submit"}
                  className={isMobile ? "" : "p-2 mt-5"}
                  variant={"outline-primary"}
                >
                  Submit
                </Button>
                <Button
                  className={isMobile ? "" : "ml-2 mt-5"}
                  variant={"outline-danger"}
                  onClick={(e) => {
                    toggleNewWorkout(logIndex);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </BrowserView>
          <MobileView>
            <Modal show={isShown[logIndex]}>
              <Modal.Header closeButton>
                <Modal.Title>Add new workout</Modal.Title>
              </Modal.Header>
              <form
                className={"form-group"}
                onSubmit={handleSubmit(submitNewWorkout)}
              >
                <Modal.Body className={"container"}>
                  <label
                    htmlFor={`new-workout-name-${logIndex}`}
                    className={"bmd-label-floating"}
                  >
                    Name:
                  </label>
                  <input
                    size={25}
                    className={"form-control"}
                    name={`new-workout-name-${logIndex}`}
                  />
                  <label
                    htmlFor={`new-workout-desc-${logIndex}`}
                    className={"bmd-label-floating"}
                  >
                    Description:{" "}
                  </label>{" "}
                  <textarea
                    className={"form-control"}
                    rows={5}
                    name={`new-workout-desc-${logIndex}`}
                  />
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
                  <Button
                    type={"submit"}
                    className={isMobile ? "" : "p-2 mt-5"}
                    variant={"outline-primary"}
                  >
                    Submit
                  </Button>
                  <Button
                    className={isMobile ? "" : "ml-2 mt-5"}
                    variant={"outline-danger"}
                    onClick={(e) => {
                      toggleNewWorkout(logIndex);
                    }}
                  >
                    Cancel
                  </Button>
                </Modal.Footer>
              </form>
            </Modal>
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
