import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	updateProfile,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import ConfirmationEmailPopup from './ConfirmationEmailPopup/ConfirmationEmailPopup';
import googleLogo from './../../assets/images/Google__G__logo.svg';
import { MdAlternateEmail } from 'react-icons/md';

const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const [isRegistering, setIsRegistering] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [fullName, setFullName] = useState('');
	const [error, setError] = useState('');
	const [showPopup, setShowPopup] = useState(false);
	const [isResettingPassword, setIsResettingPassword] = useState(false);

	const handleEmailAuth = async () => {
		try {
			if (isRegistering) {
				const userCredential = await createUserWithEmailAndPassword(auth, email, password);
				await sendEmailVerification(userCredential.user);

				if (fullName.trim()) {
					await updateProfile(userCredential.user, { displayName: fullName });
				}
                await auth.signOut();
				setShowPopup(true);
			} else {
				const userCredential = await signInWithEmailAndPassword(auth, email, password);

				if (!userCredential.user.emailVerified) {
					setError('Proszę zweryfikować swój e-mail, zanim się zalogujesz.');
					return;
				}

				navigate('/dashboard');
			}
		} catch (err: any) {
      console.error("Błąd Firebase:", err); 
      if (err.code === 'auth/email-already-in-use') {
          setError('Konto z tym e-mailem już istnieje! Zaloguj się.');
          setIsRegistering(false);
      } else if (err.code === 'auth/weak-password') {
          setError('Hasło musi mieć co najmniej 6 znaków.');
      } else if (err.code === 'auth/invalid-email') {
          setError('Nieprawidłowy format e-maila.');
      } else if (err.code === 'auth/wrong-password') {
          setError('Nieprawidłowe hasło. Spróbuj ponownie.');
      } else if (err.code === 'auth/user-not-found') {
          setError('Nie znaleziono konta z tym e-mailem.');
      } else if (err.code === 'auth/invalid-credential') {
          setError('Nieprawidłowe dane logowania lub brak konta. Sprawdź e-mail i hasło.');
      } else {
          setError(`Wystąpił błąd: ${err.message}`); 
      }
  }
  
	};

	const handleGoogleAuth = async () => {
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
			navigate('/dashboard');
		} catch (err: any) {
			setError('Błąd logowania przez Google: ' + err.message);
		}
	};

	const handlePasswordReset = async () => {
		try {
			await sendPasswordResetEmail(auth, email);
			setError('Link do resetowania hasła został wysłany na Twój email.');
			setIsResettingPassword(false);
		} catch (err: any) {
			setError('Błąd podczas wysyłania linku resetującego: ' + err.message);
		}
	};

	const closePopup = () => {
		setShowPopup(false);
		setIsRegistering(false);
		navigate('/login');
	};

	const handleModeChange = (mode: boolean) => {
		setIsRegistering(mode);
		setError('');
	};

	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
			<div className="p-6 bg-white shadow-md rounded w-96">
				<h1 className="text-2xl font-bold mb-4">{isRegistering ? 'Zarejestruj się' : 'Zaloguj się'}</h1>

				{error && <p className="text-red-500 mb-4">{error}</p>}

				{isRegistering && (
					<input
						type="text"
						placeholder="Imię i nazwisko"
						className="w-full p-2 border mb-2 rounded focus:outline-none focus:ring focus:ring-cyan-500"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						required
					/>
				)}

				<input
					type="email"
					placeholder="Email"
					className="w-full p-2 border mb-2 rounded focus:outline-none focus:ring focus:ring-cyan-500"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Hasło"
					className="w-full p-2 border mb-4 rounded focus:outline-none focus:ring focus:ring-cyan-500"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				
				<button
					className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 mb-2 rounded flex items-center justify-center relative"
					onClick={handleEmailAuth}
				>
					<MdAlternateEmail className="w-6 h-6 absolute left-4" />
					<span className="text-center">{isRegistering ? 'Zarejestruj się' : 'Zaloguj się'}</span>
				</button>

				
				<button
					className="w-full bg-black hover:bg-gray-800 text-white py-2 mb-2 rounded flex items-center justify-center relative"
					onClick={handleGoogleAuth}
				>
					<img src={googleLogo} alt="Google logo" className="w-6 h-6 absolute left-4" />
					<span className="text-center">Zaloguj się przez Google</span>
				</button>

				
				{!isRegistering && !isResettingPassword && (
					<div className="mt-4 text-center">
						<button className="text-cyan-500 underline" onClick={() => setIsResettingPassword(true)}>
							Zapomniałeś hasła?
						</button>
					</div>
				)}

				
				{isResettingPassword && (
					<div className="mt-4 text-center">
						<input
							type="email"
							placeholder="Podaj swój email"
							className="w-full p-2 border mb-2 focus:outline-none focus:ring focus:ring-cyan-500 rounded"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 mb-2 rounded" onClick={handlePasswordReset}>
							Wyślij link do resetowania hasła
						</button>
						<button className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded" onClick={() => setIsResettingPassword(false)}>
							Anuluj
						</button>
					</div>
				)}

				<div className="mt-4 text-center">
					{isRegistering ? (
						<p>
							Masz już konto?{' '}
							<button className="text-cyan-500 underline" onClick={() => handleModeChange(false)}>
								Zaloguj się
							</button>
						</p>
					) : (
						<p>
							Nie masz konta?{' '}
							<button className="text-cyan-500 underline" onClick={() => handleModeChange(true)}>
								Zarejestruj się
							</button>
						</p>
					)}
				</div>
			</div>

			
			{showPopup && <ConfirmationEmailPopup onClose={closePopup} />}
		</div>
	);
};

export default LoginPage;
