import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyCd4lXm17kkFyIpcXvSSQaoSVdLzVDEkg8",
	authDomain: "rcbc-stud-02.firebaseapp.com",
	projectId: "rcbc-stud-02",
	storageBucket: "rcbc-stud-02.appspot.com",
	messagingSenderId: "784786148428",
	appId: "1:784786148428:web:b48e2e71b3c71f6582f8e9",
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
