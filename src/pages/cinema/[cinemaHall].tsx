"use client";

import { CINEMA } from "_data/cinemaHalls/CinemaHall";
import { CinemaHall, Cinema } from "util/reserve";
import HeaderComponent from "../../components/headerComponent";
import BackButton from "../../components/BackButton";
import CinemaGrid from "../../components/CinemaGrid";
import { useRouter } from "next/router";

export default function CinemaAuditorium() {
  const router = useRouter();

  const cinemaHall = router.query.cinemaHall as string;

  if (!cinemaHall) {
    return <p>Loading...</p>;
  }

  const hallNumber = parseInt(cinemaHall.charAt(cinemaHall.length - 1)) + 1;

  // @ts-ignore
  const cinema: Cinema = CINEMA;

  const auditorium: CinemaHall = cinema[cinemaHall];

  return (
    <div className="bg-slate-100 py-5 px-10">
      <HeaderComponent
        pageTitle={`Cinema Hall ${hallNumber}`}
        subTitle="Hall Plan"
      />
      <BackButton
        className={
          "fixed right-20 top-6 mt-4 rounded-md bg-sky-200 px-4 py-4 text-lg font-semibold"
        }
      />
      <CinemaGrid auditorium={auditorium}></CinemaGrid>
    </div>
  );
}
