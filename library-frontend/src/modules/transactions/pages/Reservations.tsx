import { useEffect, useState } from "react";
import ReservationQueue from "../components/ReservationQueue";
import type { Reservation } from "../types/reservation.types";
import { dbPromise } from "../../../lib/db";

const Reservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const loadReservations = async () => {
      const db = await dbPromise;
      const data = await db.getAll("reservations");
      setReservations(data as Reservation[]);
    };

    loadReservations();
  }, []);

  const handleNotify = async (reservation: Reservation) => {
    const db = await dbPromise;

    const updatedReservation: Reservation = {
      ...reservation,
      status: "notified",
    };

    await db.put("reservations", updatedReservation);

    setReservations((prev) =>
      prev.map((r) =>
        r.id === reservation.id ? updatedReservation : r
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Reservations
      </h1>

      <ReservationQueue
        reservations={reservations}
        onNotify={handleNotify}
      />
    </div>
  );
};

export default Reservations;