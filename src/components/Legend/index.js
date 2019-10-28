import React from "react";
import "./styles.css";

export default function Legend(props) {
  return (
    <div className="legend">
      <div className={"color " + props.type} />
      <div className="text">{props.children}</div>
    </div>
  );
}
