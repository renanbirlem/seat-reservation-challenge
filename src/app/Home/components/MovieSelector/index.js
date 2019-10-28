import React from "react";
import SelectInput from "../../../../components/SelectInput";

export default function MovieSelector(props) {
  return (
    <div>
      <SelectInput
        onChange={event => props.handleChange(event)}
        value={props.selectedMovie}
        options={props.movies}
        placeholder="Select movie"
      />
    </div>
  );
}
