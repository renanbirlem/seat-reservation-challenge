import React from "react";
import "./styles.css";
import SelectInput from "../../../../components/SelectInput";

export default function TheaterSelector(props) {
  return (
    <div className="theater-selector">
      <SelectInput options={props.theaters} placeholder="Select theater" />
    </div>
  );
}
