import { dbPromise } from "../../../lib/db";
import type { Reservation } from "../types/reservation.types";

export const addReservation = async (reservation: Reservation) => {
  const db = await dbPromise;

  await db.put("reservations", reservation);

  await db.add("syncQueue", {
    type: "reservation_create",
    payload: reservation,
    createdAt: new Date().toISOString(),
  });
};