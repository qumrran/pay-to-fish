import { Reservation } from '../types/Reservation.types';

export const sortReservations = (reservations: Reservation[]): Reservation[] => {
  return [...reservations].sort((a, b) => {
    if (a.startDate > b.startDate) return -1;
    if (a.startDate < b.startDate) return 1;
    return 0;
  });
};
