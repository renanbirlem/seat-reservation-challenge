import React from "react";
import "./styles.css";
import Button from "../../../../components/Button";

export default function ConfirmButton(props) {
  return (
    <div className="confirm-container">
      <Button {...props} type="confirm" onClick={() => props.handleConfirm(4)}>
        confirm
      </Button>
    </div>
  );
}
