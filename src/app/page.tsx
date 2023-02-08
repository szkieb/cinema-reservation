import { Inter } from "@next/font/google";
import { CINEMA_METADATA } from "util/CinemaHall";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="m-4" style={inter.style}>
      <h1 className="text-4xl">Cinema Reservation</h1>
      <h2 className="text-2xl">Please select a cinema</h2>
      <div className="grid grid-cols-2 gap-4">
        {CINEMA_METADATA.map((hall, idx) => (
          <Link href={`${hall.name}`}>
            <div
              key={idx}
              className="flex flex-col gap-y-2 rounded-md bg-slate-200 p-4"
            >
              <img src={hall.ImgSrc} alt={hall.ImgSrc} />
              <p className="font-semibold">Cinema Hall {idx + 1}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
