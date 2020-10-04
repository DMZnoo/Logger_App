import React, { useState, useEffect, createRef, useContext } from "react";
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
import EditLogList from "./actions/edit/EditLogList";
import { Context } from "../../context/AppContext";
import Loading from "../Loading";
import { Link, useLocation } from "react-router-dom";
import ViewLogDescription from "./ViewLogDescription";
import { LinkContainer } from "react-router-bootstrap";

const ViewLogList = () => {
  const { user, isAuthenticated } = useAuth0();
  const { state, readLogs, deleteLogs } = useContext(Context);
  const { register, handleSubmit } = useForm();
  const [isDelete, SetDelete] = useState(false);
  const [isSwipedRight, SetOnSwipeRight] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (isAuthenticated) {
      readLogs({ username: user.email });
    }
  }, []);

  const onDelete = () => {
    SetDelete(!isDelete);
  };

  const onSwipeRight = () => {
    if (isDelete) {
      SetOnSwipeRight(true);
    }
  };
  const onSwipeEnd = (index, logId) => {
    if (isSwipedRight) {
      handleDelete(index, logId);
    }
  };

  const handleDelete = (index, logId) => {
    state.refToLogs[index].current.classList.add(
      "animate__animated",
      "animate__fadeOutRight"
    );
    state.refToLogs[index].current.style.setProperty(
      "--animate-duration",
      "0.5s"
    );

    state.refToLogs[index].current.addEventListener("animationend", () => {
      SetOnSwipeRight(false);
      deleteLogs(logId, user.email);
    });
  };

  if (state.loading) {
    return <Loading />;
  } else {
    return (
      <>
        <div>
          {state.logs.map((log, index) => {
            return (
              <div>
                <Swipe
                  onSwipeRight={onSwipeRight}
                  onSwipeEnd={() => onSwipeEnd(index, log._id)}
                  allowMouseEvents={true}
                  key={"log-disp" + index}
                >
                  <div
                    className={"mb-3"}
                    style={{ borderRadius: "2vh" }}
                    ref={state.refToLogs[index]}
                  >
                    <Card className={"position-relative"}>
                      <div
                        style={{
                          display: "flex",
                          position: "relative",
                          flexDirection: "row",
                          flexWrap: "wrap",
                        }}
                      >
                        <RemoveLogList
                          isDelete={isDelete}
                          logId={log._id}
                          index={index}
                          handleDelete={handleDelete}
                        />
                        <Link
                          to={{
                            pathname: "/logs/description",
                            hash: log.title,
                            state: { logId: log._id },
                          }}
                        >
                          <h5
                            className={"p-2 mt-2"}
                            style={{
                              position: "relative",
                              transition: "1s",
                              marginLeft: !isDelete ? "1vh" : "5vh",
                            }}
                          >
                            {log.title}
                          </h5>
                        </Link>
                      </div>
                      <Card.Footer>
                        {new Date(log.date).toDateString()}
                      </Card.Footer>
                    </Card>
                  </div>
                </Swipe>
              </div>
            );
          })}
        </div>
        <div className={"d-inline-start"}>
          <NewLogList user={user} />
          <ToggleRemoval
            isDelete={isDelete}
            onDelete={onDelete}
            target={"Log"}
          />
        </div>
      </>
    );
  }
};
export default ViewLogList;
