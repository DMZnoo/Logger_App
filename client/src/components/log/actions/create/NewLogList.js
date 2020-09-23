import React, { useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { FcPlus } from "react-icons/fc";
import { useForm } from "react-hook-form";
import axios from "axios";

const NewLogList = ({ updateData, user }) => {
  const [isNewLog, SetNewLog] = useState(null);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    //add new log
    await axios
      .post(`/api/logs/create`, {
        username: user.email,
        title: data["new-log-title"],
        description: data["new-log-desc"],
        date: new Date(),
      })
      .then((res) => {
        console.log("response");
        updateData(res.data, true, true);
        SetNewLog(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {isNewLog}
      <div className={"d-flex d-inline-flex"}>
        <button
          style={{
            borderRadius: "10vw",
            background: "none",
            borderStyle: "hidden",
          }}
          onClick={(e) => {
            e.preventDefault();
            SetNewLog(
              <>
                <Accordion className={"p-2"} defaultActiveKey="0">
                  <Card style={{ overflowX: "scroll" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Card.Header>
                        <label
                          for={"new-log-title"}
                          className={"bmd-label-floating"}
                        >
                          Title:
                        </label>
                        <input
                          name={"new-log-title"}
                          ref={register({ required: true, maxLength: 20 })}
                          size={25}
                          className={"form-control"}
                        />
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className={"form-group"}>
                            <label
                              for={"new-log-desc"}
                              className={"bmd-label-floating"}
                            >
                              Description:{" "}
                            </label>{" "}
                            <textarea
                              name={"new-log-desc"}
                              ref={register({ maxLength: 150 })}
                              className={"form-control"}
                              rows={10}
                            />
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                      <div
                        className={"d-flex d-inline-start"}
                        style={{ float: "right" }}
                      >
                        <Button
                          className={"p-2"}
                          variant={"outline-primary"}
                          type="submit"
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
                      </div>
                    </form>
                  </Card>
                </Accordion>
              </>
            );
          }}
        >
          <>
            <FcPlus size={"2em"} />
            <span
              className="ml-2 p-2 font-weight-bold"
              style={{ color: "white" }}
            >
              Add Log
            </span>
          </>
        </button>
        <br />
      </div>
    </>
  );
};
export default NewLogList;
