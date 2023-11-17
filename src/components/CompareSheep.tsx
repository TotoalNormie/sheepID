import { useEffect, useState } from 'react';
import '../style/CompareSheep.css';

interface Props {
	realSheepProp: string[];
	databaseSheepProp: string[];
	seen: boolean;
}

const CompareSheep = ({ realSheepProp, databaseSheepProp, seen }: Props) => {
	const [realSheep, setRealSheep] = useState<string[]>(realSheepProp);
	const [databaseSheep, setDatabaseSheep] = useState<string[]>(databaseSheepProp);
	const [hidden, setHidden] = useState(true);

	useEffect(() => {
		if (JSON.stringify(realSheepProp) !== JSON.stringify(realSheep))
			setRealSheep(realSheepProp);

		if (JSON.stringify(databaseSheepProp) !== JSON.stringify(databaseSheep))
			setDatabaseSheep(databaseSheepProp);
	}, [realSheepProp, databaseSheepProp]);

	useEffect(() => {
		setHidden(seen);
	}, [seen]);

	useEffect(handleSheep, [realSheep, databaseSheep]);

	function handleSheep() {
		let radSheep: string[] = [];
		let rndSheep: string[] = [];
		let dnrSheep: string[] = [];

		realSheep.forEach((realID: string) => {
			const dbID = databaseSheep.indexOf(realID);

			if (dbID !== -1) {
				radSheep.push(realID);
				databaseSheep.splice(dbID, 1);
			} else {
				rndSheep.push(realID);
			}
		});

		dnrSheep = databaseSheep.slice();

		setRealAndDatabaseSheep(radSheep);
		setRealNotDatabaseSheep(rndSheep);
		setDatabaseNotRealSheep(dnrSheep);
	}

	const [realAndDatabaseSheep, setRealAndDatabaseSheep] = useState<string[]>([]);
	const [realNotDatabaseSheep, setRealNotDatabaseSheep] = useState<string[]>([]);
	const [databaseNotRealSheep, setDatabaseNotRealSheep] = useState<string[]>([]);
	const [handledSheep, setHandledSheep] = useState<string[]>([]);

	const toggleHandled = (itemId: string) => {
		setHandledSheep(prevHandledSheep =>
			prevHandledSheep.includes(itemId)
				? prevHandledSheep.filter(id => id !== itemId)
				: [...prevHandledSheep, itemId]
		);
	};

	const outputRAD = realAndDatabaseSheep
		.filter(id => !handledSheep.includes(id))
		.map((id: string, index: number) => (
			<li key={index} className='real-and-database'>
				<input
					type='checkbox'
					checked={handledSheep.includes(id)}
					onChange={() => toggleHandled(id)}
				/>
				{id}
			</li>
		));

	const outputRND = realNotDatabaseSheep
		.filter(id => !handledSheep.includes(id))
		.map((id: string, index: number) => (
			<li key={index} className='real-not-database'>
				<input
					type='checkbox'
					checked={handledSheep.includes(id)}
					onChange={() => toggleHandled(id)}
				/>
				{id}
			</li>
		));

	const outputDNR = databaseNotRealSheep
		.filter(id => !handledSheep.includes(id))
		.map((id: string, index: number) => (
			<li key={index} className='database-not-real'>
				<input
					type='checkbox'
					checked={handledSheep.includes(id)}
					onChange={() => toggleHandled(id)}
				/>
				{id}
			</li>
		));

	const outputHandled = handledSheep.map((id: string, index: number) => (
		<li
			key={index}
			className={
				realNotDatabaseSheep.includes(id) ? 'real-not-database' : 'database-not-real'
			}>
			<input
				type='checkbox'
				checked={handledSheep.includes(id)}
				onChange={() => toggleHandled(id)}
			/>
			{id}
		</li>
	));

	return (
		<section id='CompareSheep' className={hidden ? '' : 'hidden'}>
			<div>
				<h2>Real and in database</h2>
				<ol>{outputRAD}</ol>
			</div>
			<div>
				<h2>Real, but not in database</h2>
				<ol>{outputRND}</ol>
			</div>
			<div>
				<h2>In database, but not real</h2>
				<ol>{outputDNR}</ol>
			</div>
			<div>
				<h2>Handled</h2>
				<ol>{outputHandled}</ol>
			</div>
		</section>
	);
};

export default CompareSheep;
