///////////////////////////////////////////////////////////////////
// Typescript Types ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

export class SeatClass {
  row: number;
  place: number;
  reserved: boolean;

  constructor(row: number, place: number, reserved: boolean) {
    this.row = row;
    this.place = place;
    this.reserved = reserved;
  }
}

export interface CoupleSeatClass extends SeatClass {
  connected: SeatClass;
}

export type Cinema = {
  [CINEMA_HALL: string]: CinemaHall;
};

export type CinemaMetadata = { name: string; ImgSrc: string; ImgAlt: string }[];

export type CinemaHall = {
  [row: number]: { [place: number]: SeatClass | CoupleSeatClass };
};

///////////////////////////////////////////////////////////////////
// Utility Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

function checkForGap(seats: (SeatClass | CoupleSeatClass)[]): number {
  // returns -1 if no gap found or index
  for (let index = 0; index < seats.length; index++) {
    const seat = seats[index];

    const nextSeat = seats[index + 1];

    // check if next seat is two places away
    if (nextSeat && nextSeat.place == seat.place + 2) {
      return index;
    }
  }
  return -1;
}

function checkIfMiddleSeat(
  seat: SeatClass | CoupleSeatClass,
  alreadyReservedSeats: (SeatClass | CoupleSeatClass)[]
): boolean {
  const previousPlace = seat.place - 1;
  const nextPlace = seat.place + 1;
  let hasPreviousPlace = false;
  let hasNextPlace = false;

  // loop array and search for prev and next seat
  for (let index = 0; index < alreadyReservedSeats.length; index++) {
    const reservedSeat = alreadyReservedSeats[index];

    if (reservedSeat.row === seat.row && reservedSeat.place === previousPlace) {
      hasPreviousPlace = true;
    }
    if (reservedSeat.row === seat.row && reservedSeat.place === nextPlace) {
      hasNextPlace = true;
    }
  }

  if (hasPreviousPlace && hasNextPlace) {
    return true;
  } else return false;
}

function checkIfSelected(
  seat: SeatClass | CoupleSeatClass,
  alreadyReservedSeats: (SeatClass | CoupleSeatClass)[]
): boolean {
  for (let index = 0; index < alreadyReservedSeats.length; index++) {
    const reservedSeat = alreadyReservedSeats[index];

    if (reservedSeat.row === seat.row && reservedSeat.place === seat.place) {
      return true;
    }
  }
  return false;
}

function checkForNeighboringCoupleSeat(
  seats: (SeatClass | CoupleSeatClass)[],
  cinemaHall: CinemaHall
): "left" | "right" | "none" {
  const leftNeighbor = seats[0].place - 1;
  const rightNeighbor = seats[seats.length - 1].place + 1;
  const secondToLeftNeighbor = seats[0].place - 2;
  const secondToRightNeighbor = seats[seats.length - 1].place + 2;
  const row = seats[0].row;

  // logic:
  // 1) does first exist and is NOT already a CoupleSeat?
  // 2) does second exist and IS CoupleSeat?

  // check left
  if (HasCinemaSeat(leftNeighbor, row, cinemaHall)) {
    if (!Object.hasOwn(cinemaHall[row][leftNeighbor], "connected")) {
      if (HasCinemaSeat(secondToLeftNeighbor, row, cinemaHall)) {
        if ("connected" in cinemaHall[row][secondToLeftNeighbor]) {
          return "left";
        }
      }
    }
  }

  // check right
  if (HasCinemaSeat(rightNeighbor, row, cinemaHall)) {
    if (!Object.hasOwn(cinemaHall[row][rightNeighbor], "connected")) {
      if (HasCinemaSeat(secondToRightNeighbor, row, cinemaHall)) {
        if ("connected" in cinemaHall[row][secondToRightNeighbor]) {
          return "right";
        }
      }
    }
  }
  return "none";
}

function HasCinemaSeat(
  seatNumber: number,
  row: number,
  cinemaHall: CinemaHall
): boolean {
  let seatExist = false;

  if (seatNumber >= 1 && cinemaHall[row][seatNumber]) {
    seatExist = true;
  }
  return seatExist;
}

