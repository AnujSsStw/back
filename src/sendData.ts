import dateFormat from "dateformat";
import { initializeApp } from "firebase/app";
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseConfig } from "./firebase.config";

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

const date = new Date();
const dbName = dateFormat(date, "dd-mm-yyyy");

type Data = {
  headline: string | null;
  img: string;
};

export const firebase = async (News_18: Data, IndiaToday: Data) => {
  const dbRef = doc(database, "news", dbName);
  const docSnap = await getDoc(dbRef);

  if (docSnap.exists()) {
    await updateDoc(dbRef, {
      news18: arrayUnion(News_18),
      IndiaToday: arrayUnion(IndiaToday),
    });
  } else {
    await setDoc(doc(database, "news", dbName), {
      news18: arrayUnion(News_18),
      IndiaToday: arrayUnion(IndiaToday),
    });
  }
};
