import React from "react";
import "./styles.css";

export default function Button(props) {
  let className = props.type;

  if (props.disabled) {
    className = className + "disabled";
  }

  return (
    <button
      onClick={props.handleConfirm}
      disabled={props.disabled}
      className={"button " + className}
    >
      {props.children}
    </button>
  );
}