function lookAtNeighborsOfSeatObj(
  seat: SeatClass | CoupleSeatClass,
  alreadyreservedSeats: (SeatClass | CoupleSeatClass)[],
  cinemaHall: CinemaHall
): SeatClass | CoupleSeatClass {
  const leftNeighbor = seat.place - 1;
  const rightNeighbor = seat.place + 1;
  const row = seat.row;

  const secondToLeftNeighbor = leftNeighbor - 1;
  const secondToRightNeighbor = rightNeighbor + 1;

  let leftNeighborIsEdgeSeat = false;
  let rightNeighborIsEdgeSeat = false;

  let leftNeighborIsSingleEmptySeat = false;
  let rightNeighborIsSingleEmptySeat = false;
  let leftNeighborIsNextToSelection = false;
  let rightNeighborIsNextToSelection = false;

  // check left side
  if (HasCinemaSeat(leftNeighbor, row, cinemaHall)) {
    // if either neighbor is reserved (or selected) we do not move
    if (
      cinemaHall[row][leftNeighbor].reserved === true ||
      checkIfSelected(cinemaHall[row][leftNeighbor], alreadyreservedSeats)
    ) {
      return seat;
    }
    // check second neighbor
    !HasCinemaSeat(secondToLeftNeighbor, row, cinemaHall)
      ? (leftNeighborIsEdgeSeat = true)
      : checkIfSelected(
          cinemaHall[row][secondToLeftNeighbor],
          alreadyreservedSeats
        )
      ? (leftNeighborIsNextToSelection = true)
      : cinemaHall[row][secondToLeftNeighbor].reserved === true
      ? (leftNeighborIsSingleEmptySeat = true)
      : (leftNeighborIsSingleEmptySeat = false);
  }

  // check right side
  if (HasCinemaSeat(rightNeighbor, row, cinemaHall)) {
    if (
      cinemaHall[row][rightNeighbor].reserved === true ||
      checkIfSelected(cinemaHall[row][rightNeighbor], alreadyreservedSeats)
    ) {
      return seat;
    }
    // check second neighbor
    !HasCinemaSeat(secondToRightNeighbor, row, cinemaHall)
      ? (rightNeighborIsEdgeSeat = true)
      : checkIfSelected(
          cinemaHall[row][secondToRightNeighbor],
          alreadyreservedSeats
        )
      ? (rightNeighborIsNextToSelection = true)
      : cinemaHall[row][secondToRightNeighbor].reserved === true
      ? (rightNeighborIsSingleEmptySeat = true)
      : (rightNeighborIsSingleEmptySeat = false);
  }

  let movement = 0;

  if (
    (leftNeighborIsNextToSelection && rightNeighborIsNextToSelection) ||
    (leftNeighborIsSingleEmptySeat && rightNeighborIsSingleEmptySeat)
  ) {
    // move towards middle which we assume to be 5
    seat.place >= 5 ? (movement = -1) : (movement = 1);
  }

  if (leftNeighborIsNextToSelection && !rightNeighborIsNextToSelection) {
    movement = -1;
  }

  if (!leftNeighborIsNextToSelection && rightNeighborIsNextToSelection) {
    movement = 1;
  }

  if (movement === 0) {
    if (leftNeighborIsSingleEmptySeat && !rightNeighborIsSingleEmptySeat) {
      movement = -1;
    }

    // vice versa
    if (!leftNeighborIsSingleEmptySeat && rightNeighborIsSingleEmptySeat) {
      movement = 1;
    }

    if (leftNeighborIsEdgeSeat && movement === 0) {
      movement = -1;
    }
    //vice versa
    if (rightNeighborIsEdgeSeat && movement === 0) {
      movement = 1;
    }
  }

  // apply movement
  if (movement !== 0) {
    seat.place = seat.place + movement;
  }

  return seat;
}

