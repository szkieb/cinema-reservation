import BackButton from "./BackButton";
import { CINEMA_METADATA } from "_data/cinemaHalls/CinemaHall";
import CinemaGrid from "./CinemaGrid";
import HeaderComponent from "../../app/headerComponent";
import Sidebar from "./Sidebar";

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
      <div className="flex justify-evenly gap-4 p-6">
        <CinemaGrid cinemaHall={cinemaHall}></CinemaGrid>
        <Sidebar className="- w-1/4 rounded-md bg-slate-200 p-4 text-justify text-sm" />
      </div>
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
