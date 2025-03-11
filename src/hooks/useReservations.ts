import { useState, useEffect, useContext } from 'react';
import { db } from '../firebase/firebaseConfig';
import {
	collection,
	addDoc,
	serverTimestamp,
	query,
	where,
	onSnapshot,
	doc,
	updateDoc,
	deleteDoc,
	getDoc,
} from 'firebase/firestore';
import { UserContext } from '../context/UserContext';
import { Reservation } from '../types/Reservation.types';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { calculateCost } from '../utils/calculateCost';

export const useReservations = () => {
	const [fishingSpot, setFishingSpot] = useState('Łowisko1');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [days, setDays] = useState(0);
	const [totalCost, setTotalCost] = useState(0);
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
	const [actionConfirmation, setActionConfirmation] = useState<'edit' | 'delete' | null>(null);
	const [reservationToDelete, setReservationToDelete] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	const { user } = useContext(UserContext) || {};
	const { reservationId } = useParams<{ reservationId: string }>();
	const today = new Date().toISOString().split('T')[0]; 

	useEffect(() => {
		const { days, totalCost } = calculateCost(startDate, endDate);
		setDays(days);
		setTotalCost(totalCost);
	}, [startDate, endDate]);

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
		if (!reservationId) return;

		const reservationRef = doc(db, 'reservations', reservationId);
		getDoc(reservationRef)
			.then((docSnap) => {
				if (docSnap.exists()) {
					const data = docSnap.data();
					setEditingReservation({ id: docSnap.id, ...data } as Reservation);
					setFishingSpot(data.fishingSpot);
					setStartDate(data.startDate);
					setEndDate(data.endDate);
					setDays(data.days);
					setTotalCost(data.totalCost);
				} else {
					toast.error('Nie znaleziono rezerwacji');
				}
			})
			.catch(() => toast.error('Błąd podczas pobierania rezerwacji'))
			.finally(() => setLoading(false));
	}, [reservationId]);

	const handleAddReservation = async () => {
		if (!user) return toast.error('Musisz być zalogowany.');

		try {
			setLoading(true);
			await addDoc(collection(db, 'reservations'), {
				userId: user.uid,
				fishingSpot,
				startDate,
				endDate,
				days,
				totalCost,
				createdAt: serverTimestamp(),
			});
			toast.success('Rezerwacja została zapisana!');
			resetForm();
		} catch (error) {
			toast.error('Nie udało się zapisać rezerwacji.');
		} finally {
			setLoading(false);
		}
	};

	const handleEditReservation = async () => {
		if (!editingReservation) return toast.error('Nie znaleziono rezerwacji do edycji.');

		try {
			setLoading(true);
			await updateDoc(doc(db, 'reservations', editingReservation.id), {
				fishingSpot,
				startDate,
				endDate,
				days,
				totalCost,
			});
			toast.success('Rezerwacja została zaktualizowana.');
			handleCancelEdit();
		} catch (error) {
			toast.error('Nie udało się zaktualizować rezerwacji.');
		} finally {
			setLoading(false);
			setActionConfirmation(null);
		}
	};

	const handleDeleteReservation = async () => {
		if (!reservationToDelete) return;

		try {
			setLoading(true);
			await deleteDoc(doc(db, 'reservations', reservationToDelete));
			toast.success('Rezerwacja została usunięta.');
			setReservationToDelete(null);
		} catch (error) {
			toast.error('Błąd podczas usuwania rezerwacji.');
		} finally {
			setLoading(false);
			setActionConfirmation(null);
		}
	};

	const handleEditClick = (reservation: Reservation) => {
		setEditingReservation(reservation);
		setFishingSpot(reservation.fishingSpot);
		setStartDate(reservation.startDate);
		setEndDate(reservation.endDate);
		setDays(reservation.days);
		setTotalCost(reservation.totalCost);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const handleCancelEdit = () => {
		resetForm();
	};

	const handleCancelDelete = () => {
		setReservationToDelete(null);
		setActionConfirmation(null);
	};

	const handleShowConfirmation = (action: 'edit' | 'delete', reservationId?: string) => {
		setActionConfirmation(action);
		if (action === 'delete' && reservationId) {
			setReservationToDelete(reservationId);
		}
	};

	const resetForm = () => {
		setEditingReservation(null);
		setFishingSpot('Łowisko1');
		setStartDate('');
		setEndDate('');
		setDays(0);
		setTotalCost(0);
		setActionConfirmation(null);
	};

	return {
		fishingSpot,
		setFishingSpot,
		startDate,
		setStartDate,
		endDate,
		setEndDate,
		days,
		totalCost,
		reservations,
		editingReservation,
		actionConfirmation,
		reservationToDelete,
		loading,
		today, 
		handleAddReservation,
		handleEditReservation,
		handleDeleteReservation,
		handleEditClick,
		handleCancelEdit,
		handleCancelDelete, 
		handleShowConfirmation, 
	};
};
