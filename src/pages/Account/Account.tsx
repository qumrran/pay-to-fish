import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { db } from '../../firebase/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import LogoutButton2 from '../../components/LogoutButton2/LogoutButton2';
import { Reservation } from '../../types/Reservation.types';
import ReservationsList from '../../components/Shared/ReservationsList/ReservationsList';
import UserProfile from '../../components/Account/UserProfile/UserProfile';
import Loader from '../../components/Shared/Loader/Loader';

const Account: React.FC = () => {
	const userContext = useContext(UserContext);
	const user = userContext?.user;
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [reservations, setReservations] = useState<Reservation[]>([]);

	useEffect(() => {
		if (user) {
			const reservationsRef = collection(db, 'reservations');
			const q = query(reservationsRef, where('userId', '==', user.uid));

			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const userReservations: Reservation[] = querySnapshot.docs.map(
					(doc) =>
						({
							id: doc.id,
							...doc.data(),
						} as Reservation)
				);
				setReservations(userReservations);
				setLoading(false);
			});

			return () => unsubscribe();
		}
	}, [user?.uid]);

	const handleEditClick = (reservationId: string) => {
		navigate(`/reservations/${reservationId}`);
	};

	return (
		<div className='min-h-screen bg-white p-6'>
			<div className='flex flex-col items-center'>
				<UserProfile user={user} />

				{loading ? (
					<Loader />
				) : (
					<ReservationsList
						reservations={reservations}
						onEdit={handleEditClick}
					/>
				)}
				<LogoutButton2 />
			</div>
		</div>
	);
};

export default Account;
