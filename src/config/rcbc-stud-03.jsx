import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyDtt35ZcZGS4wiwkKwX5-mwnQNhLH_jyM4",
	authDomain: "rcbc1-9967b.firebaseapp.com",
	projectId: "rcbc1-9967b",
	storageBucket: "rcbc1-9967b.appspot.com",
	messagingSenderId: "394324980005",
	appId: "1:394324980005:web:4d016ddc92b598e9342acc",
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
