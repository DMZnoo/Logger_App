import React from "react";
import Delete from "@material-ui/icons/Delete";
import { wobble } from "react-animations";
import styled, { keyframes } from "styled-components";
import { isMobile } from "react-device-detect";

const RemoveLogList = ({ isDelete, index, deleteData }) => {
  const Wobble = styled.div`
    animation: 1s ${keyframes`${wobble}`} infinite;
  `;

  return (
    <>
      <div className="position-relative">
        <div
          className={"position-absolute"}
          style={{
            transition: "1s",
            left: !isDelete ? (isMobile ? "-12vw" : "-10vw") : "0vw",
            background: "#ffe6e6",
            width: isMobile ? "11vw" : "5vw",
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
                deleteData(index);
              }}
            >
              <Delete color="secondary" />
            </button>
          </Wobble>
        </div>
      </div>
    </>
  );
};
export default RemoveLogList;
