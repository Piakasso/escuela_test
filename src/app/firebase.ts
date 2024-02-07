import { initializeApp } from "firebase/app";
import { doc, getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
export const user = process.env.REACT_APP_FAKE_USER;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

export const cardsRef = doc(db, "escuela_test", user!);
export const imagesRef = ref(storage, "images");

export { storage };
export default db;
