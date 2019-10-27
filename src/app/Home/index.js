import React from "react";
import "./styles.css";

import MovieSelector from "./components/MovieSelector";
import TheaterSelector from "./components/TheaterSelector";
import AvailableTimings from "./components/AvailableTimings";
import NumberOfSeats from "./components/NumberOfSeats";
import ConfirmButton from "./components/ConfirmButton";
import SeatingArea from "./components/SeatingArea";
import ColorLegends from "./components/ColorLegends";

function App() {
  return (
    <div className="main">
      <aside className="menu">
        <MovieSelector />
        <TheaterSelector />
        <AvailableTimings />
        <NumberOfSeats />
        <ConfirmButton />
      </aside>
      <div className="content">
        <SeatingArea />
      </div>
      <aside className="legends">
        <ColorLegends />
      </aside>
    </div>
  );
}

export default App;
