import { CinemaHall } from "./reserve";

export function hasCinemaSeat(
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
