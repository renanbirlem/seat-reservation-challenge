import React from "react";
import Legend from "../../../../components/Legend";

export default function ColorLegends() {
  return (
    <div>
      <Legend type="booked">Your booked seats</Legend>
      <Legend type="possible">Possible seats combination</Legend>
      <Legend type="available">Available seats</Legend>
      <Legend type="unavailable">Unavailable seats</Legend>
    </div>
  );
}
