import { checkForGap } from "./checkForGap";
import { checkIfMiddleSeat } from "./checkIfMiddleSeat";
import { lookAtNeighborsOfArray } from "./lookAtNeighborsOfArray";
import { lookAtNeighborsOfSeatObj } from "./lookAtNeighborsOfSeatObj";
import { sortSeats } from "./sortSeats";

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
