import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

type Data = {
    date: string;
    sheep: string;
    id: string;
};

export default async function getData(collectionName: string) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data: Data[] = querySnapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as Data)
    ); 
    return data;
}
