import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDGCFj41eQRNVZzRU4tX-scmfuwqSW2KbM',
	authDomain: 'rcbc2-82194.firebaseapp.com',
	projectId: 'rcbc2-82194',
	storageBucket: 'rcbc2-82194.appspot.com',
	messagingSenderId: '1090105602102',
	appId: '1:1090105602102:web:9edfa9e5fbc7b6c3e36897',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
