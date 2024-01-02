import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { formatDate, idToStringArray } from "../global/Functions";
import { db } from "../config/firebase";
import {
    collection,
    getDocs,
    doc,
    updateDoc,
    addDoc,
} from "firebase/firestore";
type Props = {
    children: ReactNode;
};

type DataContextValue = {
    realSheep: string[];
    setRealSheep: React.Dispatch<React.SetStateAction<string[]>>;
    databaseSheep: string[];
    setDatabaseSheep: React.Dispatch<React.SetStateAction<string[]>>;
};

type Data = {
    date: string;
    sheep: string;
    id: string;
};

const DataContext = createContext<DataContextValue | null>(null);

async function isSheepNow(collectionName: string): Promise<Data | false> {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        console.log(querySnapshot);
        const dateNow = formatDate(new Date());
        const data: Data[] = querySnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id } as Data))
            .filter((doc) => doc.date === dateNow);
        console.log(data);
        if (data.length === 0) return false;
        console.log(data);
        return data[0];
    } catch (err) {
        console.error(err);
        return false;
    }
}

export default function DataContextProvider({ children }: Props) {
    const [realSheep, setRealSheep] = useState<string[]>([]);
    const [databaseSheep, setDatabaseSheep] = useState<string[]>([]);

    useEffect(() => {
        const getRealSheep = async () => {
            try {
                const sheepNow = await isSheepNow('realSheep');
                if (!sheepNow) return;
                if (JSON.stringify(realSheep) !== sheepNow.sheep) {
                    setRealSheep(JSON.parse(sheepNow.sheep));
                }
                console.log(sheepNow);
            } catch (err) {
                console.error(err);
            }
        };
        getRealSheep();
    }, []);

    const value: DataContextValue = {
        realSheep,
        setRealSheep,
        databaseSheep,
        setDatabaseSheep,
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
}

export function useDataContext() {
    const { realSheep, setRealSheep, databaseSheep, setDatabaseSheep } =
        useContext(DataContext)!;

const formatAndSetSheep = async (
    sheep: string[],
    setSheep: React.Dispatch<React.SetStateAction<string[]>>,
    collectionName: string
) => {
    const sheepFormatted = idToStringArray(sheep);
    const jsonSheep = JSON.stringify(sheepFormatted);
    const dateNow = formatDate(new Date());
    
    if (JSON.stringify(sheep) !== jsonSheep) {
        console.log(JSON.stringify(setSheep), jsonSheep, sheep);
        const sheepNow = await isSheepNow(collectionName);
        console.log(sheepNow);
        
        setSheep(sheepFormatted);
        
        if (!sheepNow) {
            console.log("new");
            console.log('sheep json', jsonSheep);
            
            try {
                await addDoc(collection(db, collectionName), {
                    sheep: jsonSheep,
                    date: dateNow,
                });
            } catch (err) {
                console.error(err);
            }
        } else {
            console.log("Updated");
            const docRef = doc(db, collectionName, sheepNow.id);
            console.log('sheep json', jsonSheep);

            try {
                await updateDoc(docRef, {
                    sheep: jsonSheep,
                });
            } catch (err) {
                console.error(err);
            }
        }
    }
};

useEffect(() => {
    formatAndSetSheep(realSheep, setRealSheep, "realSheep");
}, [realSheep]);

useEffect(() => {
    formatAndSetSheep(databaseSheep, setDatabaseSheep, "databaseSheep");
}, [databaseSheep]);

    return { realSheep, databaseSheep, setDatabaseSheep, setRealSheep };
}
