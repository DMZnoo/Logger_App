import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
const SubmitNewLog = ({ SetNewLog, updateData }) => {
  const { user } = useAuth0();

  return (
    <>
      <Button
        className={"p-2"}
        variant={"outline-primary"}
        onClick={(e) => {
          e.preventDefault();
          if (
            document.querySelector("#new-log-title").value === "" ||
            document.querySelector("#new-log-desc").value === ""
          ) {
            alert("All must be filled!");
          }

          let date = new Date();
          //add new log
          axios
            .post(`/api/logs/create`, {
              username: user.email,
              title: document.querySelector("#new-log-title").value,
              description: document.querySelector("#new-log-desc").value,
              date: date,
            })
            .then((res) => {
              console.log("response");
              updateData(res.data, true, true);
              SetNewLog(null);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        Submit
      </Button>
      <Button
        className={"ml-2 mr-2"}
        variant={"outline-danger"}
        onClick={(e) => {
          e.preventDefault();
          SetNewLog(null);
        }}
      >
        Cancel
      </Button>
    </>
  );
};
export default SubmitNewLog;
