import { SeatClass, CoupleSeatClass, CinemaHall } from "./reserve";
import { hasCinemaSeat } from "./hasCinemaSeat";

export function checkForNeighboringCoupleSeat(
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
  if (hasCinemaSeat(leftNeighbor, row, cinemaHall)) {
    if (!Object.hasOwn(cinemaHall[row][leftNeighbor], "connected")) {
      if (hasCinemaSeat(secondToLeftNeighbor, row, cinemaHall)) {
        if ("connected" in cinemaHall[row][secondToLeftNeighbor]) {
          return "left";
        }
      }
    }
  }

  // check right
  if (hasCinemaSeat(rightNeighbor, row, cinemaHall)) {
    if (!Object.hasOwn(cinemaHall[row][rightNeighbor], "connected")) {
      if (hasCinemaSeat(secondToRightNeighbor, row, cinemaHall)) {
        if ("connected" in cinemaHall[row][secondToRightNeighbor]) {
          return "right";
        }
      }
    }
  }
  return "none";
}
