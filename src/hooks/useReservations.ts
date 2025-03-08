import { useState, useEffect, useContext } from 'react';
import { db } from '../firebase/firebaseConfig';
import {
	collection,
	addDoc,
	onSnapshot,
	query,
	where,
	doc,
	updateDoc,
	deleteDoc,
	getDoc,
	serverTimestamp,
} from 'firebase/firestore';
import { UserContext } from '../context/UserContext';
import { Reservation } from '../types/Reservation.types';
import { toast } from 'react-toastify';

const useReservations = (reservationId?: string) => {
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [loading, setLoading] = useState(true);
	const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
	const { user } = useContext(UserContext) || {};

	useEffect(() => {
		if (!user) return;
		const q = query(collection(db, 'reservations'), where('userId', '==', user.uid));
		const unsubscribe = onSnapshot(q, (snapshot) => {
			const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Reservation[];
			setReservations(data);
			setLoading(false);
		});
		return () => unsubscribe();
	}, [user]);

	useEffect(() => {
		if (reservationId) {
			const reservationRef = doc(db, 'reservations', reservationId);
			getDoc(reservationRef).then((docSnap) => {
				if (docSnap.exists()) {
					setEditingReservation({ id: docSnap.id, ...docSnap.data() } as Reservation);
				} else {
					toast.error('Nie znaleziono rezerwacji');
				}
				setLoading(false);
			});
		}
	}, [reservationId]);

	const addReservation = async (reservation: Omit<Reservation, 'id' | 'createdAt'>) => {
		if (!user) {
			toast.error('Musisz być zalogowany, aby dokonać rezerwacji.');
			return;
		}
		try {
			setLoading(true);
			await addDoc(collection(db, 'reservations'), { ...reservation, userId: user.uid, createdAt: serverTimestamp() });
			toast.success('Rezerwacja została zapisana!');
		} catch {
			toast.error('Nie udało się zapisać rezerwacji.');
		} finally {
			setLoading(false);
		}
	};

	const editReservation = async (id: string, updatedData: Partial<Reservation>) => {
		try {
			setLoading(true);
			await updateDoc(doc(db, 'reservations', id), updatedData);
			toast.success('Rezerwacja została zaktualizowana.');
		} catch {
			toast.error('Nie udało się zaktualizować rezerwacji.');
		} finally {
			setLoading(false);
		}
	};

	const deleteReservation = async (id: string) => {
		try {
			setLoading(true);
			await deleteDoc(doc(db, 'reservations', id));
			toast.success('Rezerwacja została usunięta.');
		} catch {
			toast.error('Błąd podczas usuwania rezerwacji.');
		} finally {
			setLoading(false);
		}
	};

	return { reservations, loading, editingReservation, addReservation, editReservation, deleteReservation };
};

export default useReservations;
