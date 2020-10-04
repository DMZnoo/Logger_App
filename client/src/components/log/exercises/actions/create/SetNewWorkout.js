import React, { useContext, useState } from "react";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import EditableTable from "../../../../partials/EditableTable";
import { Button, Modal } from "react-bootstrap";
import { FcPlus } from "react-icons/fc";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Context } from "../../../../../context/AppContext";

const SetNewWorkout = ({ logId }) => {
  const { createExercise } = useContext(Context);
  const [isShown, SetShown] = useState(false);
  const [isWorkoutDesc, SetWorkoutDesc] = useState([]);
  const { register, handleSubmit } = useForm();

  const submitNewWorkout = (data) => {
    createExercise(logId, {
      name: data[`new-workout-name`],
      description: data[`new-workout-desc`],
      set: isWorkoutDesc.set,
      reps: isWorkoutDesc.reps,
      weight: isWorkoutDesc.weight,
    });
  };
  const SetExerciseDescription = (state) => {
    SetWorkoutDesc(state);
  };
  return (
    <div className={"container"}>
      {isShown && (
        <>
          <BrowserView>
            <form
              className={"form-group"}
              onSubmit={handleSubmit(submitNewWorkout)}
            >
              <label for={`new-workout-name`} className={"bmd-label-floating"}>
                Name:
              </label>
              <input
                name={`new-workout-name`}
                ref={register({ required: true, minLength: 5, maxLength: 20 })}
                size={25}
                className={"form-control"}
              />
              <label for={`new-workout-desc`} className={"bmd-label-floating"}>
                Description:{" "}
              </label>{" "}
              <textarea
                className={"form-control"}
                rows={5}
                ref={register({ maxLength: 200 })}
                name={`new-workout-desc`}
              />
              <EditableTable
                thead={["Set", "Reps", "Weight"]}
                SetData={SetExerciseDescription}
                style={{
                  color: "black",
                  width: "100%",
                }}
                dataAvailable={[[1], [5], [5]]}
              />
              <div style={{ float: "right" }}>
                <Button
                  type={"submit"}
                  className={"p-2 mt-2"}
                  variant={"outline-primary"}
                >
                  Submit
                </Button>
                <Button
                  className={"p-2 ml-2 mt-2"}
                  variant={"outline-danger"}
                  onClick={(e) => {
                    SetShown(!isShown);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </BrowserView>
          <MobileView>
            <Modal show={isShown}>
              <Modal.Header closeButton>
                <Modal.Title>Add new workout</Modal.Title>
              </Modal.Header>
              <form
                className={"form-group"}
                onSubmit={handleSubmit(submitNewWorkout)}
              >
                <Modal.Body className={"container"}>
                  <label
                    htmlFor={`new-workout-name`}
                    className={"bmd-label-floating"}
                  >
                    Name:
                  </label>
                  <input
                    size={25}
                    className={"form-control"}
                    name={`new-workout-name`}
                  />
                  <label
                    htmlFor={`new-workout-desc`}
                    className={"bmd-label-floating"}
                  >
                    Description:{" "}
                  </label>{" "}
                  <textarea
                    className={"form-control"}
                    rows={5}
                    name={`new-workout-desc`}
                  />
                  <EditableTable
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
                      SetShown(!isShown);
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
          style={{
            borderRadius: "10vw",
            background: "none",
            borderStyle: "hidden",
          }}
          onClick={() => {
            SetShown(!isShown);
          }}
        >
          <FcPlus size={"2em"} />
          <span className="p-2 font-weight-bold" style={{ color: "black" }}>
            Add New Exercise
          </span>
        </button>
        <br />
      </div>
    </div>
  );
};
export default SetNewWorkout;
