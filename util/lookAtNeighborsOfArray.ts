import { checkForNeighboringCoupleSeat } from "./checkForNeighboringCoupleSeat";
import { SeatClass, CoupleSeatClass, CinemaHall } from "./reserve";
import { hasCinemaSeat } from "./hasCinemaSeat";

export function lookAtNeighborsOfArray(
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
    !hasCinemaSeat(leftNeighbor, row, cinemaHall) ||
    !hasCinemaSeat(rightNeighbor, row, cinemaHall)
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
  !hasCinemaSeat(secondToLeftNeighbor, row, cinemaHall)
    ? (leftNeighborIsEdgeSeat = true)
    : cinemaHall[row][secondToLeftNeighbor].reserved === true
    ? (leftNeighborIsSingleEmptySeat = true)
    : (leftNeighborIsSingleEmptySeat = false);

  !hasCinemaSeat(secondToRightNeighbor, row, cinemaHall)
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
