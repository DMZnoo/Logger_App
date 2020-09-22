import React from "react";
import { Button } from "react-bootstrap";
import { isMobile } from "react-device-detect";
const SubmitWorkout = ({ submitNewWorkout, cancelNewWorkout, index }) => {
  return (
    <>
      <Button
        className={isMobile ? "" : "p-2 mt-5"}
        variant={"outline-primary"}
        onClick={(e) => {
          submitNewWorkout(e, index);
        }}
      >
        Submit
      </Button>
      <Button
        className={isMobile ? "" : "ml-2 mt-5"}
        variant={"outline-danger"}
        onClick={(e) => {
          cancelNewWorkout(e, index);
        }}
      >
        Cancel
      </Button>
    </>
  );
};
export default SubmitWorkout;
