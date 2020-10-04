import React, { useContext, useState } from "react";
import { isMobile } from "react-device-detect";
import update from "immutability-helper";
import { useForm } from "react-hook-form";
import EditableTable from "../../../../partials/EditableTable";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { MdDone } from "react-icons/md";
import { Context } from "../../../../../context/AppContext";

const EditWorkout = ({ isEdit, SetEdit, exercise }) => {
  const { state, updateExercise } = useContext(Context);
  const [isHover, SetHover] = useState(false);
  const [isWorkoutScheme, SetWorkoutScheme] = useState([
    exercise.set,
    exercise.reps,
    exercise.weight,
  ]);
  const { register, handleSubmit } = useForm();
  const onEdit = (data) => {
    console.log(data);
    data[`exercise-name`] =
      data[`exercise-name`] === "" ? exercise.name : data[`exercise-name`];
    data[`exercise-desc`] =
      data[`exercise-desc`] === ""
        ? exercise.description
        : data[`exercise-desc`];
    updateExercise(exercise._id, {
      name: data[`exercise-name`],
      description: data[`exercise-desc`],
      set: isWorkoutScheme.set,
      reps: isWorkoutScheme.reps,
      weight: isWorkoutScheme.weight,
    });
  };
  return (
    <>
      <form className={"form-group"} onSubmit={handleSubmit(onEdit)}>
        <label for={`exercise-name`} className={"bmd-label-floating"}>
          Name:{" "}
        </label>
        <input
          ref={register}
          name={`exercise-name`}
          className={"form-control"}
          type="text"
          size={isMobile ? 20 : 30}
          placeholder={exercise.name}
        />
        <hr />
        <label for={`exercise-desc`} className={"bmd-label-floating"}>
          Description:
        </label>
        <br />
        <textarea
          ref={register}
          name={`exercise-desc`}
          className={"form-control"}
          placeholder={exercise.description}
          cols={isMobile ? 25 : 50}
          rows={10}
        />
        <EditableTable
          thead={["Set", "Reps", "Weight"]}
          SetData={SetWorkoutScheme}
          style={{
            color: "black",
            width: "inherit",
            fontSize: "1.5vh",
            margin: "0",
          }}
          dataAvailable={isWorkoutScheme}
        />
        <hr />
        <div className={"d-flex d-inline-flex"} style={{ float: "right" }}>
          <Button
            type={"submit"}
            variant={"outline-success"}
            style={{
              borderRadius: "10vw",
              borderStyle: "hidden",
            }}
          >
            <MdDone size={"1.5em"} style={{ color: "green" }} />
            <span
              className="p-2 font-weight-bold"
              onMouseEnter={() => {
                SetHover(!isHover);
              }}
              onMouseOut={() => {
                SetHover(!isHover);
              }}
              style={{ color: isHover ? "white" : "green" }}
            >
              Save?
            </span>
          </Button>
          <Button
            className={"p-2"}
            variant={"outline-danger"}
            style={{
              borderRadius: "10vw",
              borderStyle: "hidden",
            }}
            onClick={(e) => {
              SetEdit(!isEdit);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};
export default EditWorkout;
