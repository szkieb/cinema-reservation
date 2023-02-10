import { SeatClass, CoupleSeatClass } from "./reserve";

export function sortSeats(
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
