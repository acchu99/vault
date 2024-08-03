import { getFirestore } from "firebase/firestore";
import firebaseApp from '@/lib/firebase/firebaseConfig';

const db = getFirestore(firebaseApp);
export default db;