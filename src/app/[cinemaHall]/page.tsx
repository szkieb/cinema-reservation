"use client";

import { useState } from "react";
import { CINEMA } from "_data/cinemaHalls/CinemaHall";
import {
  SeatClass,
  CoupleSeatClass,
  reserve,
  CinemaHall,
  Cinema,
} from "util/cinemaSeatReservation";
import HeaderComponent from "../../app/headerComponent";
import BackButton from "./BackButton";
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

  // @ts-ignore
  const cinema: Cinema = CINEMA;
  // const auditorium: CinemaHall = cinema[cinemaHall];
  const auditorium: CinemaHall = JSON.parse(JSON.stringify(cinema[cinemaHall]));

  // state for reserve functionality
  const [useSelection, setSelection] = useState<
    (SeatClass | CoupleSeatClass)[]
  >([]);

  return (
    <>
      <HeaderComponent
        pageTitle={`Cinema Hall ${hallNumber}`}
        subTitle="Hall Plan"
      />
      <BackButton
        className={
          "fixed right-20 top-6 mt-4 rounded-md bg-sky-200 px-4 py-4 text-lg font-semibold"
        }
      />
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
    </>
  );
}
