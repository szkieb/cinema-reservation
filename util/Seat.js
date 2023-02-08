export function Seat(row, place, reserved) {
  this.row = row;
  this.place = place;
  this.reserved = reserved;
}

export function CoupleSeat(row, place, reserved, connected) {
  Seat.call(this, row, place, reserved);
  this.connected = connected;
}

CoupleSeat.prototype = new Seat();
