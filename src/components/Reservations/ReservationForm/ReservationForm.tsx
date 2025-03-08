import React from 'react';
import { FaRegEdit, FaRegCalendar } from 'react-icons/fa';

interface ReservationFormProps {
  fishingSpot: string;
  setFishingSpot: (spot: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  totalCost: number;
  days: number;
  editingReservation: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handleCancelEdit: () => void;
  handleShowConfirmation: (action: 'edit') => void; 
  handleAddReservation: (e: React.FormEvent) => void; 
  today: string;
}

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
              <div className='mb-4'>
                <label className='block mb-1'>Łowisko</label>
                <select
                  value={fishingSpot}
                  onChange={(e) => setFishingSpot(e.target.value)}
                  required
                  className='w-full px-3 py-2 border-2 border-gray-300 rounded bg-white text-black focus:outline-none focus:ring focus:ring-cyan-500'
                >
                  <option value='Łowisko1'>Łowisko 1</option>
                  <option value='Łowisko2'>Łowisko 2</option>
                  <option value='Łowisko3'>Łowisko 3</option>
                </select>
              </div>
              <div className='mb-4'>
                <label className='block mb-1'>Data rozpoczęcia</label>
                <input
                  type='date'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                  required
                  className='w-full px-3 py-2 border-2 border-gray-300 rounded cursor-pointer focus:outline-none focus:ring focus:ring-cyan-500'
                  min={today}
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-1'>Data zakończenia</label>
                <input
                  type='date'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                  required
                  className='w-full px-3 py-2 border-2 border-gray-300 rounded cursor-pointer focus:outline-none focus:ring focus:ring-cyan-500'
                  min={startDate || today}
                />
              </div>
              <div className='mb-4'>
                <p>
                  Koszt całkowity: <strong>{totalCost} zł</strong>
                </p>
                <p>
                  Liczba dni: <strong>{days}</strong>
                </p>
              </div>
              <button
                type='submit'
                className='bg-cyan-500  hover:bg-cyan-600 transition-colors duration-300 text-white py-2 px-4 rounded'
              >
                {editingReservation ? 'Zapisz zmiany' : 'Zarezerwuj'}
              </button>
   
              {editingReservation && (
                <button
                  type='button'
                  onClick={handleCancelEdit}
                  className='bg-gray-500 text-white py-2 px-4 rounded ml-2  hover:bg-gray-400 transition-colors duration-300'
                >
                  Anuluj
                </button>
              )}
            </form>
  );
};

export default ReservationForm;
