import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import LogoutButton2 from '../../components/Shared/LogoutButton2/LogoutButton2';
import { ClipLoader } from 'react-spinners';
import ReservationsList from '../../components/Shared/ReservationsList/ReservationsList';
import UserProfile from '../../components/Account/UserProfile/UserProfile';
import { useShowReservations } from '../../hooks/useShowReservations';

const Account: React.FC = () => {
	const userContext = useContext(UserContext);
	const user = userContext?.user;
	const navigate = useNavigate();

	const { reservations, loading } = useShowReservations(user?.uid);

	const handleEditClick = (reservationId: string) => {
		navigate(`/reservations/${reservationId}`);
	};

	return (
		<div className='min-h-screen bg-white p-6'>
			<div className='flex flex-col items-center'>
				{user && <UserProfile user={user} />}

				{loading ? (
					<div className='flex justify-center items-center h-32'>
						<ClipLoader color='#3498db' size={50} loading={loading} />
					</div>
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
