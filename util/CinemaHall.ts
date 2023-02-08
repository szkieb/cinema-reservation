import { Cinema, CinemaHall, CinemaMetadata } from "./cinemaSeatReservation";
import { CoupleSeat, Seat } from "./Seat";

//CINEMA_HALL_0 with 7 rows and 8 places per row and some coupleSeats
//1  ■ □ □ □ □ □ ■ ■
//2  □ □ □ □ □ □ □ □
//3  □ □ □ □ □ □ □ □
//4  ■ □ □ □ ■ □ □ □
//5  □□□ ■ ■ □ □ ■ ■
//6  □□□ □ □ □ ■ □ □
//7  □□□ □ □ □ □ □ ■
//   1 2 3 4 5 6 7 8

export const CINEMA_HALL_0: CinemaHall = {
  1: {
    1: new Seat(1, 1, true),
    2: new Seat(1, 2, false),
    3: new Seat(1, 3, false),
    4: new Seat(1, 4, false),
    5: new Seat(1, 5, false),
    6: new Seat(1, 6, false),
    7: new Seat(1, 7, true),
    8: new Seat(1, 8, true),
  },
  2: {
    1: new Seat(2, 1, false),
    2: new Seat(2, 2, false),
    3: new Seat(2, 3, false),
    4: new Seat(2, 4, false),
    5: new Seat(2, 5, false),
    6: new Seat(2, 6, false),
    7: new Seat(2, 7, false),
    8: new Seat(2, 8, false),
  },
  3: {
    1: new Seat(3, 1, false),
    2: new Seat(3, 2, false),
    3: new Seat(3, 3, false),
    4: new Seat(3, 4, false),
    5: new Seat(3, 5, false),
    6: new Seat(3, 6, false),
    7: new Seat(3, 7, false),
    8: new Seat(3, 8, false),
  },
  4: {
    1: new Seat(4, 1, true),
    2: new Seat(4, 2, false),
    3: new Seat(4, 3, false),
    4: new Seat(4, 4, false),
    5: new Seat(4, 5, true),
    6: new Seat(4, 6, false),
    7: new Seat(4, 7, false),
    8: new Seat(4, 8, false),
  },
  5: {
    1: new CoupleSeat(5, 1, false, { row: 5, place: 2 }),
    2: new CoupleSeat(5, 2, false, { row: 5, place: 1 }),
    3: new Seat(5, 3, true),
    4: new Seat(5, 4, true),
    5: new Seat(5, 5, false),
    6: new Seat(5, 6, false),
    7: new Seat(5, 7, true),
    8: new Seat(5, 8, true),
  },
  6: {
    1: new CoupleSeat(6, 1, false, { row: 6, place: 2 }),
    2: new CoupleSeat(6, 2, false, { row: 6, place: 1 }),
    3: new Seat(6, 3, false),
    4: new Seat(6, 4, false),
    5: new Seat(6, 5, false),
    6: new Seat(6, 6, true),
    7: new Seat(6, 7, false),
    8: new Seat(6, 8, false),
  },
  7: {
    1: new CoupleSeat(7, 1, false, { row: 7, place: 2 }),
    2: new CoupleSeat(7, 2, false, { row: 7, place: 1 }),
    3: new Seat(7, 3, false),
    4: new Seat(7, 4, false),
    5: new Seat(7, 5, false),
    6: new Seat(7, 6, false),
    7: new Seat(7, 7, false),
    8: new Seat(7, 8, true),
  },
};

//CINEMA_HALL_1 with 5 rows and 8 places per row
//1  □ □ □ □ □ □ ■ ■
//2  □ □ □ □ □ □ □ □
//3  ■ □ □ □ □ □ □ □
//4  ■ □ □ □ ■ ■ ■ ■
//5  □ □ ■ ■ □ □ ■ ■
//   1 2 3 4 5 6 7 8

