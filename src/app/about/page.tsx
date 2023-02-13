import HeaderComponent from "../../app/headerComponent";
import Link from "next/link";

export default function About() {
  return (
    <>
      <HeaderComponent pageTitle="About" subTitle="Cinema Seat Reservation" />
      <div className="flex flex-col gap-5  rounded-md bg-slate-200 py-6 px-14 text-justify leading-9">
        <p>
          Choose between four different cinema halls, each with a different
          layout. See which seats are already reserved and select seats that you
          wish to reserve yourself.
          <br />
          The reservation algorithm will check your request and update it in
          accordance with the{" "}
          <Link href={"/about"}>reservation objectives</Link>. Objectives as
          well as the data structure for cinema halls and seats are part of a
          coding challenge found at{" "}
          <a target={"_blank"} href="https://platform.entwicklerheld.de/">
            entwicklerheld.de
          </a>
          .
        </p>
        <h2>Objectives</h2>
        <p>
          Below are the guidelines used for this reservation tool. The
          guidelines are taken from a coding challenge found at{" "}
          <a target={"_blank"} href="https://platform.entwicklerheld.de/">
            entwicklerheld.de
          </a>
          .<br /> The cinema consists of cinema halls (CinemaHall.js). A Cinema
          hall consists of rows of Seats and/or CoupleSeats (Seat.js). Note that
          the function always gets a copy of a cinema hall and its seats because
          we are not allowed to change the cinema hall (it’s just the selection
          part, we are not going to buy the tickets). Every time you click a
          seat, your version of the function reserve() is called.
        </p>
        <h3>Reserved or not reserved?</h3>
        <p>
          Some seats in the cinema halls are already reserved. Check whether the
          seats are available or reserved! You shouldn't change the cinema
          halls, because we are not going to buy the tickets. Given is the seat
          CINEMA.CINEMA_HALL_0[3][5]. Take a look at CINEMA_HALL_0 in the
          CinemaHall.js. The Seat on row 3, place 5 is not reserved yet. The
          function reserve() checks if the seat is available. If so, the
          attribute reserved is set to true because you reserved the seat. The
          function returns the reserved seat in a list: [new Seat(3, 5, true)].
          Given is the seat CINEMA.CINEMA_HALL_0[5][4]. The Seat on row 5, place
          4 is already reserved. Because the function reserve() returns just the
          seats you can reserve, it returns an empty list in this case. You also
          can choose more than one Seat but they are handled individually in
          successive reserve() calls . If you want to reserve the seats
          CINEMA.CINEMA_HALL_0[3][5] and CINEMA.CINEMA_HALL_0[3][6], the
          function reserve() takes the seats one after another. So at first it
          returns [new Seat(3, 5, true)]. Then, this result is used as the
          parameter alreadyReservedSeats of the second call which leads to: [new
          Seat(3, 5, true), new Seat(3, 6, true)]. This should work with other
          examples as well.
        </p>
        <h3>Deselection of seats</h3>
        <p>
          By clicking on a selected seat it should be marked as unselected
          again. Given is the seat CINEMA.CINEMA_HALL_0[2][5]. The Seat on row
          2, place 5 is not reserved yet, so its attribute reserved is set to
          true and it's returned as a list. After clicking the same seat again,
          you should remove it from the alreadyReservedList and return an empty
          list in this case. Given are the alreadyReservedSeats: [new Seat(2, 3,
          true), new Seat(2, 4, true), new Seat(2, 5, true)]. When clicking on
          the middle seat (new Seat(2, 4, true)) nothing should happen! Sadly
          it's not allowed to deselect seats in the middle of your selection.
          You just can deselect seats on the sides. So you return the unchanged
          alreadyReservedList. This should work with other examples as well.
          CoupleSeats Some CinemaHalls have some special seats: CoupleSeats!
          They consist of two single seats but have another attribute
          'connected' which points to the connected seat. To avoid people buying
          one ticket and getting such a big seat, the connected seat is
          automatically selected by clicking on one half of the seat. Given is
          the seat CINEMA.CINEMA_HALL_0[5][1]. The Seat on row 5, place 1 is not
          reserved yet so its attribute reserved is set to true. Because it's a
          CoupleSeat, your function reserve() returns also its connected Seat:
          [new CoupleSeat(5, 1, true, {`row: 5, place: 2`}), new CoupleSeat(5,
          2, true, {`row: 5, place: 1`})]. If you deselect one of the
          CoupleSeats, you should deselect the other also. This should work with
          other examples as well.
        </p>
        <h3>Don't leave a single place!</h3>
        <p>
          Because the cinema is not that big, it's dependent on every sold
          ticket. So it would cost a lot of revenue if visitors would leave a
          single seat between others. That's why your seat may be moved if you
          leave a single place to other reserved seats. Given is the seat
          CINEMA.CINEMA_HALL_0[1][5]. To prevent single empty places the Seat is
          moved beside the next seat. Your function reserve() returns [new
          Seat(1, 6, true)]. Keep in mind, that seats only have to move, if they
          are not placed next to another reserved seat. Now your chosen seat
          CINEMA.CINEMA_HALL_0[4][3] is between two single free places. But
          where to move? In this special case, your Seat is moved more to the
          middle (of the current row) for a better movie experience. Your
          function returns [new Seat(4, 4, true)]. Now there are two free places
          between reserved ones and you take one of them:
          CINEMA.CINEMA_HALL_0[5][5]. That's totally fine, it doesn't matter
          which of the seats is left alone. Your function returns [new Seat(5,
          5, true)]. If you select the seat CINEMA.CINEMA_HALL_0[2][2] it's
          moved to the left, because you're not allowed to leave a free place on
          the edge. Your function should return [new Seat(2, 1, true)]. Keep in
          mind, that seats only have to move, if they are not placed next to
          another reserved seat. Of course you can have a CoupleSeat if you want
          one, no matter if there are single free places around you. For the
          chosen seat CINEMA.CINEMA_HALL_0[6][2] your function returns [new
          CoupleSeat(6, 2, true, {`row: 6, place: 1`}), new CoupleSeat(6, 1,
          true, {`row: 6, place: 2`})]. For selecting first the seat
          CINEMA.CINEMA_HALL_0[4][7] and than the seat
          CINEMA.CINEMA_HALL_0[4][8] your function should return [new Seat(4, 6,
          true)] for the first selection (one selection is one function call).
          And then for the next selection [new Seat(4, 6, true), new Seat(4, 7,
          true)]. This should work with other examples as well.
        </p>
        <h3>Attention! Maybe your whole selection has to move!</h3>
        <p>
          Groups have the same behavior like single chairs. Instead of checking
          left and right of the seat, you check left and right at the edges of
          the group for a movement of the whole group. While seat
          CINEMA.CINEMA_HALL_0[1][4] is absolutely fine and doesn't need to be
          moved, the additional selection of seat CINEMA.CINEMA_HALL_0[1][5]
          should change the whole result. This should happen every time if your
          grouped selection causes a single empty place (except if the group is
          placed next to another reserved seat). For this example your function
          reserve() should return [new Seat(1, 4, true)] on selection of first
          seat CINEMA.CINEMA_HALL_0[1][4]. And then after the selection of
          CINEMA.CINEMA_HALL_0[1][5] it should return [new Seat(1, 5, true), new
          Seat(1, 6, true)]. A deselection can lead to a different seat
          placement as well. Let's take a look at the example above. Now you
          want to deselect the seat new Seat(1, 6, true). Because we must not
          leave a single seat free, the left Seat is moved to the right and the
          result is: [new Seat(1, 6, true)]. Also if there is a single place to
          the edge, your whole group should move to the edge. As an example we
          select seat CINEMA.CINEMA_HALL_0[2][6] and CINEMA.CINEMA_HALL_0[2][7].
          Your function should return [new Seat(2, 7, true), new Seat(2, 8,
          true)] after selection of the second seat. This only happens if the
          other side of the group can't be moved to a reserved seat or is
          already placed besides a reserved seat. If you don't know, if you have
          to move left or right, move always to the middle of the screen. This
          should work with other examples as well.{" "}
        </p>
        <h3>Move to a CoupleSeat </h3>
        <p>
          Whether you like couples or not, you may need to move to CoupleSeats
          to fill single places. Because CoupleSeats can't be moved in the
          cinema, we need to move a single place or a group selection next to
          the CoupleSeat. Given is the seat CINEMA.CINEMA_HALL_0[7][4]. This
          seat needs to move to the left, because there is a single place
          between it and the CoupleSeat. So your function should return [new
          Seat(7, 3, true)]. This should only be done, if no other movement of
          the seat is possible. Also groups have to move. So given are the
          (successively selected) seats CINEMA.CINEMA_HALL_0[7][5] and
          CINEMA.CINEMA_HALL_0[7][4]. Your function should return first [new
          Seat(7, 5, true)]. After reserving the second seat, it should return
          [new Seat(7, 3, true), new Seat(7, 4, true)]. This should work with
          other examples as well.
        </p>
        <h3>Coming soon</h3>
        <p>
          Bonus feature not required by the objectives: whenever the reserve
          function moves the seat selection, a message is displayed to inform
          the user why the selection had to be moved.
        </p>
      </div>
    </>
  );
}
