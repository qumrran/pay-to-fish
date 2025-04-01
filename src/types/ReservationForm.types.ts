export interface ReservationFormProps {
    fishingSpot: string;
    setFishingSpot: (spot: string) => void;
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    totalCost: number;
    days: number;
    editingReservation: boolean;
    handleCancelEdit: () => void;
    handleShowConfirmation: (action: 'edit' | 'delete') => void;
    handleAddReservation: (e: React.FormEvent) => void;
    today: string;
  }
  