import React, { useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase/firebaseConfig';
import { UserContext } from '../../context/UserContext';

const LoginPage: React.FC = () => {
  const { user } = useContext(UserContext) || {};
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/news');
    } catch (error) {
      console.error('Login error:', error);
      alert('Niepoprawne dane logowania.');
    }
  };

  if (user) {
    navigate('/news');
    return null;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4">Zaloguj się</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input type="email" name="email" id="email" required className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">Hasło</label>
          <input type="password" name="password" id="password" required className="w-full px-3 py-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Zaloguj się</button>
        <p className="text-sm mt-4">
          Nie masz konta? <Link to="/register" className="text-blue-600">Zarejestruj się</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
