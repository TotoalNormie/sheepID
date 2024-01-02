import { ChangeEvent, useEffect, useState } from 'react';
import '../style/ExtractFromDatabase.css'
import { useDataContext } from '../context/DataContext';

const ExtractFromDatabase = () => {
	const [error, setError] = useState('');
    const { databaseSheep, setDatabaseSheep } = useDataContext();

	const dataOutput = databaseSheep.map((id: string, index: number) => <li key={index}>{id}</li>);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		// console.log(e.target.files[0]);

		const reader = new FileReader();

		// Set up an event listener for when the file is loaded
		reader.onload = function (e) {
			console.log(e);
			// e.target.result contains the contents of the file
			if (e.target === null) {
				setError('File not found');
				return;
			}
			// console.log(e.target);
			const target: EventTarget & { result: string | null } = e.target as EventTarget & {
				result: string | null;
			};
			console.log(target);
			const fileString = target.result?.toString();
			if (fileString === undefined) {
				setError('File not found');
				return;
			}
			setError('');
			handleCSV(fileString);
		};

		// Read the file as text

		console.log(e.target);
		if (e.target.files === null) {
			setError('File not found');
			return;
		}
		reader.readAsText(e.target.files[0]);
	};

	function handleCSV(csv: string) {
		const array = csv.split('\n').filter((elem: string) => elem !== '');
		if (array.length < 2) {
			setError('File not acceptable');
			return;
		}
		array.shift();
		const idArray = array.map((row: string) => {
			const values = row.split(';');
			if (values.length < 2) {
				setError('Invalid CSV format'); // Set an error for an invalid row format
				return '';
			}
			const id = values[1].slice(-4);
			return id;
		});

		if (idArray.some(id => id === '')) {
			// Set an error if any row had an invalid format
			setError('Invalid CSV format');
			return;
		}

		// No errors, update the databaseSheep state
		setError('');
		setDatabaseSheep(idArray);
	}
	return (
		<section id='ExtractFromDatabase'>
			<h3>Добавтье .CSV фаил с базы данных</h3>
			<label className='custom-file-upload'>
				<input type='file' accept='.csv' onChange={handleFileChange} />
				Добавть файл
			</label>
			<span className={error ? 'error' : ''}>{error}</span>
			<ol>{dataOutput}</ol>
		</section>
	);
};

export default ExtractFromDatabase;
