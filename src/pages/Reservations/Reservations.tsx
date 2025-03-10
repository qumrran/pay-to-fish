import React, { useState, useContext, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
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
import { UserContext } from '../../context/UserContext';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaRegEdit, FaRegCalendar } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { Reservation } from '../../types/Reservation.types';
import Loader from '../../components/Shared/Loader/Loader';
import ConfirmationDialog from '../../components/Reservations/ConfirmationDialog/ConfirmationDialog';
import ReservationForm from '../../components/Reservations/ReservationForm/ReservationForm';
import ReservationList from '../../components/Reservations/ReservationList/ReservationList';
import { calculateCost } from '../../utils/calculateCost';


const Reservations: React.FC = () => {
	const [fishingSpot, setFishingSpot] = useState('Łowisko1');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [days, setDays] = useState(0);
	const [totalCost, setTotalCost] = useState(0);
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [editingReservation, setEditingReservation] =
		useState<Reservation | null>(null);
	const [actionConfirmation, setActionConfirmation] = useState<
		'edit' | 'delete' | null
	>(null); 
	const [reservationToDelete, setReservationToDelete] = useState<string | null>(
		null
	); 
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

		const q = query(
			collection(db, 'reservations'),
			where('userId', '==', user.uid)
		);

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as Reservation[];
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
					const data = docSnap.data();
					setEditingReservation({
						id: docSnap.id,
						...data,
					} as Reservation);
					setFishingSpot(data.fishingSpot);
					setStartDate(data.startDate);
					setEndDate(data.endDate);
					setDays(data.days);
					setTotalCost(data.totalCost);
				} else {
					toast.error('Nie znaleziono rezerwacji');
				}
				setLoading(false);
			});
		}
	}, [reservationId]);

	const handleAddReservation = async (e: React.FormEvent) => {
		e.preventDefault();
		

		try {
			setLoading(true);
			const reservationRef = collection(db, 'reservations');
			await addDoc(reservationRef, {
				userId: user!.uid,
				fishingSpot,
				startDate,
				endDate,
				days,
				totalCost,
				createdAt: serverTimestamp(),
			});
			toast.success('Rezerwacja została zapisana!');
			setFishingSpot('Łowisko1');
			setStartDate('');
			setEndDate('');
			setDays(0);
			setTotalCost(0);
		} catch (error) {
			toast.error('Nie udało się zapisać rezerwacji.');
		} finally {
			setLoading(false);
		}
	};

	const handleEditReservation = async () => {
		if (!editingReservation) {
			toast.error('Nie znaleziono rezerwacji do edycji.');
			return;
		}
	
		try {
			setLoading(true);
			const reservationRef = doc(db, 'reservations', editingReservation.id);
			await updateDoc(reservationRef, {
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
			const reservationRef = doc(db, 'reservations', reservationToDelete);
			await deleteDoc(reservationRef);
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
		setEditingReservation(null);
		setFishingSpot('Łowisko1');
		setStartDate('');
		setEndDate('');
		setDays(0);
		setTotalCost(0);
		setActionConfirmation(null); 
	};

	const handleCancelDelete = () => {
		setReservationToDelete(null); 
		setActionConfirmation(null); 
	};

	const handleShowConfirmation = (
		action: 'edit' | 'delete',
		reservationId?: string
	) => {
		setActionConfirmation(action);
		if (action === 'delete' && reservationId) {
			setReservationToDelete(reservationId); 
		}
	};

	return (
		<div className='p-4 mx-auto w-full max-w-3xl'>
			<ToastContainer
				position='top-center'
				autoClose={1000}
				hideProgressBar={false}
				closeOnClick={true}
				pauseOnHover={false}
				draggable={false}
				theme='dark'
			/>

			{loading ? (
				<Loader />
			) : (
				<>
					<ReservationForm
						fishingSpot={fishingSpot}
						setFishingSpot={setFishingSpot}
						startDate={startDate}
						setStartDate={setStartDate}
						endDate={endDate}
						setEndDate={setEndDate}
						totalCost={totalCost}
						days={days}
						editingReservation={!!editingReservation}
						handleSubmit={handleEditReservation}
						handleCancelEdit={handleCancelEdit}
						handleShowConfirmation={handleShowConfirmation}
						handleAddReservation={handleAddReservation}
						today={today}
					/>

					{actionConfirmation && (
						<ConfirmationDialog
							message={
								actionConfirmation === 'edit'
									? 'Czy na pewno chcesz zapisać zmiany?'
									: 'Czy na pewno chcesz usunąć rezerwację?'
							}
							onConfirm={
								actionConfirmation === 'edit'
									? handleEditReservation
									: handleDeleteReservation
							}
							onCancel={handleCancelDelete}
						/>
					)}
					<ReservationList
						reservations={reservations}
						handleEditClick={handleEditClick}
						handleShowConfirmation={handleShowConfirmation}
					/>
				</>
			)}
		</div>
	);
};

export default Reservations;
