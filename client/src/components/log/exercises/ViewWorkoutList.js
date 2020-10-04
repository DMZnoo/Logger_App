import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ToggleEdit from "../../partials/ToggleEdit";
import EditWorkout from "./actions/edit/EditWorkout";
import RemoveWorkout from "./actions/remove/RemoveWorkout";
import SetNewWorkout from "./actions/create/SetNewWorkout";
import { Context } from "../../../context/AppContext";

const ViewWorkoutList = ({ logId }) => {
  const [isEdit, SetEdit] = useState(false);
  const { state } = useContext(Context);
  if (state.loading) {
    return <></>;
  } else {
    return (
      <>
        {state.exercises.map((el, exerciseIndex) => {
          return (
            <>
              <div className={"container"}>
                <>
                  {isEdit ? (
                    <EditWorkout
                      isEdit={isEdit}
                      SetEdit={SetEdit}
                      exercise={el}
                    />
                  ) : (
                    <>
                      <h3>{el.name}</h3>
                      <p>{el.description}</p>
                      <Table striped borderless variant={"dark"}>
                        <thead className="thead-dark">
                          <tr id="table-thead-tr">
                            <th />
                            <th>Set</th>
                            <th>Reps</th>
                            <th>Weight</th>
                          </tr>
                        </thead>
                        <tbody>
                          {el.set.map((set, idx) => {
                            return (
                              <tr>
                                <td></td>
                                <td>{set}</td>
                                <td>{el.reps[idx]}</td>
                                <td>{el.weight[idx]}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </>
                  )}
                </>
                <div
                  className={"d-flex d-inline-flex"}
                  style={{ fontSize: "1.5vh" }}
                >
                  <RemoveWorkout
                    logIndex={logId}
                    exerciseId={el._id}
                    textColor={{ color: "black" }}
                  />
                  <ToggleEdit
                    isEdit={isEdit}
                    SetEdit={SetEdit}
                    index={exerciseIndex}
                    target={"Exercise"}
                    multiple={true}
                  />
                </div>
                <hr />
              </div>
            </>
          );
        })}
        <>
          <SetNewWorkout logId={logId} />
        </>
      </>
    );
  }
};
export default ViewWorkoutList;
