import React from "react";
import "./styles.css";

export default function SeatingArea(props) {
  const prime = Object.values(props.seats).slice(0, 9);
  const classic = Object.values(props.seats).slice(9, 12);
  const primeRows = Object.values(props.rows)
    .reverse()
    .slice(0, 9);
  const classicRows = Object.values(props.rows)
    .reverse()
    .slice(9, 12);

  return (
    <div className="seating-container">
      <div className="seating-main">
        <div className="prime">
          <p>Prime - Rs 230.00</p>
          <div className="seating-area">
            {prime.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                <div className="rowNumber">{primeRows[rowIndex]}</div>
                {row.map((seat, seatIndex) => (
                  <div
                    key={seatIndex}
                    onClick={() =>
                      props.handleSelectSeat({ rowIndex, seatIndex })
                    }
                    className={"seat " + seat.status}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="classic">
          <p>Classic - Rs 156.00</p>
          <div className="seating-area">
            {classic.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                <div className="rowNumber">{classicRows[rowIndex]}</div>
                {row.map((seat, seatIndex) => (
                  <div
                    key={seatIndex}
                    onClick={() =>
                      props.handleSelectSeat({
                        rowIndex: rowIndex + 9,
                        seatIndex
                      })
                    }
                    className={"seat " + seat.status}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
