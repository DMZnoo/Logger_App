import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { MdDone } from "react-icons/md";
const SubmitEditLog = ({
  index,
  isEditList,
  isEdit,
  isCurrID,
  updateData,
  SetEdit,
}) => {
  const { user } = useAuth0();
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
          let date = new Date();
          let logTitle = document.querySelector(`#edit-log-title-${index}`);
          let logDesc = document.querySelector(`#edit-log-desc-${index}`);
          logTitle =
            logTitle.value === null || logTitle.value.length === 0
              ? logTitle.getAttribute("placeholder")
              : logTitle.value;
          logDesc =
            logDesc.value === null || logDesc.value.length === 0
              ? logDesc.getAttribute("placeholder")
              : logDesc.value;

          //edit the log
          axios
            .patch(`api/logs/update/${isCurrID[index]}`, {
              username: user.email,
              title: logTitle,
              description: logDesc,
              exercises: isEditList[0][1],
              date: date,
            })
            .then((response) => {
              console.log("Log Updated");
              SetEdit((isEdit) => [
                ...isEdit.slice(0, index),
                false,
                ...isEdit.slice(index + 1),
              ]);
              updateData(isCurrID[index]);
            })
            .catch((err) => {
              console.log(err);
            });
          SetEdit((isEdit) => [
            ...isEdit.slice(0, index),
            !isEdit[index],
            ...isEdit.slice(index + 1),
          ]);
        }}
      >
        <MdDone size={"2em"} style={{ color: "green" }} />
        <span className="p-2 font-weight-bold" style={{ color: "black" }}>
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
            ...isEdit.slice(0, index),
            !isEdit[index],
            ...isEdit.slice(index + 1),
          ]);
        }}
      >
        Cancel
      </Button>
    </>
  );
};
export default SubmitEditLog;
