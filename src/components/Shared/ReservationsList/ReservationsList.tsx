import React from 'react';
import { ReservationsListProps } from '../../../types/ReservationsListProps.types';
import { sortReservations } from '../../../utils/sortReservations';

const ReservationsList: React.FC<ReservationsListProps> = ({ reservations, onEdit, onDelete }) => {
  if (reservations.length === 0) return <p>Brak rezerwacji</p>;

  const today = new Date().toISOString().split('T')[0];
  const sortedReservations = sortReservations(reservations);

  return (
    <ul className="w-full max-w-3xl mx-auto">
      {sortedReservations.map((reservation) => {
        const isPastReservation = reservation.endDate < today;

        return (
          <li
            key={reservation.id}
            className={`p-6 bg-white shadow-lg mb-6 rounded border-2 w-full ${
              isPastReservation ? 'border-gray-400 opacity-50' : 'border-gray-300'
            }`}
          >
            <p className="text-lg font-semibold">Łowisko: {reservation.fishingSpot}</p>
            <p>Od: {reservation.startDate}</p>
            <p>Do: {reservation.endDate}</p>
            <p>Liczba dni: {reservation.days}</p>
            <p className="font-bold">Koszt: {reservation.totalCost} zł</p>

            <div className="mt-4 flex gap-4">
              {!isPastReservation && onEdit && (
                <button
                  onClick={() => onEdit(reservation.id)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-yellow-600"
                >
                  Edytuj
                </button>
              )}
              {!isPastReservation && onDelete && (
                <button
                  onClick={() => onDelete(reservation.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-red-600"
                >
                  Usuń
                </button>
              )}
            </div>

            {isPastReservation && (
              <p className="text-m text-gray-500 mt-2">Rezerwacja zakończona</p>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ReservationsList;
