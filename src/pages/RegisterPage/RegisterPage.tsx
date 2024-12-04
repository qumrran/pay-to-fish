import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase/firebaseConfig';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Rejestracja zakończona sukcesem!');
      navigate('/login');
    } catch (error) {
      console.error('Register error:', error);
      alert('Nie udało się zarejestrować.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleRegister} className="p-6 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4">Zarejestruj się</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input type="email" name="email" id="email" required className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">Hasło</label>
          <input type="password" name="password" id="password" required className="w-full px-3 py-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Zarejestruj się</button>
        <p className="text-sm mt-4">
          Masz już konto? <Link to="/login" className="text-blue-600">Zaloguj się</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