export const CINEMA_HALL_1 = {
  1: {
    1: new Seat(1, 1, false),
    2: new Seat(1, 2, false),
    3: new Seat(1, 3, false),
    4: new Seat(1, 4, false),
    5: new Seat(1, 5, false),
    6: new Seat(1, 6, false),
    7: new Seat(1, 7, true),
    8: new Seat(1, 8, true),
  },
  2: {
    1: new Seat(2, 1, false),
    2: new Seat(2, 2, false),
    3: new Seat(2, 3, false),
    4: new Seat(2, 4, false),
    5: new Seat(2, 5, false),
    6: new Seat(2, 6, false),
    7: new Seat(2, 7, false),
    8: new Seat(2, 8, false),
  },
  3: {
    1: new Seat(3, 1, true),
    2: new Seat(3, 2, false),
    3: new Seat(3, 3, false),
    4: new Seat(3, 4, false),
    5: new Seat(3, 5, false),
    6: new Seat(3, 6, false),
    7: new Seat(3, 7, false),
    8: new Seat(3, 8, false),
  },
  4: {
    1: new Seat(4, 1, true),
    2: new Seat(4, 2, false),
    3: new Seat(4, 3, false),
    4: new Seat(4, 4, false),
    5: new Seat(4, 5, true),
    6: new Seat(4, 6, true),
    7: new Seat(4, 7, true),
    8: new Seat(4, 8, true),
  },
  5: {
    1: new Seat(5, 1, false),
    2: new Seat(5, 2, false),
    3: new Seat(5, 3, true),
    4: new Seat(5, 4, true),
    5: new Seat(5, 5, false),
    6: new Seat(5, 6, false),
    7: new Seat(5, 7, true),
    8: new Seat(5, 8, true),
  },
};

//CINEMA_HALL_2 with 6 rows and 8 to 11 places per row
//1  □ □ □ □ □ □ □ □
//2  □ □ □ □ □ ■ ■ ■
//3  □ □ ■ ■ ■ □ □ □
//4  □ □ □ ■ ■ □ □ □
//5  ■ ■ □ □ ■ ■ ■ ■ □ □ □
//6  □ □ □ ■ ■ ■ □ □ ■ □ □
//   1 2 3 4 5 6 7 8 9 1011

export const CINEMA_HALL_2 = {
  1: {
    1: new Seat(1, 1, false),
    2: new Seat(1, 2, false),
    3: new Seat(1, 3, false),
    4: new Seat(1, 4, false),
    5: new Seat(1, 5, false),
    6: new Seat(1, 6, false),
    7: new Seat(1, 7, false),
    8: new Seat(1, 8, false),
  },
  2: {
    1: new Seat(2, 1, false),
    2: new Seat(2, 2, false),
    3: new Seat(2, 3, false),
    4: new Seat(2, 4, false),
    5: new Seat(2, 5, false),
    6: new Seat(2, 6, true),
    7: new Seat(2, 7, true),
    8: new Seat(2, 8, true),
  },
  3: {
    1: new Seat(3, 1, false),
    2: new Seat(3, 2, false),
    3: new Seat(3, 3, true),
    4: new Seat(3, 4, true),
    5: new Seat(3, 5, true),
    6: new Seat(3, 6, false),
    7: new Seat(3, 7, false),
    8: new Seat(3, 8, false),
  },
  4: {
    1: new Seat(4, 1, false),
    2: new Seat(4, 2, false),
    3: new Seat(4, 3, false),
    4: new Seat(4, 4, true),
    5: new Seat(4, 5, true),
    6: new Seat(4, 6, false),
    7: new Seat(4, 7, false),
    8: new Seat(4, 8, false),
  },
  5: {
    1: new Seat(5, 1, true),
    2: new Seat(5, 2, true),
    3: new Seat(5, 3, false),
    4: new Seat(5, 4, false),
    5: new Seat(5, 5, true),
    6: new Seat(5, 6, true),
    7: new Seat(5, 7, true),
    8: new Seat(5, 8, true),
    9: new Seat(5, 9, false),
    10: new Seat(5, 10, false),
    11: new Seat(5, 11, false),
  },
  6: {
    1: new Seat(6, 1, false),
    2: new Seat(6, 2, false),
    3: new Seat(6, 3, false),
    4: new Seat(6, 4, true),
    5: new Seat(6, 5, true),
    6: new Seat(6, 6, true),
    7: new Seat(6, 7, false),
    8: new Seat(6, 8, false),
    9: new Seat(6, 9, true),
    10: new Seat(6, 10, false),
    11: new Seat(6, 11, false),
  },
};

