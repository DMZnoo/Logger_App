import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ToggleEdit from "../../partials/ToggleEdit";
import SubmitUpdate from "../../partials/SubmitUpdate";
import EditWorkout from "./actions/edit/EditWorkout";
import RemoveWorkout from "./actions/remove/RemoveWorkout";
import EditableTable from "../../partials/EditableTable";
import update from "immutability-helper";
import axios from "axios";
import SetNewWorkout from "./actions/create/SetNewWorkout";

const ViewWorkoutList = ({
  isShown,
  SetShown,
  isWorkoutList,
  SetWorkoutList,
  isCurrID,
  user,
  index,
  onLogEdit,
  updateData,
}) => {
  const [isEdit, SetEdit] = useState([]);
  const [isLogEdit, SetLogEdit] = useState(Boolean(onLogEdit[index]));
  const [isDelete, SetDelete] = useState([]);
  const [isAdded, SetAdded] = useState(false);
  const [isValues, SetValues] = useState([]);
  const [isKeys, SetKeys] = useState([]);
  useEffect(() => {
    let promises = [];
    if (isWorkoutList[index].length > 0) {
      isWorkoutList[index].forEach((call) => {
        promises.push(axios.get(`/api/exercises/log/${call}`));
      });
      Promise.all(promises).then((res) => {
        Object.entries(res).forEach((log, idx) => {
          if (log[1].data.length > 0) {
            SetWorkoutList((isWorkoutList) => [
              ...isWorkoutList.slice(0, index),
              [],
              ...isWorkoutList.slice(index + 1),
            ]);
            Object.values(log[1].data).forEach((data) => {
              console.log("Data", data);
              SetKeys((isKeys) => [...isKeys, Object.keys(data)]);
              SetValues((isValues) => [...isValues, Object.values(data)]);
              SetWorkoutList((isWorkoutList) => [
                ...isWorkoutList.slice(0, index),
                update(isWorkoutList[index], { $push: [data] }),
                ...isWorkoutList.slice(index + 1),
              ]);
              SetEdit((isEdit) => [...isEdit, false]);
              SetDelete((isDelete) => [...isDelete, false]);
            });
          }
        });
      });
    }
  }, []);
  const SetRoutine = (state, idx) => {
    SetValues((isValues) =>
      update(isValues, {
        [idx]: {
          1: { $set: state.set },
          2: { $set: state.reps },
          3: { $set: state.weight },
        },
      })
    );
    SetWorkoutList((isWorkoutList) => [
      ...isWorkoutList.slice(0, index),
      update(isWorkoutList[index], {
        [idx]: {
          set: { $set: state.set },
          reps: { $set: state.reps },
          weight: { $set: state.weight },
        },
      }),
      ...isWorkoutList.slice(index + 1),
    ]);
  };
  const SetNewExercise = (data, idx) => {
    SetWorkoutList((isWorkoutList) => [
      ...isWorkoutList.slice(0, idx),
      [],
      ...isWorkoutList.slice(idx + 1),
    ]);
    SetWorkoutList(update(isWorkoutList, { [idx]: { $push: [data] } }));
    SetKeys((isKeys) => [...isKeys, Object.keys(data)]);
    SetValues((isValues) => [...isValues, Object.values(data)]);
  };

  const removeExercise = (logIndex, exindex) => {
    console.log("REMOVING AT", logIndex);
    //this is json object and slice does not work...
    SetWorkoutList(
      update(isWorkoutList, { [logIndex]: { $splice: [[exindex, 1]] } })
    );
    SetValues(update(isValues, { $splice: [[exindex, 1]] }));
    SetKeys(update(isKeys, { $splice: [[exindex, 1]] }));
  };

  if (isLogEdit !== Boolean(onLogEdit[index])) {
    for (let i = 0; i < isEdit.length; i++) {
      SetEdit((isEdit) => [
        ...isEdit.slice(0, i),
        Boolean(onLogEdit[index]),
        ...isEdit.slice(i + 1),
      ]);
    }
    SetLogEdit(Boolean(onLogEdit[index]));
  }

  return (
    <>
      {isValues.map((el, exerciseIndex) => {
        if (el === null) {
          return <></>;
        }
        return (
          <>
            <div>
              {!isEdit[exerciseIndex] ? (
                <>
                  <h3>{el[isKeys[exerciseIndex].indexOf("name")]}</h3>
                  <p>{el[isKeys[exerciseIndex].indexOf("description")]}</p>
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
                      {el[isKeys[exerciseIndex].indexOf("set")].map(
                        (set, idx) => {
                          return (
                            <tr>
                              <td></td>
                              <td>{set}</td>
                              <td>
                                {el[isKeys[exerciseIndex].indexOf("reps")][idx]}
                              </td>
                              <td>
                                {
                                  el[isKeys[exerciseIndex].indexOf("weight")][
                                    idx
                                  ]
                                }
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </Table>
                </>
              ) : (
                <>
                  <EditWorkout
                    SetValues={SetValues}
                    isValues={isValues}
                    exercise={el}
                    exerciseIndex={exerciseIndex}
                    logIndex={index}
                    isKeys={isKeys}
                    SetRoutine={SetRoutine}
                    isEdit={isEdit}
                    SetEdit={SetEdit}
                  />
                </>
              )}

              <div
                className={"d-flex d-inline-flex"}
                style={{ fontSize: "1.5vh" }}
              >
                <RemoveWorkout
                  exercise={el[isKeys[exerciseIndex].indexOf("_id")]}
                  logIndex={index}
                  exerciseIndex={exerciseIndex}
                  isCurrID={isCurrID}
                  SetEditList={SetValues}
                  isEditList={isValues}
                  updateData={removeExercise}
                  textColor={{ color: "black" }}
                  user={user}
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
        <SetNewWorkout
          logIndex={index}
          isShown={isShown}
          SetShown={SetShown}
          isCurrID={isCurrID}
          SetNewExercise={SetNewExercise}
          user={user}
        />
      </>
    </>
  );
};
export default ViewWorkoutList;
