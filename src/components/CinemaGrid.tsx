"use client";

import { useState } from "react";
import { reserve, CinemaHall, CoupleSeatClass, SeatClass } from "util/reserve";

import { CinemaSeat } from "./CinemaSeat";

interface CinemaGridProps {
  auditorium: CinemaHall;
}

export default function CinemaGrid({
  auditorium: auditoriumParsed,
}: CinemaGridProps) {
  // state for reserve functionality
  const [useSelection, setSelection] = useState<
    (SeatClass | CoupleSeatClass)[]
  >([]);

  return (
    <div className="flex flex-col p-4">
      {Object.keys(auditoriumParsed).map((row) => {
        const rowNumb = parseInt(row);
        return (
          <div className="flex justify-center" key={rowNumb} id={row}>
            <p className="pr-4">Row {rowNumb}:</p>
            {Object.keys(auditoriumParsed[rowNumb]).map((place) => {
              const placeNumb = parseInt(place);
              const seat = auditoriumParsed[rowNumb][placeNumb];
              return (
                <div
                  className="h-28 w-24 border border-black bg-slate-600 text-center"
                  key={`${rowNumb}, ${placeNumb}`}
                  id={`${row}, ${place}`}
                >
                  <CinemaSeat
                    clickhandler={() => {
                      const updatedReservation = reserve(
                        seat,
                        useSelection,
                        auditoriumParsed
                      );
                      setSelection(updatedReservation);
                    }}
                    seatSelection={useSelection}
                    seat={seat}
                    reserved={auditoriumParsed[rowNumb][placeNumb].reserved}
                  ></CinemaSeat>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
