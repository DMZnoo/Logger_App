import React, { useContext } from "react";
import Delete from "@material-ui/icons/Delete";
import { wobble } from "react-animations";
import styled, { keyframes } from "styled-components";
import { isMobile } from "react-device-detect";
import { Context } from "../../../../context/AppContext";
import Loading from "../../../Loading";
import axios from "axios";

const RemoveLogList = ({ isDelete, logId, handleDelete, index }) => {
  const { state, deleteLogs } = useContext(Context);
  const Wobble = styled.div`
    animation: 1s ${keyframes`${wobble}`} infinite;
  `;

  // if (state.loading) {
  //   return <Loading />;
  // }
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          transition: "1s",
          // left: !isDelete ? (isMobile ? "-4vw" : "-2vw") : "-1vw",
          background: "#ffe6e6",
          width: !isDelete ? 0 : isMobile ? "11vw" : "5vw",
          height: isMobile ? "8vh" : "10vh",
          borderRadius: "0.2vw",
        }}
      >
        <Wobble>
          <button
            className={"trans-button p-2"}
            style={{
              borderRadius: "10vw",
            }}
            onClick={(e) => {
              handleDelete(index, logId);
            }}
          >
            <Delete
              color="secondary"
              style={{
                transition: "1s",
                borderRadius: "10vw",
                width: !isDelete ? 0 : "100%",
              }}
            />
          </button>
        </Wobble>
      </div>
    </div>
  );
};
export default RemoveLogList;
