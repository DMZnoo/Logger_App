import React, { useState } from "react";
import SubmitUpdate from "../../../partials/SubmitUpdate";
import EditWorkout from "../../exercises/actions/edit/EditWorkout";
import update from "immutability-helper";
import EditableTable from "../../../partials/EditableTable";
const EditLogList = ({ el, index, isEdit, isCurrID, updateData, SetEdit }) => {
  const [isEditList, SetEditList] = useState(el);
  const SetData = (state, idx) => {
    SetEditList((isEditList) =>
      update(isEditList, {
        0: {
          1: {
            [idx]: {
              set: { $set: state.set },
              reps: { $set: state.reps },
              weight: { $set: state.weight },
            },
          },
        },
      })
    );
  };
  return el.map((log) => {
    if (log[0] === "exercises") {
      return (
        <>
          {Object.values(log[1]).map((ex, li) => {
            return (
              <div className={"container"}>
                <EditWorkout
                  isEditList={isEditList}
                  SetEditList={SetEditList}
                  ex={ex}
                  li={li}
                />
                <hr />
                <EditableTable
                  index={li}
                  thead={["Set", "Reps", "Weight"]}
                  SetData={SetData}
                  style={{
                    color: "black",
                    width: "inherit",
                    fontSize: "1.5vh",
                    margin: "0",
                  }}
                  dataAvailable={[ex.set, ex.reps, ex.weight]}
                />
                <hr />
              </div>
            );
          })}
          {isEdit[index] && (
            <SubmitUpdate
              index={index}
              isCurrID={isCurrID}
              isEdit={isEdit}
              SetEdit={SetEdit}
              isEditList={isEditList}
              updateData={updateData}
              target={"Log"}
            />
          )}
        </>
      );
    }
  });
};
export default EditLogList;
