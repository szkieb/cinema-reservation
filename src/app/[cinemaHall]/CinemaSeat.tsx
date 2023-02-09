import clsx from "clsx";
import { useState, useEffect } from "react";
import { MdEventSeat, MdOutlineChair } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";

import { CoupleSeatClass, SeatClass } from "util/cinemaSeatReservation";

type CinemaSeatProps = {
  clickhandler: () => void;
  seat: SeatClass | CoupleSeatClass;
  seatSelection: (SeatClass | CoupleSeatClass)[];
  reserved: boolean;
};

export function CinemaSeat({
  clickhandler,
  seat: currentSeat,
  reserved,
  seatSelection,
}: CinemaSeatProps) {
  const [useSelect, setSelect] = useState(false);

  useEffect(() => {
    // look up useReservation and update current seat if found
    if (
      seatSelection.some(
        (prevSelectedSeat) =>
          prevSelectedSeat.row === currentSeat.row &&
          prevSelectedSeat.place === currentSeat.place
      )
    ) {
      setSelect(true);
    } else {
      setSelect(false);
    }
  }, [seatSelection, currentSeat]);

  return (
    <button
      className={clsx(
        "flex h-full w-full flex-col content-center justify-evenly p-1",
        useSelect ? "bg-green-500" : reserved ? "bg-red-600" : "bg-inherit"
      )}
      onClick={clickhandler}
    >
      <SeatIcon seat={currentSeat} />
    </button>
  );
}

type SeatIconProps = {
  seat: SeatClass | CoupleSeatClass;
};

function SeatIcon({ seat }: SeatIconProps) {
  let icon;
  let seatType = "Seat";
  let couple = false;

  if ("connected" in seat) {
    couple = true;
    seatType = "Couple Seat";
    icon = (
      <div className="relative flex h-1/3 justify-center self-center">
        <MdOutlineChair className="relative h-full w-full" />
        <IoMdHeart className="absolute -top-0.5 h-3/5 w-3/5 fill-red-300" />
      </div>
    );
  } else {
    icon = <MdEventSeat className="h-1/3 w-auto" />;
  }

  return (
    <>
      {icon}
      <p className={clsx(couple ? "text-xs" : "text-sm")}>
        {seatType} {seat.place}
      </p>
    </>
  );
}
