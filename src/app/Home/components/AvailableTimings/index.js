import React from "react";
import "./styles.css";

export default function AvailableTimings(props) {
  return (
    <div className="available-timing-container">
      <label>Select Timings</label>
      <div className="timings">
        {props.timings.map((timing, index) => {
          const selectedClass =
            props.selectedTiming === timing ? " checked" : "";

          return (
            <div
              key={index}
              className={"timing-item" + selectedClass}
              onClick={() => props.handleChange(timing)}
            >
              {timing}
            </div>
          );
        })}
      </div>
    </div>
  );
}
