import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Shared/Loader/Loader';
import ConfirmationDialog from '../../components/Reservations/ConfirmationDialog/ConfirmationDialog';
import ReservationForm from '../../components/Reservations/ReservationForm/ReservationForm';
import ReservationList from '../../components/Reservations/ReservationList/ReservationList';
import { useReservations } from '../../hooks/useReservations';

const Reservations: React.FC = () => {
	const {
		fishingSpot,
		setFishingSpot,
		startDate,
		setStartDate,
		endDate,
		setEndDate,
		days,
		totalCost,
		editingReservation,
		loading,
		reservations,
		actionConfirmation,
		today,
		handleAddReservation,
		handleEditReservation,
		handleCancelEdit,
		handleEditClick,
		handleShowConfirmation,
		handleDeleteReservation,
		handleCancelDelete,
	} = useReservations();

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
