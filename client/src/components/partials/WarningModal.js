import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
const WarningModal = ({
  SetWarning,
  isWarning,
  SetRemoval,
  SetDeleteList = [],
}) => {
  return (
    <Modal
      show={isWarning}
      onHide={() => {
        SetWarning(false);
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-primary"
          onClick={() => {
            SetWarning(false);
            SetRemoval(true);
          }}
        >
          Yes
        </Button>
        <Button
          variant="outline-info"
          onClick={() => {
            SetWarning(false);
            SetRemoval(false);
            SetDeleteList([]);
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default WarningModal;
