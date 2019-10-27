import React from "react";
import "./styles.css";

export default function App(props) {
  return (
    <select>
      <option disabled selected>
        {props.placeholder}
      </option>
      <option>1</option>
      <option>2</option>
    </select>
  );
}
