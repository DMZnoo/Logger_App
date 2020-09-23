import React, { useState, useEffect, createRef, useLayoutEffect } from "react";
import axios from "axios";
import ViewWorkoutList from "./exercises/ViewWorkoutList";
import update from "immutability-helper";
import { Accordion, Card } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import NewLogList from "./actions/create/NewLogList";
import RemoveLogList from "./actions/remove/RemoveLogList";
import { isMobile } from "react-device-detect";
import Swipe from "react-easy-swipe";
import ToggleRemoval from "../partials/ToggleRemoval";
import ToggleEdit from "../partials/ToggleEdit";
import SubmitUpdate from "../partials/SubmitUpdate";
import { useForm } from "react-hook-form";

const ViewLogList = () => {
  const { user, isAuthenticated } = useAuth0();
  const { register, handleSubmit } = useForm();

  const [isShown, SetShown] = useState([]);
  const [isEdit, SetEdit] = useState([]);
  const [isDisplayList, SetDisplayList] = useState([]);
  const [isCurrID, SetCurrID] = useState([]);
  const [isDeleteList, SetDeleteList] = useState([]);
  const [isDelete, SetDelete] = useState(false);
  const [isSwipedRight, SetOnSwipeRight] = useState(false);
  const [isWorkoutList, SetWorkoutList] = useState([]);
  const [isNewExercise, SetNewExercise] = useState(null);
  useEffect(() => {
    if (isAuthenticated) {
      axios
        .post("/api/users/", { username: user.email })
        .then((res) => {
          // console.log(res.data);
          if (res.data !== "New User") {
            fetchData(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const fetchData = (log = null, isUpdate = false, newlog = false) => {
    console.log(log);
    if (!isUpdate) {
      Object.entries(log).forEach((id, index) => {
        let LogDesc = [];
        let logId = -1;
        Object.entries(id[1]).forEach((el, idx) => {
          if (el[0] === "_id") {
            logId = el[1];
            SetCurrID((isCurrID) => [...isCurrID, el[1]]);
          }
          if (el[0] !== "__v") {
            LogDesc.push(el);
          }
        });
        SetWorkoutList((isWorkoutList) => [...isWorkoutList, []]);
        SetWorkoutList((isWorkoutList) =>
          update(isWorkoutList, {
            [isWorkoutList.length - 1]: {
              $push: [logId],
            },
          })
        );
        SetDisplayList((isDisplayList) => [...isDisplayList, LogDesc]);
        SetShown((isShown) => [...isShown, false]);
        SetEdit((isEdit) => [...isEdit, false]);
        SetDeleteList((isDeleteList) => [...isDeleteList, createRef()]);
      });
    } else {
      if (!newlog) {
        let LogDesc = [];
        let exerciseList = [];
        let logId = -1;
        Object.entries(log).forEach((el, idx) => {
          if (el[0] !== "__v") {
            LogDesc.push(el);
            if (el[0] === "_id") {
              logId = el[1];
            }
            if (el[0] === "exercises") {
              exerciseList = el[1];
            }
          }
        });

        let index = isCurrID.indexOf(logId);

        SetDisplayList((isDisplayList) => [
          ...isDisplayList.slice(0, index),
          LogDesc,
          ...isDisplayList.slice(index + 1),
        ]);
      } else {
        let LogDesc = [];
        let logId = -1;
        Object.entries(log).forEach((el, idx) => {
          if (el[0] !== "__v") {
            if (el[0] === "_id") {
              logId = el[1];
              SetCurrID((isCurrID) => [...isCurrID, el[1]]);
            }
            LogDesc.push(el);
          }
        });
        SetWorkoutList((isWorkoutList) => [...isWorkoutList, []]);
        SetWorkoutList((isWorkoutList) =>
          update(isWorkoutList, {
            [isWorkoutList.length - 1]: {
              $push: [logId],
            },
          })
        );
        console.log("New Log:", LogDesc);
        SetDisplayList((isDisplayList) => [...isDisplayList, LogDesc]);
        SetShown((isShown) => [...isShown, false]);
        SetEdit((isEdit) => [...isEdit, false]);
        SetDeleteList((isDeleteList) => [...isDeleteList, createRef()]);
      }
    }
  };

  const onDelete = () => {
    SetDelete(!isDelete);
  };

  const onSwipeRight = (pos, event) => {
    if (isDelete) {
      SetOnSwipeRight(true);
    }
  };
  const onSwipeEnd = (event) => {
    if (isSwipedRight) {
      handleDelete(Number(event.target.id.replace(/log-accordion-/g, "")));
    }
  };

  const handleDelete = async (index) => {
    isDeleteList[index].current.classList.add(
      "animate__animated",
      "animate__fadeOutRight"
    );
    isDeleteList[index].current.style.setProperty("--animate-duration", "0.5s");

    isDeleteList[index].current.addEventListener("animationend", async () => {
      SetCurrID((isCurrID) => [
        ...isCurrID.slice(0, index),
        null,
        ...isCurrID.slice(index + 1),
      ]);
      SetDeleteList((isDeleteList) => [
        ...isDeleteList.slice(0, index),
        null,
        ...isDeleteList.slice(index + 1),
      ]);
      SetDisplayList((isDisplayList) => [
        ...isDisplayList.slice(0, index),
        null,
        ...isDisplayList.slice(index + 1),
      ]);
      SetOnSwipeRight(false);

      let res = await axios.post(`/api/users/delete/${isCurrID[index]}`, {
        username: user.email,
      });
      console.log(res);
    });
  };

  return (
    <>
      <div>
        {isDisplayList.map((el, index) => {
          if (el === null) {
            return <></>;
          }
          return (
            <Swipe
              onSwipeRight={onSwipeRight}
              onSwipeEnd={onSwipeEnd}
              allowMouseEvents={true}
              key={"log-disp" + index}
            >
              <Accordion className={"p-2"} ref={isDeleteList[index]}>
                <Card>
                  {
                    <>
                      <>
                        <RemoveLogList
                          isDelete={isDelete}
                          index={index}
                          deleteData={handleDelete}
                        />
                      </>
                      {el.map((log) => {
                        if (log[0] === "title") {
                          return (
                            <>
                              <Accordion.Toggle
                                as={Card.Header}
                                eventKey="0"
                                id={"log-accordion-" + `${index}`}
                                style={{
                                  transition: "1s",
                                  height: isMobile ? "8vh" : "10vh",
                                  paddingLeft: !isDelete
                                    ? "1vw"
                                    : isMobile
                                    ? "13vw"
                                    : "6vw",
                                }}
                              >
                                {isEdit[index] ? (
                                  <div className={"ml-2 form-group"}>
                                    <label
                                      htmlFor={`log-title-${index}`}
                                      className="bmd-label-floating"
                                    >
                                      New Title:{" "}
                                    </label>
                                    <input
                                      id={`log-title-${index}`}
                                      className={"ml-2 form-control"}
                                      size={10}
                                      placeholder={log[1]}
                                    />
                                  </div>
                                ) : (
                                  <div
                                    className={isMobile ? "p-2" : "ml-3 d-flex"}
                                  >
                                    <h5 id={`log-title-${index}`}>{log[1]}</h5>
                                  </div>
                                )}
                              </Accordion.Toggle>
                            </>
                          );
                        } else if (log[0] === "description") {
                          return (
                            <Accordion.Collapse
                              eventKey={!isDelete ? "0" : "-1"}
                            >
                              <Card.Body>
                                <div className={"p-2"}>
                                  {isEdit[index] ? (
                                    <div className={"form-group"}>
                                      <label
                                        htmlFor={`log-desc-${index}`}
                                        className="bmd-label-floating"
                                      >
                                        Log Description:{" "}
                                      </label>
                                      <hr />
                                      <textarea
                                        id={`log-desc-${index}`}
                                        cols={20}
                                        className={"form-control"}
                                        rows={2}
                                        placeholder={
                                          log[0] === "description" && log[1]
                                        }
                                      />
                                    </div>
                                  ) : (
                                    <p id={`log-desc-${index}`}>
                                      {log[0] === "description" && log[1]}
                                    </p>
                                  )}
                                </div>
                                <hr />
                                <>
                                  <ViewWorkoutList
                                    isShown={isShown}
                                    SetShown={SetShown}
                                    isWorkoutList={isWorkoutList}
                                    SetWorkoutList={SetWorkoutList}
                                    SetNewExercise={SetNewExercise}
                                    isNewExercise={isNewExercise}
                                    index={index}
                                    onLogEdit={isEdit}
                                    isCurrID={isCurrID}
                                    user={user}
                                    updateData={fetchData}
                                  />

                                  {isEdit[index] && (
                                    <SubmitUpdate
                                      index={index}
                                      isCurrID={isCurrID}
                                      isEdit={isEdit}
                                      SetEdit={SetEdit}
                                      isEditList={isWorkoutList}
                                      updateData={fetchData}
                                      target={"Log"}
                                    />
                                  )}
                                </>
                                <ToggleEdit
                                  isEdit={isEdit}
                                  SetEdit={SetEdit}
                                  index={index}
                                  target={"Log"}
                                  multiple={true}
                                />
                              </Card.Body>
                            </Accordion.Collapse>
                          );
                        }
                      })}
                    </>
                  }
                </Card>

                <Card>
                  {el.map((log) => {
                    if (log[0] === "date") {
                      let date = new Date(log[1]);
                      return date.toDateString();
                    }
                  })}
                </Card>
              </Accordion>
            </Swipe>
          );
        })}
      </div>
      <div className={"d-inline-start"}>
        <NewLogList updateData={fetchData} user={user} />
        <ToggleRemoval isDelete={isDelete} onDelete={onDelete} target={"Log"} />
      </div>
    </>
  );
};
export default ViewLogList;
