import React, { useState, useContext } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import ToggleEdit from "../../../partials/ToggleEdit";
import { useForm } from "react-hook-form";
import { MdDone } from "react-icons/md";
import { Context } from "../../../../context/AppContext";
import { useLocation } from "react-router";

const EditLogList = ({ logData, isEdit, SetEdit, user }) => {
  const location = useLocation();
  const { register, handleSubmit } = useForm();
  const [isHover, SetHover] = useState(false);
  const { updateLogs } = useContext(Context);
  const [isLog, SetLog] = useState(null);
  const submitEditLog = (data) => {
    logData.title =
      data[`log-title`] === "" ? logData.title : data[`log-title`];
    logData.description =
      data[`log-desc`] === "" ? logData.description : data[`log-desc`];

    updateLogs(logData._id, {
      username: user.email,
      title: logData.title,
      description: logData.description,
    });
    location.state = { logData: logData };
    SetEdit(!isEdit);
  };
  return (
    <div className={"p-2"}>
      <form className={"form-group"} onSubmit={handleSubmit(submitEditLog)}>
        <>
          <label htmlFor={`log-title`} className="bmd-label-floating">
            New Title:{" "}
          </label>
          <input
            ref={register}
            name={`log-title`}
            className={"ml-2 form-control"}
            size={10}
            placeholder={logData.title}
          />
          <label htmlFor={`log-desc`} className="bmd-label-floating">
            Log Description:{" "}
          </label>
          <hr />
          <textarea
            ref={register}
            name={`log-desc`}
            cols={20}
            className={"form-control"}
            rows={2}
            placeholder={logData.description}
          />
          <hr />
          <>
            {/*<ViewWorkoutList*/}
            {/*  isShown={isShown}*/}
            {/*  SetShown={SetShown}*/}
            {/*  isWorkoutList={isWorkoutList}*/}
            {/*  SetWorkoutList={SetWorkoutList}*/}
            {/*  SetNewExercise={SetNewExercise}*/}
            {/*  isNewExercise={isNewExercise}*/}
            {/*  index={index}*/}
            {/*  onLogEdit={isEdit}*/}
            {/*  isCurrID={isCurrID}*/}
            {/*  user={user}*/}
            {/*  updateData={fetchData}*/}
            {/*/>*/}

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
                  onClick={() => {
                    SetLog(logData);
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
          </>
          {/*<ToggleEdit*/}
          {/*  isEdit={isEdit}*/}
          {/*  SetEdit={SetEdit}*/}
          {/*  index={index}*/}
          {/*  target={"Log"}*/}
          {/*  multiple={true}*/}
          {/*/>*/}
        </>
        <div>{new Date(logData.date).toDateString()}</div>
      </form>
    </div>
  );
};
export default EditLogList;
