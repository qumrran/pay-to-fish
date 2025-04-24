import { Reservation } from "./Reservation.types";

export interface ReservationListProps {
  reservations: Reservation[];
  handleEditClick: (reservation: Reservation) => void;
  handleShowConfirmation: (action: 'edit' | 'delete', reservationId?: string) => void;
}
