import React from 'react';
import { FaRegEdit, FaRegCalendar } from 'react-icons/fa';

interface ReservationHeaderProps {
  editingReservation: boolean;
}

const ReservationHeader: React.FC<ReservationHeaderProps> = ({ editingReservation }) => {
  return (
    <h1 className='text-xl font-bold mb-4 flex items-center gap-2'>
      {editingReservation ? (
        <>
          <FaRegEdit />
          Edytuj Rezerwację
        </>
      ) : (
        <>
          <FaRegCalendar />
          Zarezerwuj Łowisko
        </>
      )}
    </h1>
  );
};

export default ReservationHeader;