function lookAtNeighborsOfArray(
  seats: (SeatClass | CoupleSeatClass)[],
  cinemaHall: CinemaHall
): (SeatClass | CoupleSeatClass)[] {
  const leftNeighbor = seats[0].place - 1;
  const rightNeighbor = seats[seats.length - 1].place + 1;
  const row = seats[0].row;
  const movedSeats: (SeatClass | CoupleSeatClass)[] = [];

  //you can have a CoupleSeat if you want one, no matter if there are single free places around you
  if ("connected" in seats[0] || "connected" in seats[seats.length - 1]) {
    return [];
  }

  // check if seat is next to reserved (in cinema Hall) - only if not proceed
  if (
    !HasCinemaSeat(leftNeighbor, row, cinemaHall) ||
    !HasCinemaSeat(rightNeighbor, row, cinemaHall)
  ) {
    return [];
  }

  // if either neighbor is reserved we do not move
  if (
    cinemaHall[row][leftNeighbor].reserved === true ||
    cinemaHall[row][rightNeighbor].reserved === true
  ) {
    return [];
  }

  // if both neighbors are vacant seats we need to check second neighbors
  const secondToLeftNeighbor = leftNeighbor - 1;
  const secondToRightNeighbor = rightNeighbor + 1;

  let leftNeighborIsEdgeSeat = false;
  let rightNeighborIsEdgeSeat = false;

  let leftNeighborIsSingleEmptySeat = false;
  let rightNeighborIsSingleEmptySeat = false;

  // check if seat exist - if does exist check if reserved
  !HasCinemaSeat(secondToLeftNeighbor, row, cinemaHall)
    ? (leftNeighborIsEdgeSeat = true)
    : cinemaHall[row][secondToLeftNeighbor].reserved === true
    ? (leftNeighborIsSingleEmptySeat = true)
    : (leftNeighborIsSingleEmptySeat = false);

  !HasCinemaSeat(secondToRightNeighbor, row, cinemaHall)
    ? (rightNeighborIsEdgeSeat = true)
    : cinemaHall[row][secondToRightNeighbor].reserved === true
    ? (rightNeighborIsSingleEmptySeat = true)
    : (rightNeighborIsSingleEmptySeat = false);

  let movement = 0;

  if (leftNeighborIsSingleEmptySeat && rightNeighborIsSingleEmptySeat) {
    // move towards middle which we assume to be 5
    const middleSeat = Math.floor(seats.length / 2);
    seats[middleSeat].place >= 5 ? (movement = -1) : (movement = 1);
  }

  // if left is single empty but right is not, move left
  if (leftNeighborIsSingleEmptySeat && !rightNeighborIsSingleEmptySeat) {
    movement = -1;
  }

  // vice versa
  if (!leftNeighborIsSingleEmptySeat && rightNeighborIsSingleEmptySeat) {
    movement = 1;
  }

  // handle edge case
  if (leftNeighborIsEdgeSeat && movement === 0) {
    movement = -1;
  }
  //vice versa
  if (rightNeighborIsEdgeSeat && movement === 0) {
    movement = 1;
  }

  // if seat still unmoved check for Couple Seats in vicinity
  if (movement === 0) {
    const CoupleSeatCheck = checkForNeighboringCoupleSeat(seats, cinemaHall);

    switch (CoupleSeatCheck) {
      case "left":
        movement = -1;
        break;
      case "right":
        movement = 1;
        break;
    }
  }

  // apply movement
  if (movement !== 0) {
    seats.forEach((seat) => {
      const newSeat = { ...seat, place: seat.place + movement };
      movedSeats.push(newSeat);
    });
  }
  return movedSeats;
}

function sortSeats(
  unSortedSeats: (SeatClass | CoupleSeatClass)[]
): Array<Array<SeatClass | CoupleSeatClass>> {
  // array for storing seats to be sorted and sorted seats respectively
  let rowsToBeSorted: (SeatClass | CoupleSeatClass)[] = [...unSortedSeats];
  const sortedRows: Array<Array<SeatClass | CoupleSeatClass>> = [];

  while (rowsToBeSorted.length > 0) {
    // filter out row
    const newRow: (SeatClass | CoupleSeatClass)[] = rowsToBeSorted.filter(
      (seat) => seat.row === rowsToBeSorted[0].row
    );

    // sort row by place and add to sortedRows
    const newRowSorted = newRow.sort((a, b) => a.place - b.place);
    // push to sortedRows
    sortedRows.push(newRowSorted);

    // place all other seats into rowsToBeSorted for next iteration

    const otherRows = rowsToBeSorted.filter(
      (seat) => seat.row !== rowsToBeSorted[0].row
    );
    rowsToBeSorted = [...otherRows];
  }
  return sortedRows;
}

