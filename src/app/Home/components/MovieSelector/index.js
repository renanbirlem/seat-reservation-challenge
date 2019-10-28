import React from "react";
import SelectInput from "../../../../components/SelectInput";

export default function MovieSelector(props) {
  return (
    <div>
      <SelectInput options={props.movies} placeholder="Select movie" />
    </div>
  );
}
