import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyBe_-Sgjwi_sFa-dvMYGye_pkK1jpRiJKk",
	authDomain: "rcbc-stud-3.firebaseapp.com",
	projectId: "rcbc-stud-3",
	storageBucket: "rcbc-stud-3.appspot.com",
	messagingSenderId: "254335413216",
	appId: "1:254335413216:web:1a591a8b3bd8f63b73d985",
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
