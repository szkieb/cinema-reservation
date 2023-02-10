import { checkIfSelected } from "./checkIfSelected";
import { SeatClass, CoupleSeatClass, CinemaHall } from "./reserve";
import { hasCinemaSeat } from "./hasCinemaSeat";

export function lookAtNeighborsOfSeatObj(
  seat: SeatClass | CoupleSeatClass,
  alreadyreservedSeats: (SeatClass | CoupleSeatClass)[],
  cinemaHall: CinemaHall
): SeatClass | CoupleSeatClass {
  // seat to be returned
  let newSeat: SeatClass | CoupleSeatClass = { ...seat };

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
  if (hasCinemaSeat(leftNeighbor, row, cinemaHall)) {
    // if either neighbor is reserved (or selected) we do not move
    if (
      cinemaHall[row][leftNeighbor].reserved === true ||
      checkIfSelected(cinemaHall[row][leftNeighbor], alreadyreservedSeats)
    ) {
      return newSeat;
    }
    // check second neighbor
    !hasCinemaSeat(secondToLeftNeighbor, row, cinemaHall)
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
  if (hasCinemaSeat(rightNeighbor, row, cinemaHall)) {
    if (
      cinemaHall[row][rightNeighbor].reserved === true ||
      checkIfSelected(cinemaHall[row][rightNeighbor], alreadyreservedSeats)
    ) {
      return newSeat;
    }
    // check second neighbor
    !hasCinemaSeat(secondToRightNeighbor, row, cinemaHall)
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
    newSeat = { ...seat, place: seat.place + movement };
  }

  return newSeat;
}
