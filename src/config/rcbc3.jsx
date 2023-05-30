import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDuL2gRu1YbOIIsdTiuXXS1SPCPb2jQ-iM',
	authDomain: 'rcbc3-b6368.firebaseapp.com',
	projectId: 'rcbc3-b6368',
	storageBucket: 'rcbc3-b6368.appspot.com',
	messagingSenderId: '399087366336',
	appId: '1:399087366336:web:85cced294d62b0e120fd25',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
