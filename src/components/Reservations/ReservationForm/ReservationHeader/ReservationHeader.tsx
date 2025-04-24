import React from 'react';
import { FaRegEdit, FaRegCalendar } from 'react-icons/fa';
import { ReservationHeaderProps } from '../../../../types/ReservationHeader.types';

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
