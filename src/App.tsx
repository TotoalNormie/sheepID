import { useState, useEffect } from 'react';
import AddSheep from './components/AddSheep';
import ExtractFromDatabase from './components/ExtractFromDatabase';
import CompareSheep from './components/CompareSheep';
import './style/App.css';

function App() {
	const [sheep, setSheep] = useState<string[]>([]);
	const [database, setDatabase] = useState<string[]>([]);
	const [page, setPage] = useState<number>(1);
	// const [pageIndex, setPageIndex] = useState(1);

	useEffect(() => {
		console.log(page);
	}, [page]);

	function handleChange(data: string[]) {
		// console.log(data);
		// console.log('works sheep');

		setSheep(data);
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
		setPage(prevPage => Math.max(prevPage - 1, 1));
	};

	const handleNext = () => {
		// Update page, you might want to adjust the upper limit as needed
		setPage(prevPage => Math.min(prevPage + 1, 3));
	};

	return (
		<>
			<header></header>
			<main>
				<div>
					<button onClick={handlePrev}>Прошлый Шаг</button>
					<button onClick={handleNext}>Следуйщий Шаг</button>
				</div>
				<div>
					<AddSheep onDataChange={handleChange} seen={checkPage(1)} />
					<ExtractFromDatabase
						handleDataChange={handleDatabaseChange}
						seen={checkPage(2)}
					/>
					<CompareSheep
						realSheepProp={sheep}
						databaseSheepProp={database}
						seen={checkPage(3)}
					/>
				</div>
			</main>
			<footer></footer>
		</>
	);
}

export default App;
