import { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Reservation } from '../types/Reservation.types';

export const useShowReservations = (userId?: string) => {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const reservationsRef = collection(db, 'reservations');
    const q = query(reservationsRef, where("userId", "==", userId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userReservations: Reservation[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Reservation[];
      
      setReservations(userReservations);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  return { reservations, loading };
};
