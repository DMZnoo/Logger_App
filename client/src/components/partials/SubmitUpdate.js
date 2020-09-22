import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { MdDone } from "react-icons/md";
const SubmitUpdate = ({
  index,
  workoutIndex = -1,
  isEdit,
  isEditList = null,
  isValues = null,
  isKeys = null,
  isCurrID,
  updateData = null,
  SetEdit,
  target,
}) => {
  const { user } = useAuth0();
  const [isHover, SetHover] = useState(false);
  const handleLog = () => {
    let logTitle = document.querySelector(`#log-title-${index}`);
    let logDesc = document.querySelector(`#log-desc-${index}`);
    if (target === "Log") {
      logTitle =
        logTitle.value === null || logTitle.value.length === 0
          ? logTitle.getAttribute("placeholder")
          : logTitle.value;
      logDesc =
        logDesc.value === null || logDesc.value.length === 0
          ? logDesc.getAttribute("placeholder")
          : logDesc.value;
    } else {
      logTitle = logTitle.innerText;
      logDesc = logDesc.innerText;
    }

    //edit the log
    axios
      .post(`api/logs/update/${isCurrID[index]}`, {
        username: user.email,
        title: logTitle,
        description: logDesc,
      })
      .then((response) => {
        console.log("Log Updated");
        console.log("Updated Log data", response);
        let promises = [];
        Object.values(response.data.exercises).forEach((ex, idx) => {
          console.log("ExerciseID:", ex);
          promises.push(handleWorkout(ex, idx));
        });
        Promise.all(promises).then(() => {
          SetEdit((isEdit) => [
            ...isEdit.slice(0, index),
            false,
            ...isEdit.slice(index + 1),
          ]);
          updateData(response.data, true, false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleWorkout = (exerciseId, index) => {
    console.log("ExerciseId Handling:", exerciseId);
    if (isValues === null && isKeys === null) {
      const data = Object.assign({}, isEditList[index]);
      isValues = Object.values(data[0]);
      isKeys = Object.keys(data[0]);
      console.log(isValues);
      console.log(isKeys);
    }
    axios
      .post(`/api/exercises/update/${exerciseId}`, {
        name: isValues[isKeys.indexOf("name")],
        description: isValues[isKeys.indexOf("description")],
        set: isValues[isKeys.indexOf("set")],
        reps: isValues[isKeys.indexOf("reps")],
        weight: isValues[isKeys.indexOf("weight")],
      })
      .then((res) => {
        console.log("Updated Workout data", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Button
        variant={"outline-success"}
        style={{
          borderRadius: "10vw",
          borderStyle: "hidden",
        }}
        onClick={(e) => {
          e.preventDefault();
          if (workoutIndex === -1) {
            handleLog();
          } else {
            handleWorkout(isValues[isKeys.indexOf("_id")], workoutIndex);
            SetEdit((isEdit) => [
              ...isEdit.slice(0, workoutIndex),
              !isEdit[workoutIndex],
              ...isEdit.slice(workoutIndex + 1),
            ]);
          }
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
          if (workoutIndex !== -1) {
            SetEdit((isEdit) => [
              ...isEdit.slice(0, workoutIndex),
              !isEdit[workoutIndex],
              ...isEdit.slice(workoutIndex + 1),
            ]);
          } else {
            SetEdit((isEdit) => [
              ...isEdit.slice(0, index),
              !isEdit[index],
              ...isEdit.slice(index + 1),
            ]);
          }
        }}
      >
        Cancel
      </Button>
      <hr />
    </>
  );
};
export default SubmitUpdate;
