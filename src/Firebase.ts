// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if (process.env.REACT_APP_FIREBASE_AUTH_EMULATOR_HOST !== undefined) {
  const auth = getAuth();
  console.log(
    "use Auth-emulator",
    process.env.REACT_APP_FIREBASE_AUTH_EMULATOR_HOST
  );
  connectAuthEmulator(auth, `http://${process.env.REACT_APP_FIREBASE_AUTH_EMULATOR_HOST}`);

}

if (process.env.REACT_APP_FIRESTORE_EMULATOR_HOST !== undefined) {
  const db = getFirestore();
  const [firestoreEmulatorHost, firestoreEmulatorPort] =
    process.env.REACT_APP_FIRESTORE_EMULATOR_HOST.split(":");
  console.log(
    "use Firestore-emulator",
    firestoreEmulatorHost,
    firestoreEmulatorPort
  );
  connectFirestoreEmulator(db, firestoreEmulatorHost, parseInt(firestoreEmulatorPort));
}

if (process.env.REACT_APP_FIREBASE_STORAGE_EMULATOR_HOST !== undefined) {
  const storage = getStorage();
  const [firebaseStorageEmulatorHost, firebaseStorageEmulatorPort] =
    process.env.REACT_APP_FIREBASE_STORAGE_EMULATOR_HOST.split(":");
  console.log(
    "use Firebase-Storage-emulator",
    firebaseStorageEmulatorHost,
    firebaseStorageEmulatorPort
  );
  connectStorageEmulator(storage, firebaseStorageEmulatorHost, parseInt(firebaseStorageEmulatorPort));
}



const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();
