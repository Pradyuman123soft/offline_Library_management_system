export type ReservationStatus =
  | "waiting"
  | "notified"
  | "completed";

export interface Reservation {
  id: string;
  bookId: string;
  memberId: string;

  reservationDate: string;

  status: ReservationStatus;
  syncStatus: "pending" | "synced";

  createdAt: string;
}