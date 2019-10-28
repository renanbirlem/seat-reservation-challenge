import React from "react";
import "./styles.css";

export default function SelectInput(props) {
  return (
    <select
      className="select"
      onChange={event => props.onChange(event)}
      value={props.value}
    >
      <option value={0} disabled selected>
        {props.placeholder}
      </option>
      {props.options &&
        props.options.length &&
        props.options.map((option, value) => (
          <option key={value} value={option}>
            {option}
          </option>
        ))}
    </select>
  );
}
