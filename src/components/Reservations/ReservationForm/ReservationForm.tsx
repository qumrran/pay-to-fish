import React from 'react';
import { ReservationFormProps } from '../../../types/ReservationForm.types';
import SubmitButton from './SubmitButton/SubmitButton';
import CancelButton from './CancelButton/CancelButton';
import FishingSpotSelect from './FishingSpotSelect/FishingSpotSelect';
import DateInput from './DateInput/DateInput';
import ReservationSummary from './ReservationSummary/ReservationSummary';
import ReservationHeader from './ReservationHeader/ReservationHeader';

const ReservationForm: React.FC<ReservationFormProps> = ({
  fishingSpot,
  setFishingSpot,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  totalCost,
  days,
  editingReservation,
  handleCancelEdit,
  handleShowConfirmation,
  handleAddReservation,
  today,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (editingReservation) {
          handleShowConfirmation('edit');
        } else {
          handleAddReservation(e);
        }
      }}
      className='mb-8 p-4 shadow-md rounded border-2 border-gray-300'
    >
      <ReservationHeader editingReservation={editingReservation} />

      <FishingSpotSelect value={fishingSpot} onChange={setFishingSpot} />
      <DateInput
        label='Data rozpoczęcia'
        value={startDate}
        onChange={setStartDate}
        min={today}
      />
      <DateInput
        label='Data zakończenia'
        value={endDate}
        onChange={setEndDate}
        min={startDate || today}
      />
      <ReservationSummary totalCost={totalCost} days={days} />

      <div className='flex justify-start gap-2'>
        <SubmitButton isEditing={editingReservation} />
        {editingReservation && <CancelButton onClick={handleCancelEdit} />}
      </div>
    </form>
  );
};

export default ReservationForm;
