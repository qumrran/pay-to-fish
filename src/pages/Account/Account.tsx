import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { FaCircleUser } from "react-icons/fa6";
import { db } from '../../firebase/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import LogoutButton from '../../components/LogoutButton/LogoutButton';

interface Reservation {
  id: string;
  fishingSpot: string;
  startDate: string;
  endDate: string;
  days: number;
  totalCost: number;
}

const Account: React.FC = () => {
  const userContext = useContext(UserContext);
  const user = userContext?.user; // Upewniamy się, że użytkownik jest dostępny

  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const navigate = useNavigate(); // Hook do nawigacji

  // Pobieramy rezerwacje użytkownika
  useEffect(() => {
    if (user) {
      const reservationsRef = collection(db, 'reservations');
      const q = query(reservationsRef, where("userId", "==", user.uid));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userReservations: Reservation[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Reservation[];
        setReservations(userReservations);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user?.uid]);

  // Funkcja obsługująca kliknięcie w "Edytuj"
  const handleEditClick = (reservationId: string) => {
    navigate(`/reservations/${reservationId}`); // Przekierowanie do edycji rezerwacji
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col items-center">
        {/* Avatar użytkownika */}
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mb-4 shadow-lg"
          />
        ) : (
          <FaCircleUser className="w-24 h-24 text-gray-500 mb-4" />
        )}

        <h1 className="text-4xl font-bold mb-4 text-center">Moje Konto</h1>
        <p className="text-lg text-center mb-6">
          Witaj, {user?.displayName || 'Użytkowniku'}!
        </p>

        {/* Sekcja rezerwacji */}
        <h2 className="text-xl font-bold mb-4">Twoje Rezerwacje</h2>
        {loading ? (
          <p>Ładowanie rezerwacji...</p>
        ) : (
          <ul>
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <li key={reservation.id} className="border p-4 mb-2 rounded">
                  <p>Łowisko: {reservation.fishingSpot}</p>
                  <p>Data: {reservation.startDate} - {reservation.endDate}</p>
                  <p>Liczba dni: {reservation.days}</p>
                  <p>Koszt: {reservation.totalCost} zł</p>

                  {/* Przycisk edytuj */}
                  <button
                    onClick={() => handleEditClick(reservation.id)} // Przekierowanie do strony edycji
                    className="mr-2 bg-yellow-500 text-white py-1 px-2 rounded"
                  >
                    Edytuj Rezerwację
                  </button>
                </li>
              ))
            ) : (
              <p>Brak rezerwacji</p>
            )}
          </ul>
        )}

        {/* Przycisk wylogowania */}
        <LogoutButton />
      </div>
    </div>
  );
};

export default Account;
