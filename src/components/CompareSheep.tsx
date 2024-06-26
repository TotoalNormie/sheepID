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
		let dnrSheep = [...databaseSheep];

		realSheep.forEach((realID: string) => {
            // console.log(realID);
			const dbID = databaseSheep.indexOf(realID);
            // console.log(index, realID, dbID);
			// console.log(dbID);
			if (dbID !== -1) {
                radSheep.push(realID);
                // console.log('rad', radSheep);
                dnrSheep.splice(dbID, 1);
                // console.log('dnr', dnrSheep);
			}else {
				rndSheep.push(realID);
                // console.log('rnd', rndSheep);
            }
		});
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
				{id}
				<input
					type='checkbox'
					checked={handledSheep.includes(id)}
					onChange={() => toggleHandled(id)}
				/>
			</li>
		));

	const outputDNR = databaseNotRealSheep
		.filter(id => !handledSheep.includes(id))
		.map((id: string, index: number) => (
			<li key={index} className='database-not-real'>
				{id}
				<input
					type='checkbox'
					checked={handledSheep.includes(id)}
					onChange={() => toggleHandled(id)}
				/>
			</li>
		));

	const outputHandled = handledSheep.map((id: string, index: number) => (
		<li
			key={index}
			className={
				realNotDatabaseSheep.includes(id) ? 'real-not-database' : 'database-not-real'
			}>
			{id}
			<input
				type='checkbox'
				checked={handledSheep.includes(id)}
				onChange={() => toggleHandled(id)}
			/>
		</li>
	));

	return (
		<section id='CompareSheep' className={hidden ? '' : 'hidden'}>
			<div>
				<h3>Существуют и в базе данных</h3>
				<ol>{outputRAD}</ol>
			</div>
			<div>
				<h3>Существуют, но нету в базе данных</h3>
				<ol>{outputRND}</ol>
			</div>
			<div>
				<h3>Есть в базе данных, но не существуют</h3>
				<ol>{outputDNR}</ol>
			</div>
			<div>
				<h3>Обработанные</h3>
				<ol>{outputHandled}</ol>
			</div>
		</section>
	);
};

export default CompareSheep;