//CINEMA_HALL_3 with 6 rows and 8 per row and some coupleSeats
//1  □ □ □ □ □ □ □ □
//2  ■ ■ □ □ □ ■ ■ ■
//3  □ □ ■ ■ ■ □ □ ■
//4  □□□ □ ■ ■ ■ ■■■
//5  □□□ □ □ □ □ □□□
//6  □□□ □ □ □ □ □□□
//   1 2 3 4 5 6 7 8

export const CINEMA_HALL_3 = {
  1: {
    1: new Seat(1, 1, false),
    2: new Seat(1, 2, false),
    3: new Seat(1, 3, false),
    4: new Seat(1, 4, false),
    5: new Seat(1, 5, false),
    6: new Seat(1, 6, false),
    7: new Seat(1, 7, false),
    8: new Seat(1, 8, false),
  },
  2: {
    1: new Seat(2, 1, true),
    2: new Seat(2, 2, true),
    3: new Seat(2, 3, false),
    4: new Seat(2, 4, false),
    5: new Seat(2, 5, false),
    6: new Seat(2, 6, true),
    7: new Seat(2, 7, true),
    8: new Seat(2, 8, true),
  },
  3: {
    1: new Seat(3, 1, false),
    2: new Seat(3, 2, false),
    3: new Seat(3, 3, true),
    4: new Seat(3, 4, true),
    5: new Seat(3, 5, true),
    6: new Seat(3, 6, false),
    7: new Seat(3, 7, false),
    8: new Seat(3, 8, true),
  },
  4: {
    1: new CoupleSeat(4, 1, false, { row: 4, place: 2 }),
    2: new CoupleSeat(4, 2, false, { row: 4, place: 1 }),
    3: new Seat(4, 3, false),
    4: new Seat(4, 4, true),
    5: new Seat(4, 5, true),
    6: new Seat(4, 6, true),
    7: new CoupleSeat(4, 7, true, { row: 4, place: 8 }),
    8: new CoupleSeat(4, 8, true, { row: 4, place: 7 }),
  },
  5: {
    1: new CoupleSeat(5, 1, false, { row: 5, place: 2 }),
    2: new CoupleSeat(5, 2, false, { row: 5, place: 1 }),
    3: new Seat(5, 3, false),
    4: new Seat(5, 4, false),
    5: new Seat(5, 5, false),
    6: new Seat(5, 6, false),
    7: new CoupleSeat(5, 7, false, { row: 5, place: 8 }),
    8: new CoupleSeat(5, 8, false, { row: 5, place: 7 }),
  },
  6: {
    1: new CoupleSeat(6, 1, false, { row: 6, place: 2 }),
    2: new CoupleSeat(6, 2, false, { row: 6, place: 1 }),
    3: new Seat(6, 3, false),
    4: new Seat(6, 4, false),
    5: new Seat(6, 5, false),
    6: new Seat(6, 6, false),
    7: new CoupleSeat(6, 7, false, { row: 6, place: 8 }),
    8: new CoupleSeat(6, 8, false, { row: 6, place: 7 }),
  },
};

export const CINEMA: Cinema = {
  CINEMA_HALL_0: CINEMA_HALL_0,
  CINEMA_HALL_1: CINEMA_HALL_1,
  CINEMA_HALL_2: CINEMA_HALL_2,
  CINEMA_HALL_3: CINEMA_HALL_3,
};

export const CINEMA_METADATA: CinemaMetadata = [
  {
    name: "CINEMA_HALL_0",
    ImgSrc: "https://images.unsplash.com/photo-1485095329183-d0797cdc5676",
    ImgAlt: "Cinema Hall 1",
  },
  {
    name: "CINEMA_HALL_1",
    ImgSrc: "https://images.unsplash.com/photo-1596445836561-991bcd39a86d",
    ImgAlt: "Cinema Hall 2",
  },
  {
    name: "CINEMA_HALL_2",
    ImgSrc: "https://images.unsplash.com/photo-1615414047026-802692414b79",
    ImgAlt: "Cinema Hall 3",
  },
  {
    name: "CINEMA_HALL_3",
    ImgSrc: "https://images.unsplash.com/photo-1617914309185-9e63b3badfca",
    ImgAlt: "Cinema Hall 4",
  },
];
