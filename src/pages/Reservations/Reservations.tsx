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
	>(null); // new state to track action
	const [reservationToDelete, setReservationToDelete] = useState<string | null>(
		null
	); // to track the reservation to delete
	const [loading, setLoading] = useState(true);
	const { user } = useContext(UserContext) || {};
	const { reservationId } = useParams<{ reservationId: string }>();

	const today = new Date().toISOString().split('T')[0];

	const calculateCost = (start: string, end: string) => {
		if (start && end) {
			const diffTime = new Date(end).getTime() - new Date(start).getTime();
			const calculatedDays = Math.max(
				Math.ceil(diffTime / (1000 * 60 * 60 * 24)),
				1
			);
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
		if (!user) {
			toast.error('Musisz być zalogowany, aby dokonać rezerwacji.');
			return;
		}

		try {
			setLoading(true);
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
		if (!user || !editingReservation) {
			toast.error('Musisz być zalogowany i edytować istniejącą rezerwację.');
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
			setActionConfirmation(null); // close dialog
		}
	};

	const handleDeleteReservation = async () => {
		if (!reservationToDelete) return;

		try {
			setLoading(true);
			const reservationRef = doc(db, 'reservations', reservationToDelete);
			await deleteDoc(reservationRef);
			toast.success('Rezerwacja została usunięta.');
			setReservationToDelete(null); // Reset the reservation to delete
		} catch (error) {
			toast.error('Błąd podczas usuwania rezerwacji.');
		} finally {
			setLoading(false);
			setActionConfirmation(null); // close dialog
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
		setActionConfirmation(null); // Close the confirmation dialog
	};

	const handleCancelDelete = () => {
		setReservationToDelete(null); // Cancel the deletion
		setActionConfirmation(null); // Close the confirmation dialog
	};

	const handleShowConfirmation = (
		action: 'edit' | 'delete',
		reservationId?: string
	) => {
		setActionConfirmation(action);
		if (action === 'delete' && reservationId) {
			setReservationToDelete(reservationId); // Set the reservation to delete
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

					{actionConfirmation && (
						<ConfirmationDialog
							message={
								actionConfirmation === 'edit'
									? 'Czy na pewno chcesz zapisać zmiany?'
									: 'Czy na pewno chcesz usunąć tę rezerwację?'
							}
							onConfirm={
								actionConfirmation === 'edit'
									? handleEditReservation
									: handleDeleteReservation
							}
							onCancel={handleCancelDelete}
						/>
					)}

					<h2 className='text-xl font-bold mb-4'>Twoje Rezerwacje</h2>
					<ul>
						{reservations.map((reservation) => (
							<li
								key={reservation.id}
								className='p-4 bg-white shadow-md mb-4 rounded border-2 border-gray-300'
							>
								<p>Łowisko: {reservation.fishingSpot}</p>
								<p>Od: {reservation.startDate}</p>
								<p>Do: {reservation.endDate}</p>
								<p>Liczba dni: {reservation.days}</p>
								<p>Koszt: {reservation.totalCost} zł</p>
								<div className='mt-2'>
									<button
										onClick={() => handleEditClick(reservation)}
										className='bg-yellow-500 text-white py-1 px-2 rounded'
									>
										Edytuj
									</button>
									<button
										onClick={() =>
											handleShowConfirmation('delete', reservation.id)
										} // Show delete confirmation
										className='bg-red-500 text-white py-1 px-2 rounded ml-2'
									>
										Usuń
									</button>
								</div>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};

export default Reservations;
