import { Inter } from "@next/font/google";
import Link from "next/link";
import Image from "next/image";

import { CINEMA_METADATA, CINEMA } from "_data//cinemaHalls/CinemaHall";
import HeaderComponent from "./headerComponent";
import { Cinema, CinemaHall } from "util/cinemaSeatReservation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //@ts-ignore
  const cinema: Cinema = CINEMA;
  const cinemaHallArray = Object.keys(cinema).map((hall) => {
    return cinema[hall];
  });

  return (
    <>
      <HeaderComponent
        pageTitle="Cinema Reservation"
        subTitle="Please select a cinema"
      />
      <main style={inter.style}>
        <div className="grid grid-cols-2 gap-5 p-4">
          {CINEMA_METADATA.map((hall, idx) => (
            <Link href={`${hall.name}`} className="h-full w-full" key={idx}>
              <div className="flex h-full w-full flex-col gap-y-2 rounded-md bg-slate-200 p-4 ">
                <Image
                  height={500}
                  width={500}
                  src={hall.ImgSrc}
                  alt={hall.ImgSrc}
                  className="h-full w-full object-cover"
                />
                <p className="font-semibold">Cinema Hall {idx + 1}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

// export function generateStaticParams() {
//   // @ts-ignore
//   const cinema: Cinema = CINEMA;
//   const cinemaHallArray = Object.keys(cinema).map((hall) => {
//     return cinema[hall];
//   });
//   return cinemaHallArray;
// }
