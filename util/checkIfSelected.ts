import { SeatClass, CoupleSeatClass } from "./reserve";

export function checkIfSelected(
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
