"use client";

import { useState } from "react";
import {
  reserve,
  CinemaHall,
  CoupleSeatClass,
  SeatClass,
} from "util/cinemaSeatReservation";

import { CinemaSeat } from "./CinemaSeat";

interface CinemaGridProps {
  auditorium: CinemaHall;
}

export default function CinemaGrid({ auditorium }: CinemaGridProps) {
  // state for reserve functionality
  const [useSelection, setSelection] = useState<
    (SeatClass | CoupleSeatClass)[]
  >([]);
  return (
    <div className="flex flex-col p-4">
      {/* TODO fix error that is thrown by following line during build process */}
      {Object.keys(auditorium).map((row) => {
        const rowNumb = parseInt(row);
        return (
          <div className="flex justify-center" key={rowNumb} id={row}>
            <p className="pr-4">Row {rowNumb}:</p>
            {Object.keys(auditorium[rowNumb]).map((place) => {
              const placeNumb = parseInt(place);
              const seat = auditorium[rowNumb][placeNumb];
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
                        auditorium
                      );
                      setSelection(updatedReservation);
                    }}
                    seatSelection={useSelection}
                    seat={seat}
                    reserved={auditorium[rowNumb][placeNumb].reserved}
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
