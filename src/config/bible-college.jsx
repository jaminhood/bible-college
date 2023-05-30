import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCMHf_LF8nRO55p-3kZU4zqUJu_YmqjD-0',
	authDomain: 'bible-college-2f710.firebaseapp.com',
	projectId: 'bible-college-2f710',
	storageBucket: 'bible-college-2f710.appspot.com',
	messagingSenderId: '384645587958',
	appId: '1:384645587958:web:fb515fefee0d76522bddd7',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
