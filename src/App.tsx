import { useState} from 'react';
import AddSheep from './components/AddSheep';
import ExtractFromDatabase from './components/ExtractFromDatabase';
import CompareSheep from './components/CompareSheep';

function App() {
	const [sheep, setSheep] = useState<string[]>([]);
	const [database, setDatabase] = useState<string[]>([]);

	function handleChange(data: string[]) {
		console.log(data);
        console.log('works sheep');

		setSheep(data);
	}

	function handleDatabaseChange(data: string[]) {

        console.log('works database');
        console.log(data);
		setDatabase(data);
	}

	return (
		<>
			<header></header>
			<main>
				<AddSheep onDataChange={handleChange} />
				<ExtractFromDatabase handleDataChange={handleDatabaseChange} />
				<CompareSheep realSheepProp={sheep} databaseSheepProp={database} />
			</main>
			<footer></footer>
		</>
	);
}

export default App;
