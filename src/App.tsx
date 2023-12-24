import { MouseEventHandler, useState } from 'react';
import AddSheep from './components/AddSheep';
import ExtractFromDatabase from './components/ExtractFromDatabase';
import CompareSheep from './components/CompareSheep';
import './style/App.css';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from './assets/logo.png';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import DataContextProvider from './context/DataContext';

function App() {
	const [sheep, setSheep] = useState<string[]>([]);
	const [database, setDatabase] = useState<string[]>([]);
	const [page, setPage] = useState(1);
	const pages = ['', 'add', 'extract', 'compare'];

	console.log(page);

	function handleChange(data: string[]) {
		// console.log(data);
		// console.log('works sheep');

		setSheep(data);
	}

	function setAdd() {
		setPage(1);
	}

	function handleDatabaseChange(data: string[]) {
		// console.log('works database');
		// console.log(data);
		setDatabase(data);
	}

	const checkPage = (step: number) => {
		return step === page ? true : false;
	};

	const handlePrev = () => {
		// Ensure page doesn't go below 1
		setPage(prevPage => {
			const newPage = Math.max(prevPage - 1, 1);
			Navigate;
			return newPage;
		});
	};

	const handleNext = () => {
		// Update page, you might want to adjust the upper limit as needed
		setPage(prevPage => Math.min(prevPage + 1, 3));
	};

	return (
		<DataContextProvider>
			<BrowserRouter>
				<header>
					<h1>
						SheepID
						<img src={logo} alt='' />
					</h1>
				</header>
				<nav>
					<button
						className={page === 1 ? 'notSeen' : ''}
						onClick={handlePrev}
						title='Прошлый Шаг'>
						<FontAwesomeIcon icon={faAngleLeft} />
					</button>
					<button
						className={page === 3 ? 'notSeen' : ''}
						onClick={handleNext}
						title='Следуйщий Шаг'>
						<FontAwesomeIcon icon={faAngleRight} />
					</button>
					<Navigate to={`/${pages[page]}`}></Navigate>
				</nav>
				<main>
					<Routes>
						<Route path='/' element={<AddSheep />}></Route>
						<Route path='/add' element={<AddSheep />}></Route>
						<Route path='/extract' element={<ExtractFromDatabase />}></Route>
						<Route path='/compare' element={<CompareSheep />}></Route>
						{/* <AddSheep onDataChange={handleChange} seen={checkPage(1)} /> */}
						{/* <ExtractFromDatabase
						handleDataChange={handleDatabaseChange}
						seen={checkPage(2)}
					/>
					<CompareSheep
						realSheepProp={sheep}
						databaseSheepProp={database}
						seen={checkPage(3)}
					/> */}
					</Routes>
				</main>
				<footer></footer>
			</BrowserRouter>
		</DataContextProvider>
	);
}

export default App;
