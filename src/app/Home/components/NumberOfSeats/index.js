import React from "react";
import "./styles.css";
import SelectInput from "../../../../components/SelectInput";

import seatOptions from "../../../../data/seatOptions";

export default function App(props) {
  return (
    <div className="number-seats-container">
      <label>Select number of seats</label>
      <SelectInput
        placeholer={"Select..."}
        onChange={event => props.handleChange(event)}
        options={seatOptions}
        value={props.numberOfSeats}
      />
    </div>
  );
}
