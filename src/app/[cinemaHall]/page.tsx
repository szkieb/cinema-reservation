"use client";

import { useState } from "react";
import { CINEMA } from "util/CinemaHall";
import {
  SeatClass,
  CoupleSeatClass,
  reserve,
  CinemaHall,
} from "util/cinemaSeatReservation";
import { CinemaSeat } from "./CinemaSeat";

type CinemaHallProps = {
  params: {
    cinemaHall: string;
  };
};

export default function CinemaAuditorium({
  params: { cinemaHall },
}: CinemaHallProps) {
  const hallNumber = parseInt(cinemaHall.charAt(cinemaHall.length - 1)) + 1;
  const auditorium: CinemaHall = JSON.parse(JSON.stringify(CINEMA[cinemaHall]));

  // state for reserve functionality
  const [useSelection, setSelection] = useState<
    (SeatClass | CoupleSeatClass)[]
  >([]);

  return (
    <>
      <h1 className="border-b-2 border-black pt-2 pl-2 text-4xl">
        Cinema Hall {hallNumber}
      </h1>
      <h2 className="pt-6 pl-6">Hall Plan</h2>
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
                    className="h-14 w-12 border border-black bg-slate-600 text-center"
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
    </>
  );
}
