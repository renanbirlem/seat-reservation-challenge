export const searchInline = (rows, numberOfSeats) => {
  const inlinePossibles = [];

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    let availableSeats = [];

    for (let seatIndex = 0; seatIndex < rows[rowIndex].length; seatIndex++) {
      if (rows[rowIndex][seatIndex].status === "available") {
        availableSeats.push({ row: rowIndex, seat: seatIndex });

        if (availableSeats.length >= numberOfSeats) {
          inlinePossibles.push(availableSeats);
        }
      } else {
        availableSeats = [];
      }
    }
  }

  return inlinePossibles;
};

export const searchAboveOrBelow = (
  inlinePossibles,
  rows,
  numberOfSeats,
  where
) => {
  const abovePossibles = [];
  let index;

  if (where === "above") {
    index = -1;
  } else if (where === "below") {
    index = +1;
  }

  inlinePossibles.forEach(possible => {
    let availableAboveSeats = [];

    possible.forEach(possibleItem => {
      if (
        rows[possibleItem.row + index] &&
        rows[possibleItem.row + index][possibleItem.seat] &&
        rows[possibleItem.row + index][possibleItem.seat].status === "available"
      ) {
        availableAboveSeats.push({
          row: possibleItem.row + index,
          seat: possibleItem.seat
        });

        if (availableAboveSeats.length >= numberOfSeats / 2) {
          abovePossibles.push(availableAboveSeats);
        }
      } else {
        availableAboveSeats = [];
      }
    });
  });

  return abovePossibles;
};
