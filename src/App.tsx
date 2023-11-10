import { useState, useEffect } from 'react';
import AddSheep from './components/AddSheep';
import ExtractFromDatabase from './components/ExtractFromDatabase';
import CompareSheep from './components/CompareSheep';

function App() {
	const [sheep, setSheep] = useState<string[]>(['1423', '12', '532', '533', '6734']);
    const [database, setDatabase] = useState<string[]>([]);
	useEffect(() => {
		// console.log(sheep);
	}, [sheep]);

	function handleChange(data: string[]) {
		setSheep(data);
	}
    
    function handleDatabaseChange(data: string[]) {
        setDatabase(data);
    }

	return (
		<>
			<header></header>
			<main>
				<AddSheep data={sheep} onDataChange={handleChange} />
				<ExtractFromDatabase handleDataChange={handleDatabaseChange} />
                <CompareSheep realSheepProp={sheep} databaseSheepProp={database}/>
			</main>
			<footer></footer>
		</>
	);
}

export default App;
