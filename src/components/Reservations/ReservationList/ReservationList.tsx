import React from 'react';
import { ReservationListProps } from '../../../types/ReservationList.types';
import { sortReservations } from '../../../utils/sortReservations'; 

const ReservationList: React.FC<ReservationListProps> = ({
  reservations,
  handleEditClick,
  handleShowConfirmation,
}) => {
  const today = new Date().toISOString().split('T')[0];

  const sortedReservations = sortReservations(reservations); 

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Twoje Rezerwacje</h2>
      <ul>
        {sortedReservations.map((reservation) => {
          const isPast = reservation.endDate < today;

          return (
            <li
              key={reservation.id}
              className={`p-4 shadow-md mb-4 rounded border-2 ${
                isPast ? 'bg-gray-100 border-gray-300 text-gray-500' : 'bg-white border-gray-300'
              }`}
            >
              <p>Łowisko: {reservation.fishingSpot}</p>
              <p>Od: {reservation.startDate}</p>
              <p>Do: {reservation.endDate}</p>
              <p>Liczba dni: {reservation.days}</p>
              <p>Koszt: {reservation.totalCost} zł</p>

              {isPast && (
                <p className="mt-2 font-semibold text-red-500">Rezerwacja zakończona</p>
              )}

              <div className="mt-2">
                <button
                  onClick={() => handleEditClick(reservation)}
                  disabled={isPast}
                  className={`py-1 px-2 rounded transition duration-300 ${
                    isPast
                      ? 'bg-yellow-300 text-white cursor-not-allowed'
                      : 'bg-yellow-500 text-white hover:bg-yellow-600'
                  }`}
                >
                  Edytuj
                </button>
                <button
                  onClick={() => handleShowConfirmation('delete', reservation.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded ml-2 transition duration-300 hover:bg-red-600"
                >
                  Usuń
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ReservationList;
