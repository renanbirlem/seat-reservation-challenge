import React from "react";
import "./styles.css";
import SelectInput from "../../../../components/SelectInput";

export default function App(props) {
  const options = [1, 2, 3, 4];
  return (
    <div className="number-seats-container">
      <label>Select number of seats</label>
      <SelectInput
        placeholer={"Select..."}
        onChange={event => props.handleChange(event)}
        options={options}
        value={props.numberOfSeats}
      />
    </div>
  );
}
