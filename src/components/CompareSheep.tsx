import { useEffect, useState } from 'react';

interface Props {
	realSheepProp: string[];
	databaseSheepProp: string[];
}

const CompareSheep = ({ realSheepProp, databaseSheepProp }: Props) => {
	const [realSheep, setRealSheep] = useState<string[]>(realSheepProp);
	const [databaseSheep, setDatabaseSheep] = useState<string[]>(databaseSheepProp);

	useEffect(() => {
		console.log(databaseSheepProp, realSheepProp);
		if (JSON.stringify(realSheepProp) !== JSON.stringify(realSheep))
			setRealSheep(realSheepProp);

		if (JSON.stringify(databaseSheepProp) !== JSON.stringify(databaseSheep))
			setDatabaseSheep(databaseSheepProp);
	}, [realSheepProp, databaseSheepProp]);

	// useEffect(() => {
	// 	console.log('updates database');
	// }, [databaseSheep]);
	// useEffect(() => {
	// 	console.log('updates real');
	// 	console.log(realSheep);
	// }, [realSheep]);

	useEffect(handleSheep, [realSheep, databaseSheep]);

	// databaseSheep.forEach((dbSheep: string, index: number) => {
	//     if()
	// });

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

		// console.log('radSheep', radSheep);
		// console.log('rndSheep', rndSheep);
		// console.log('dnrSheep', dnrSheep);

		setRealAndDatabaseSheep(radSheep);
		setRealNotDatabaseSheep(rndSheep);
		setDatabaseNotRealSheep(dnrSheep);
	}

	const [realAndDatabaseSheep, setRealAndDatabaseSheep] = useState<string[]>([]);
	const [realNotDatabaseSheep, setRealNotDatabaseSheep] = useState<string[]>([]);
	const [databaseNotRealSheep, setDatabaseNotRealSheep] = useState<string[]>([]);

	const outputRAD = realAndDatabaseSheep.map((id: string, index: number) => (
		<li key={index}>{id}</li>
	));
	const outputRND = realNotDatabaseSheep.map((id: string, index: number) => (
		<li key={index}>{id}</li>
	));
	const outputDNR = databaseNotRealSheep.map((id: string, index: number) => (
		<li key={index}>{id}</li>
	));
	return (
		<section>
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
				<h2>Handeled</h2>
				<ol></ol>
			</div>
		</section>
	);
};

export default CompareSheep;
