import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import ToggleEdit from "../partials/ToggleEdit";
import SubmitUpdate from "../partials/SubmitUpdate";
import EditLogList from "./actions/edit/EditLogList";
import { useAuth0 } from "@auth0/auth0-react";
import { Context } from "../../context/AppContext";
import Loading from "../Loading";
import ViewWorkoutList from "./exercises/ViewWorkoutList";
const ViewLogDescription = () => {
  const { user } = useAuth0();
  const location = useLocation();
  const { state, readExercises, setCurrentLog } = useContext(Context);
  const [isEdit, SetEdit] = useState(false);
  useEffect(() => {
    setCurrentLog(location.state.logId);
    readExercises(location.state.logId);
  }, []);
  if (state.loading) {
    return <Loading />;
  } else {
    let logData = location.state && state.currentLog;
    return (
      <div style={{ background: "white", borderRadius: "2vh" }}>
        {isEdit ? (
          <>
            <EditLogList
              logData={logData}
              user={user}
              isEdit={isEdit}
              SetEdit={SetEdit}
            />
          </>
        ) : (
          <>
            <div className={"p-2"}>
              <h1>{logData.title}</h1>
            </div>
            <hr />
            <div className={"p-2"}>
              <p>{logData.description}</p>
            </div>
            <hr />
            <ViewWorkoutList logId={logData._id} />
            <hr />
            <div className={"p-2"}>
              <p>{logData.date}</p>
            </div>
          </>
        )}
        <ToggleEdit
          isEdit={isEdit}
          SetEdit={SetEdit}
          target={"Log"}
          multiple={true}
        />
      </div>
    );
  }
};
export default ViewLogDescription;