///////////////////////////////////////////////////////////////////
// Actual Reserve Function ////////////////////////////////////////
///////////////////////////////////////////////////////////////////

export function reserve(
  seat: SeatClass | CoupleSeatClass,
  alreadyReservedSeats: (SeatClass | CoupleSeatClass)[],
  cinemaHall: CinemaHall
): (SeatClass | CoupleSeatClass)[] {
  // array to hold reservation request(s)
  const reservationRequests = [seat];

  // array with confirmed reservations to be returned at the end
  const updatedReservations: (SeatClass | CoupleSeatClass)[] = [
    ...alreadyReservedSeats,
  ];

  //
  // (1) checking selected seat
  //

  // (1.1) Couple Seats?
  // if seat connected reserve connected seat and add second seat to reservation request

  if ("connected" in seat) {
    const coupledSeat = cinemaHall[seat.connected.row][seat.connected.place];
    reservationRequests.push(coupledSeat);
  }

  // (1.2) Check For Middle Seat And Vacant Neighbor (unnecessary if couple seat)

  if (reservationRequests.length === 1) {
    // (1.2.1) Vacant Single Neighbor?
    // returns updated (or unchanged) seat
    const updatedSeat = lookAtNeighborsOfSeatObj(
      reservationRequests[0],
      alreadyReservedSeats,
      cinemaHall
    );
    reservationRequests.splice(0, 1, updatedSeat);

    // (1.2.2) Middle Seat?
    const isMiddleSeat = checkIfMiddleSeat(
      reservationRequests[0],
      alreadyReservedSeats
    );
    if (isMiddleSeat) {
      reservationRequests.pop();
    }
  }

  //
  // (3) Update CinemaHall Reservations
  //

  reservationRequests.forEach((seat) => {
    let previouslySelected = false;

    // (3.1) Undo Reservation
    // check if reservationRequests is part of alreadyReservedSeats
    // if true delete seat from newReservations and mark as unreserved in cinema hall

    for (let index = 0; index < updatedReservations.length; index++) {
      const reservedSeat = updatedReservations[index];

      if (reservedSeat.row === seat.row && reservedSeat.place === seat.place) {
        updatedReservations.splice(index, 1);
        previouslySelected = true;
      }
    }

    // (3.2) Reserve Seat
    // check if seat has not been deselected and is vacant in cinema hall mark
    if (
      !previouslySelected &&
      cinemaHall[seat.row][seat.place].reserved === false
    ) {
      seat.reserved = true;
      updatedReservations.push(seat);
    }
  });

  //
  // (4) Optional Check For Single Seats
  //

  if (updatedReservations.length > 0) {
    // (4.1) Sort Seats By Row And Place
    const sortedRows = sortSeats(updatedReservations);

    // (4.2) Check each row For Vacant Seats
    sortedRows.forEach((singleRowSorted, idx) => {
      // (4.2.1) Check For Gaps
      // returns index of gap or -1 if none found
      const gapCheck = checkForGap(singleRowSorted);
      if (gapCheck !== -1) {
        // move all seats up to and including index to the right
        for (let index = 0; index <= gapCheck; index++) {
          const seat = singleRowSorted[index];
          seat.place = seat.place + 1;
        }
      }

      // (4.2.2) Check Group For Vacant Neighboring Seat
      // returns updated seats or empty array if unchanged
      const updatedReservations = lookAtNeighborsOfArray(
        singleRowSorted,
        cinemaHall
      );
      if (updatedReservations.length !== 0) {
        sortedRows.splice(idx, 1, updatedReservations);
      }
    });
    // (4.3) Flatten And Return Updated Seats Array
    return sortedRows.flat();
  }

  // (5) Return Updated Reservations
  return updatedReservations;
}
