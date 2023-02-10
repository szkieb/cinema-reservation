import { CINEMA } from "_data/cinemaHalls/CinemaHall";
import { CinemaHall, Cinema } from "util/reserve";
import HeaderComponent from "../../app/headerComponent";
import BackButton from "./BackButton";
import CinemaGrid from "./CinemaGrid";

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

  // TODO: replace next line
  const auditorium: CinemaHall = cinema[cinemaHall];

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
      <CinemaGrid auditorium={auditorium}></CinemaGrid>
    </>
  );
}
