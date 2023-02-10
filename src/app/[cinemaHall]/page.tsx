import BackButton from "./BackButton";
import { CINEMA_METADATA } from "_data/cinemaHalls/CinemaHall";
import CinemaGrid from "./CinemaGrid";
import HeaderComponent from "../../app/headerComponent";

type CinemaHallProps = {
  params: {
    cinemaHall: string;
  };
};

export default function CinemaAuditorium({
  params: { cinemaHall },
}: CinemaHallProps) {
  const hallNumber = parseInt(cinemaHall.charAt(cinemaHall.length - 1)) + 1;

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
      <CinemaGrid cinemaHall={cinemaHall}></CinemaGrid>
    </>
  );
}

export function generateStaticParams() {
  const cinemaHalls = CINEMA_METADATA.map((hall) => {
    return hall;
  });

  return cinemaHalls.map((hall) => {
    return { cinemaHall: hall.name };
  });
}
