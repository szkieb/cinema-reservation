import clsx from "clsx";
import Link from "next/link";

export default function Sidebar({ className }: { className?: string }) {
  return (
    <div className={clsx("sidebar flex h-fit flex-col gap-2", className)}>
      <h2>Objectives</h2>
      <p>
        Below are the guidelines used for this reservation tool. The guidelines
        are taken from a coding challenge found at{" "}
        <a target={"_blank"} href="https://platform.entwicklerheld.de/">
          entwicklerheld.de
        </a>
      </p>
      <h3>Reserved or not reserved?</h3>
      <p>
        Some seats in the cinema halls are already reserved. Check whether the
        seats are available or reserved!
      </p>
      <h3>Deselection of seats</h3>
      <p>
        By clicking on a selected seat it should be marked as unselected again.
      </p>
      <h3>Don't leave a single place!</h3>
      <p>
        Because the cinema is not that big, it's dependent on every sold ticket.
        So it would cost a lot of revenue if visitors would leave a single seat
        between others. That's why your seat may be moved if you leave a single
        place to other reserved seats.
      </p>
      <h3> Maybe your whole selection has to move!</h3>
      <p>
        Groups have the same behavior like single chairs. Instead of checking
        left and right of the seat, you check left and right at the edges of the
        group for a movement of the whole group. This should happen every time
        if your grouped selection causes a single empty place (except if the
        group is placed next to another reserved seat).
      </p>
      <h3>Move to a CoupleSeat </h3>
      <p>
        Whether you like couples or not, you may need to move to CoupleSeats to
        fill single places. Because CoupleSeats can't be moved in the cinema, we
        need to move a single place or a group selection next to the CoupleSeat.
      </p>
      <br />
      <p>
        Visit the <Link href={"/about"}>About Page </Link> for a detailed
        description of the algorithm's objectives
      </p>
    </div>
  );
}
