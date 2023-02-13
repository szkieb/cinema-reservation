import { Inter } from "@next/font/google";
import Link from "next/link";
import Image from "next/image";

import { CINEMA_METADATA } from "_data//cinemaHalls/CinemaHall";
import HeaderComponent from "./headerComponent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <HeaderComponent
        pageTitle="Cinema Reservation"
        subTitle="Please select a cinema"
      />
      <main style={inter.style}>
        <p className="rounded-b-md bg-slate-200 py-6 px-14 text-justify text-lg ">
          Choose between four different cinema halls, each with a different
          layout. See which seats are already reserved and select seats that you
          wish to reserve yourself. The reservation algorithm will check your
          request and update it in accordance with the{" "}
          <Link href={"/about"}>reservation objectives</Link>. Objectives as
          well as the data structure for cinema halls and seats are part of a
          coding challenge found at{" "}
          <a target={"_blank"} href="https://platform.entwicklerheld.de/">
            entwicklerheld.de
          </a>
        </p>
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
