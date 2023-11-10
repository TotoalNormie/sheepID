import { useEffect, useState } from 'react';

interface Props {
	realSheepProp: string[];
	databaseSheepProp: string[];
}

const CompareSheep = ({ realSheepProp, databaseSheepProp }: Props) => {
	const [realSheep, setRealSheep] = useState<string[]>(realSheepProp);
	const [databaseSheep, setDatabaseSheep] = useState<string[]>(databaseSheepProp);

	useEffect(() => {
		if (JSON.stringify(realSheepProp) !== JSON.stringify(realSheep))
			setRealSheep(realSheepProp);

		if (JSON.stringify(databaseSheepProp) !== JSON.stringify(databaseSheep))
			setRealSheep(databaseSheepProp);

        handleSheep();
	}, [realSheepProp, databaseSheepProp]);

	// databaseSheep.forEach((dbSheep: string, index: number) => {
	//     if()
	// });

	function handleSheep() {
        let radSheep = [];
        let rndSheep = [];
        let dnrSheep = databaseSheep;

        for (const [index, realID] of realSheep) {
            const dbID = databaseSheep.indexOf(realID)
            if (dbID !== -1) {
                rndSheep.push(realID);
                dnrSheep.splice(dbID, 1);
            }else {
                radSheep.push(realID);
            }
        }

        setRealAndDatabaseSheep(radSheep);
        setRealNotDatabaseSheep(rndSheep);
        setDatabaseNotRealSheep(dnrSheep);  
    }

	const [realAndDatabaseSheep, setRealAndDatabaseSheep] = useState<string[]>([]);
	const [realNotDatabaseSheep, setRealNotDatabaseSheep] = useState<string[]>([]);
	const [databaseNotRealSheep, setDatabaseNotRealSheep] = useState<string[]>([]);

    const outputRAD = realAndDatabaseSheep.map((id: string, index: number) => <li key={index}>{id}</li>);
    const outputRND = realNotDatabaseSheep.map((id: string, index: number) => <li key={index}>{id}</li>);
    const outputDNR = databaseNotRealSheep.map((id: string, index: number) => <li key={index}>{id}</li>);
	return <section>
        <div>
            <h2>Real and in database</h2>
            <ol></ol>
        </div>
        <div>
            <h2>Real, but not in database</h2>
            <ol>{outputRAD}</ol>
        </div>
        <div>
            <h2>In database, but not real</h2>
            <ol>{outputRND}</ol>
        </div>

        <div>
            <h2>Handeled</h2>
            <ol>{outputDNR}</ol>

        </div>
    </section>;
};

export default CompareSheep;
