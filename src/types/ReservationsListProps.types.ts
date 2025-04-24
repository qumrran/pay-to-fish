export interface Reservation {
    id: string;
    fishingSpot: string;
    startDate: string;
    endDate: string;
    days: number;
    totalCost: number;
  }
  
  export interface ReservationsListProps {
    reservations: Reservation[];
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
  }
  