import React from 'react';
import { Reservation } from '../../../types/Reservation.types';

interface ReservationListProps {
  reservations: Reservation[];
  handleEditClick: (reservation: Reservation) => void;
  handleShowConfirmation: (action: 'edit' | 'delete', reservationId?: string) => void;
}

const ReservationList: React.FC<ReservationListProps> = ({ reservations, handleEditClick, handleShowConfirmation }) => {
  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>Twoje Rezerwacje</h2>
      <ul>
        {reservations.map((reservation) => (
          <li
            key={reservation.id}
            className='p-4 bg-white shadow-md mb-4 rounded border-2 border-gray-300'
          >
            <p>Łowisko: {reservation.fishingSpot}</p>
            <p>Od: {reservation.startDate}</p>
            <p>Do: {reservation.endDate}</p>
            <p>Liczba dni: {reservation.days}</p>
            <p>Koszt: {reservation.totalCost} zł</p>
            <div className='mt-2'>
              <button
                onClick={() => handleEditClick(reservation)}
                className='bg-yellow-500 text-white py-1 px-2 rounded transition duration-300 hover:bg-yellow-600'
              >
                Edytuj
              </button>
              <button
                onClick={() => handleShowConfirmation('delete', reservation.id)}
                className='bg-red-500 text-white py-1 px-2 rounded ml-2 transition duration-300 hover:bg-red-600'
              >
                Usuń
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
