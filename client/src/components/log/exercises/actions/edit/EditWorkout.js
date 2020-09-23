import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import update from "immutability-helper";
import { useForm } from "react-hook-form";
import EditableTable from "../../../../partials/EditableTable";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { MdDone } from "react-icons/md";

const EditWorkout = ({
  exercise,
  isKeys,
  SetValues,
  isValues,
  SetRoutine,
  exerciseIndex,
  logIndex,
  isEdit,
  SetEdit,
}) => {
  const [isHover, SetHover] = useState(false);
  const { register, handleSubmit } = useForm();
  const onEdit = (data) => {
    console.log(data);
    let name = data[`exercise-name-${exerciseIndex}`];
    let desc = data[`exercise-desc-${exerciseIndex}`];
    if (name === "") {
      name = exercise[isKeys[exerciseIndex].indexOf("name")];
    }
    if (desc === "") {
      desc = exercise[isKeys[exerciseIndex].indexOf("description")];
    }
    console.log("name", name);
    console.log("desc", desc);
    const id = exercise[isKeys[exerciseIndex].indexOf("_id")];
    axios
      .post(`/api/exercises/update/${id}`, {
        name: name,
        description: desc,
        set: exercise[isKeys[exerciseIndex].indexOf("set")],
        reps: exercise[isKeys[exerciseIndex].indexOf("reps")],
        weight: exercise[isKeys[exerciseIndex].indexOf("weight")],
      })
      .then((res) => {
        console.log("Updated Workout data", res);
        SetEdit((isEdit) => [
          ...isEdit.slice(0, exerciseIndex),
          !isEdit[exerciseIndex],
          ...isEdit.slice(exerciseIndex + 1),
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <form className={"form-group"} onSubmit={handleSubmit(onEdit)}>
        <label
          for={`exercise-name-${exerciseIndex}`}
          className={"bmd-label-floating"}
        >
          Name:{" "}
        </label>
        <input
          ref={register}
          name={`exercise-name-${exerciseIndex}`}
          className={"form-control"}
          type="text"
          size={isMobile ? 20 : 30}
          placeholder={exercise[isKeys[exerciseIndex].indexOf("name")]}
          onChange={(e) => {
            const val = e.target.value;
            SetValues((isValues) =>
              update(isValues, {
                [exerciseIndex]: {
                  [isKeys[exerciseIndex].indexOf("name")]: { $set: val },
                },
              })
            );
          }}
        />
        <hr />
        <label
          for={`exercise-desc-${exerciseIndex}`}
          className={"bmd-label-floating"}
        >
          Description:
        </label>
        <br />
        <textarea
          ref={register}
          name={`exercise-desc-${exerciseIndex}`}
          className={"form-control"}
          placeholder={exercise[isKeys[exerciseIndex].indexOf("description")]}
          cols={isMobile ? 25 : 50}
          rows={10}
          onChange={(e) => {
            const val = e.target.value;
            SetValues((isValues) =>
              update(isValues, {
                [exerciseIndex]: {
                  [isKeys[exerciseIndex].indexOf("description")]: {
                    $set: val,
                  },
                },
              })
            );
          }}
        />
        <EditableTable
          index={exerciseIndex}
          thead={["Set", "Reps", "Weight"]}
          SetData={SetRoutine}
          style={{
            color: "black",
            width: "inherit",
            fontSize: "1.5vh",
            margin: "0",
          }}
          dataAvailable={[
            exercise[isKeys[exerciseIndex].indexOf("set")],
            exercise[isKeys[exerciseIndex].indexOf("reps")],
            exercise[isKeys[exerciseIndex].indexOf("weight")],
          ]}
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
              SetEdit((isEdit) => [
                ...isEdit.slice(0, exerciseIndex),
                !isEdit[exerciseIndex],
                ...isEdit.slice(exerciseIndex + 1),
              ]);
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
