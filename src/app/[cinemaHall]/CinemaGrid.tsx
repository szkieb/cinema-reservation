"use client";

import { useState } from "react";

import { CINEMA } from "_data/cinemaHalls/CinemaHall";
import { CinemaSeat } from "./CinemaSeat";
import { reserve, CinemaHall, CoupleSeatClass, SeatClass } from "util/reserve";

interface CinemaGridProps {
  cinemaHall: string;
}

export default function CinemaGrid({ cinemaHall }: CinemaGridProps) {
  // state for reserve functionality
  const [useSelection, setSelection] = useState<
    (SeatClass | CoupleSeatClass)[]
  >([]);

  // @ts-ignore
  const cinema: Cinema = CINEMA;
  const auditorium: CinemaHall = cinema[cinemaHall];

  return (
    <div className="flex flex-col">
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
