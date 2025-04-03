import React from 'react';

interface ReservationSummaryProps {
  totalCost: number;
  days: number;
}

const ReservationSummary: React.FC<ReservationSummaryProps> = ({ totalCost, days }) => {
  return (
    <div className="mb-4">
      <p>
        Koszt całkowity: <strong>{totalCost} zł</strong>
      </p>
      <p>
        Liczba dni: <strong>{days}</strong>
      </p>
    </div>
  );
};

export default ReservationSummary;
