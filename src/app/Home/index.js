import React, { useState, useEffect } from "react";
import "./styles.css";

import _ from "lodash";

import MovieSelector from "./components/MovieSelector";
import TheaterSelector from "./components/TheaterSelector";
import AvailableTimings from "./components/AvailableTimings";
import NumberOfSeats from "./components/NumberOfSeats";
import ConfirmButton from "./components/ConfirmButton";
import SeatingArea from "./components/SeatingArea";
import ColorLegends from "./components/ColorLegends";

import seatsJSON from "../../data/seats.json";
import moviesJSON from "../../data/movies.json";
import theatersJSON from "../../data/theaters.json";
import rowsJSON from "../../data/rows.json";

function App() {
  const [movies, setMovies] = useState(moviesJSON);
  const [theaters, setTheaters] = useState(theatersJSON);
  const [rows, setRows] = useState(rowsJSON);
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [validated, setValidated] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const [seatingArea, setSeatingArea] = useState(seatsJSON.reverse());
  const [randomSeats, setRandomSeats] = useState([]);
  const [possibleSeats, setPossibleSeats] = useState([]);

  const fillRandomSeats = () => {
    console.log("fillRandomSeats");
    const randonSeats = Object.values(seatingArea).map(row =>
      row.map(seat => {
        if (Boolean(Math.random() >= 0.5)) {
          seat.status = "unavailable";
        }
        return seat;
      })
    );

    setSeatingArea(randonSeats);
    setRandomSeats(randonSeats);
  };

  useEffect(() => fillRandomSeats(), []);

  const handleChangeSeatsNumber = event => {
    console.log("cchange", event.target.value);
    setNumberOfSeats(event.target.value);
  };

  const handleConfirm = () => {
    console.log("handleConfirm", numberOfSeats);
    handleClear();
    setAnalyzed(true);
    const inlinePossibles = [];
    const analyze = _.cloneDeep(randomSeats);

    Object.values(analyze).map((row, rowIndex) => {
      let availableSeats = [];

      row.map((seat, seatIndex) => {
        if (seat.status === "available") {
          availableSeats.push({ row: rowIndex, seat: seatIndex });
          if (availableSeats.length >= numberOfSeats) {
            inlinePossibles.push(availableSeats);
          }
        } else {
          availableSeats = [];
        }

        return seat;
      });
    });

    const newSeats = { ...analyze };
    Object.values(inlinePossibles).map(row => {
      row.map(seat => {
        newSeats[seat.row][seat.seat].status = "possible";
      });
    });

    setSeatingArea(newSeats);
    setPossibleSeats(newSeats);
  };

  const handleValidation = () => {
    console.log("handleValidation ", numberOfSeats);
    if (numberOfSeats > 0) {
      setValidated(true);
    }
  };

  useEffect(() => {
    handleValidation();
  }, [numberOfSeats]);

  const handleClear = () => {
    setSeatingArea(randomSeats);
  };

  const handleSelectSeat = ({ rowIndex, seatIndex }) => {
    if (analyzed) {
      const clone = _.cloneDeep(Object.values(possibleSeats));
      const analyze = clone;
      let bookedCounter = 1;

      if (clone[rowIndex][seatIndex].status === "possible") {
        clone[rowIndex][seatIndex].status = "booked";

        const minIndex = () => {
          const min = Number(seatIndex) + 1 - Number(numberOfSeats);
          return min <= 0 ? 0 : min;
        };

        const maxIndex = () => {
          const max = Number(seatIndex) + Number(numberOfSeats);
          return max > clone[rowIndex].length ? clone[rowIndex].length : max;
        };

        for (let index = minIndex(); index < maxIndex(); index++) {
          if (bookedCounter < numberOfSeats) {
            if (
              clone[rowIndex][index] &&
              clone[rowIndex][index].status === "possible"
            ) {
              clone[rowIndex][index].status = "booked";
              bookedCounter++;
            }
          }
        }

        setSeatingArea(analyze);
      }
    }
  };

  return (
    <div className="main">
      <aside className="menu">
        <MovieSelector movies={movies} />
        <TheaterSelector theaters={theaters} />
        <AvailableTimings />
        <NumberOfSeats
          numberOfSeats={numberOfSeats}
          handleChange={event => handleChangeSeatsNumber(event)}
        />
        <ConfirmButton
          disabled={!validated}
          handleConfirm={() => handleConfirm()}
        />
      </aside>
      <div className="content">
        <SeatingArea
          rows={rows}
          seats={seatingArea}
          handleSelectSeat={handleSelectSeat}
        />
      </div>
      <aside className="legends">
        <ColorLegends />
      </aside>
    </div>
  );
}

export default App;
