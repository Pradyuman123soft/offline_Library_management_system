import React from "react";
import type { Reservation } from "../types/reservation.types";

interface ReservationQueueProps {
  reservations: Reservation[];
  onNotify: (reservation: Reservation) => Promise<void>;
}

const ReservationQueue: React.FC<ReservationQueueProps> = ({
  reservations,
  onNotify,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Reservation Queue
      </h2>

      {reservations.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No reservations available.
        </p>
      ) : (
        <div className="space-y-4">
          {reservations.map((reservation, index) => (
            <div
              key={reservation.id}
              className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-3"
            >
              <div>
                <p className="text-gray-800 font-medium">
                  Member ID: {reservation.memberId}
                </p>
                <p className="text-sm text-gray-500">
                  Position #{index + 1}
                </p>
              </div>

              <button
                onClick={() => onNotify(reservation)}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Notify
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationQueue;