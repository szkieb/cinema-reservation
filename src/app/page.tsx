import { Inter } from "@next/font/google";
import { CINEMA_METADATA } from "util/CinemaHall";
import Link from "next/link";
import HeaderComponent from "./headerComponent";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
