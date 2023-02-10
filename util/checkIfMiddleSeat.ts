import { CoupleSeatClass, SeatClass } from "./reserve";

export function checkIfMiddleSeat(
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
