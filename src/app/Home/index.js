import React, { useState, useEffect } from "react";
import "./styles.css";

import _ from "lodash";
import { searchInline, searchAboveOrBelow } from "../../utils/matrixUtils";

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
import timingsJSON from "../../data/timings";
import matrixJSON from "../../data/matrix";

function App() {
  const [movies, setMovies] = useState(moviesJSON);
  const [theaters, setTheaters] = useState(theatersJSON);
  const [rows, setRows] = useState(rowsJSON);
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  // trocar p/ falso
  const [validated, setValidated] = useState(true);
  const [analyzed, setAnalyzed] = useState(false);

  const [selectedTiming, setSelectedTiming] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);

  const [seatingArea, setSeatingArea] = useState(seatsJSON.reverse());
  const [randomSeats, setRandomSeats] = useState([]);
  const [possibleSeats, setPossibleSeats] = useState([]);

  const fillRandomSeats = () => {
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

  useEffect(() => {
    handleValidation();
  }, [numberOfSeats]);

  const handleChangeMovie = event => {
    setSelectedMovie(event.target.value);
  };

  const handleChangeTheater = event => {
    setSelectedTheater(event.target.value);
  };

  const handleChangeTiming = timing => {
    setSelectedTiming(timing);
  };

  const handleChangeSeatsNumber = event => {
    setNumberOfSeats(event.target.value);
  };

  const handleConfirm = () => {
    handleClear();
    setAnalyzed(true);
    const analyze = _.cloneDeep(randomSeats);
    const possibles = Boolean(numberOfSeats % 2)
      ? inlineAnalyze(analyze)
      : multilineAnalyze(analyze);

    const newSeats = { ...analyze };
    Object.values(possibles).map(row => {
      row.map(seat => {
        newSeats[seat.row][seat.seat].status = "possible";
      });
    });

    setSeatingArea(newSeats);
    setPossibleSeats(newSeats);
  };

  const inlineAnalyze = rows => {
    let possibles = [];

    // search in the same row
    const sameRow = searchInline(rows, numberOfSeats);
    possibles = [...sameRow];

    return possibles;
  };

  const multilineAnalyze = rows => {
    // search in the same row
    const sameRow = searchInline(rows, numberOfSeats);
    const inlinePossibles = [...sameRow];

    // search mod (ex. 2x2)
    const sameModRow = searchInline(rows, numberOfSeats / 2);
    const inlineModPossibles = [...sameModRow];

    const aboveModPossibles = searchAboveOrBelow(
      inlineModPossibles,
      rows,
      numberOfSeats,
      "above"
    );

    const belowModPossibles = searchAboveOrBelow(
      inlineModPossibles,
      rows,
      numberOfSeats,
      "below"
    );

    const abovePossibles = searchAboveOrBelow(
      inlinePossibles,
      rows,
      numberOfSeats,
      "above"
    );

    const belowPossibles = searchAboveOrBelow(
      inlinePossibles,
      rows,
      numberOfSeats,
      "below"
    );

    return [
      ...inlinePossibles,
      ...abovePossibles,
      ...belowPossibles,
      ...aboveModPossibles,
      ...belowModPossibles
    ];
  };

  const handleValidation = () => {
    if (
      numberOfSeats > 0 &&
      selectedMovie &&
      selectedTheater &&
      selectedTiming
    ) {
      setValidated(true);
    }
  };

  const handleClear = () => {
    setSeatingArea(randomSeats);
  };

  const toggleHoverOn = ({ rowIndex, seatIndex, status }) => {
    if (status === "possible" && analyzed) {
      let analyze = _.cloneDeep(Object.values(possibleSeats));
      let bookedCounter = 0;
      let multiline = false;

      const testMatrix = matrixJSON;

      testMatrix.forEach(test => {
        let testMatches = 0;
        const testOneAnalyze = _.cloneDeep(analyze);

        test.forEach(({ row, seat }) => {
          if (
            testOneAnalyze[rowIndex + row] &&
            testOneAnalyze[rowIndex + row][seatIndex + seat] &&
            testOneAnalyze[rowIndex + row][seatIndex + seat].status ===
              "possible"
          ) {
            testOneAnalyze[rowIndex + row][seatIndex + seat].status = "booked";
            testMatches++;
          }
        });

        if (Number(testMatches) === Number(numberOfSeats)) {
          analyze = Object.assign([], analyze, testOneAnalyze);
          multiline = true;
        }
      });

      if (multiline) {
        setSeatingArea(analyze);
        return;
      } else {
        const minIndex = () => {
          const min = Number(seatIndex) + 1 - Number(numberOfSeats);
          return min <= 0 ? 0 : min;
        };

        const maxIndex = () => {
          const max = Number(seatIndex) + Number(numberOfSeats);
          return max > analyze[rowIndex].length
            ? analyze[rowIndex].length
            : max;
        };

        for (let index = minIndex(); index < maxIndex(); index++) {
          if (bookedCounter < numberOfSeats) {
            if (
              analyze[rowIndex][index] &&
              analyze[rowIndex][index].status === "possible"
            ) {
              analyze[rowIndex][index].status = "booked";
              bookedCounter++;
            }
          }
        }

        setSeatingArea(analyze);
      }
    }
  };

  const toggleHoverOff = () => {
    if (analyzed) {
      setSeatingArea(possibleSeats);
    }
  };

  return (
    <div className="main">
      <aside className="menu">
        <MovieSelector
          movies={movies}
          handleChange={event => handleChangeMovie(event)}
          selectedMovie={selectedMovie}
        />
        <TheaterSelector
          theaters={theaters}
          handleChange={event => handleChangeTheater(event)}
          selectedTheater={selectedTheater}
        />
        <AvailableTimings
          timings={timingsJSON}
          handleChange={handleChangeTiming}
          selectedTiming={selectedTiming}
        />
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
          toggleHover={({ rowIndex, seatIndex, status }) =>
            toggleHoverOn({ rowIndex, seatIndex, status })
          }
          toggleHoverOff={() => toggleHoverOff()}
        />
      </div>
      <aside className="legends">
        <ColorLegends />
      </aside>
    </div>
  );
}

export default App;
