import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../Shared/LogoutButton/LogoutButton';
import LogoutButton2 from '../Shared/LogoutButton2/LogoutButton2';
import { FiMenu, FiX } from 'react-icons/fi';

const MainMenu: React.FC = () => {
	const userContext = useContext(UserContext);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	if (!userContext) return null;

	const { user } = userContext;

	const navItemClass = `text-white bg-cyan-500 hover:bg-cyan-600 px-3 py-2 rounded-md transition-colors duration-200`;

	return (
		<nav className='bg-cyan-500 sticky top-0 z-50 shadow-md'>
			<div className='max-w-9xl mx-auto px-4'>
				<div className='flex justify-between items-center h-16'>
					<div className='hidden md:block flex-1'></div>

					<ul className='hidden md:flex md:space-x-6 md:text-lg flex items-center justify-center'>
						<li>
							<NavLink to='/news' className={navItemClass}>
								Aktualności
							</NavLink>
						</li>
						<li>
							<NavLink to='/reservations' className={navItemClass}>
								Rezerwacje
							</NavLink>
						</li>
						<li>
							<NavLink to='/blog' className={navItemClass}>
								Blog
							</NavLink>
						</li>
						<li>
							<NavLink to='/catchboard' className={navItemClass}>
								Tablica Połowów
							</NavLink>
						</li>
						<li>
							<NavLink to='/contact' className={navItemClass}>
								Kontakt
							</NavLink>
						</li>
						<li>
							<NavLink to='/account' className={navItemClass}>
								Moje Konto
							</NavLink>
						</li>

						{user && (
							<li>
								<LogoutButton />
							</li>
						)}
					</ul>

					<div className='hidden md:block flex-1'></div>

					<button
						className='md:hidden text-white focus:outline-none'
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? (
							<FiX className='w-6 h-6' />
						) : (
							<FiMenu className='w-6 h-6' />
						)}
					</button>
				</div>

				<ul
					className={`md:hidden flex flex-col items-center space-y-4 text-lg bg-cyan-500 py-4 transition-all duration-300 ${
						isMenuOpen ? 'block' : 'hidden'
					}`}
				>
					<li>
						<NavLink
							to='/news'
							className={navItemClass}
							onClick={() => setIsMenuOpen(false)}
						>
							Aktualności
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/reservations'
							className={navItemClass}
							onClick={() => setIsMenuOpen(false)}
						>
							Rezerwacje
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/blog'
							className={navItemClass}
							onClick={() => setIsMenuOpen(false)}
						>
							Blog
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/catchboard'
							className={navItemClass}
							onClick={() => setIsMenuOpen(false)}
						>
							Tablica Połowów
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/contact'
							className={navItemClass}
							onClick={() => setIsMenuOpen(false)}
						>
							Kontakt
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/account'
							className={navItemClass}
							onClick={() => setIsMenuOpen(false)}
						>
							Moje Konto
						</NavLink>
					</li>

					{user && (
						<li className='!mt-0'>
							<LogoutButton2 />
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default MainMenu;
