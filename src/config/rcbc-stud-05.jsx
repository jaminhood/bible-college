import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyBKfSXRQRpt2Y6LrEtI6zN7X744FpTDdJs",
	authDomain: "rcbc-stud-4.firebaseapp.com",
	projectId: "rcbc-stud-4",
	storageBucket: "rcbc-stud-4.appspot.com",
	messagingSenderId: "492531746743",
	appId: "1:492531746743:web:e1a014cccaa3beef4a8a32",
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
