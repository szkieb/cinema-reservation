import { SeatClass, CoupleSeatClass } from "./reserve";

// returns -1 if no gap found or index
export function checkForGap(seats: (SeatClass | CoupleSeatClass)[]): number {
  for (let index = 0; index < seats.length; index++) {
    const seat = seats[index];

    const nextSeat = seats[index + 1];

    // check if next seat is two places away
    if (nextSeat && nextSeat.place === seat.place + 2) {
      return index;
    }
  }
  return -1;
}
