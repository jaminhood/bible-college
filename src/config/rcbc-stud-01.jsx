import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyDx0He7uB8_FgKaziwopVfSVhDWTS3kyC4",
	authDomain: "rcbc-stud-01.firebaseapp.com",
	projectId: "rcbc-stud-01",
	storageBucket: "rcbc-stud-01.appspot.com",
	messagingSenderId: "380717081297",
	appId: "1:380717081297:web:a14c43c592fd09ff21dbf0",
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
