import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { db } from '../../firebase/firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const ReservationForm: React.FC = () => {
  const [fishingSpot, setFishingSpot] = useState('Łowisko1'); 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const { user } = useContext(UserContext) || {};

  const today = new Date().toISOString().split('T')[0];

  const calculateCost = (start: string, end: string) => {
    if (start && end) {
      const diffTime = new Date(end).getTime() - new Date(start).getTime();
     
      const calculatedDays = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1); 
      setDays(calculatedDays);
      setTotalCost(calculatedDays * 50);
    } else {
      setDays(0);
      setTotalCost(0);
    }
  };

  useEffect(() => {
    calculateCost(startDate, endDate);
  }, [startDate, endDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Musisz być zalogowany, aby dokonać rezerwacji.');
      return;
    }

    try {
      const reservationRef = collection(db, 'reservations');
      await addDoc(reservationRef, {
        userId: user.uid,
        fishingSpot,
        startDate,
        endDate,
        days,
        totalCost,
        createdAt: serverTimestamp(),
      });
      alert('Rezerwacja została zapisana!');
    } catch (error) {
      console.error('Błąd podczas zapisu rezerwacji:', error);
      alert('Nie udało się zapisać rezerwacji.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      <h1 className="text-xl font-bold mb-4">Zarezerwuj Łowisko</h1>
      <div className="mb-4">
        <label className="block mb-1">Łowisko</label>
        <select
          value={fishingSpot}
          onChange={(e) => setFishingSpot(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="Łowisko1">Łowisko 1</option>
          <option value="Łowisko2">Łowisko 2</option>
          <option value="Łowisko3">Łowisko 3</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Data rozpoczęcia</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
          min={today}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Data zakończenia</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
          min={startDate || today}
        />
      </div>
      <div className="mb-4">
        <p>
          Koszt całkowity: <strong>{totalCost} zł</strong>
        </p>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Zarezerwuj
      </button>
    </form>
  );
};

export default ReservationForm;
