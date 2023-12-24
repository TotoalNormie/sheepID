import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { idToStringArray } from '../global/Functions';

type Props = {
	children: ReactNode;
};
// ... (existing imports)

type DataContextValue = {
	realSheep: string[];
	setRealSheep: React.Dispatch<React.SetStateAction<string[]>>;
	databaseSheep: string[];
	setDatabaseSheep: React.Dispatch<React.SetStateAction<string[]>>;
};

const DataContext = createContext<DataContextValue | null>(null);

export default function DataContextProvider({ children }: Props) {
	const [realSheep, setRealSheep] = useState<string[]>([]);
	const [databaseSheep, setDatabaseSheep] = useState<string[]>([]);

	const value: DataContextValue = {
		realSheep,
		setRealSheep,
		databaseSheep,
		setDatabaseSheep,
	};

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useDataContext() {
	const { realSheep, setRealSheep, databaseSheep, setDatabaseSheep } = useContext(DataContext)!;

	const formatAndSetSheep = (
		sheep: string[],
		setSheep: React.Dispatch<React.SetStateAction<string[]>>
	) => {
		const sheepFormatted = idToStringArray(sheep);
		if (JSON.stringify(sheep) !== JSON.stringify(sheepFormatted)) {
			setSheep(sheepFormatted);
		}
	};

	useEffect(() => {
		formatAndSetSheep(realSheep, setRealSheep);
		formatAndSetSheep(databaseSheep, setDatabaseSheep);
	}, [realSheep, databaseSheep]);

	return { realSheep, databaseSheep, setDatabaseSheep, setRealSheep };
}
