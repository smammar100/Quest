import { getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? 'AIzaSyAU7BCUVbPwLKOT4FXovPAdrOZxgm-mV6E',
	authDomain:
		process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? 'quest-test-dd45b.firebaseapp.com',
	databaseURL:
		process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ??
		'https://quest-test-dd45b-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'quest-test-dd45b',
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? 'quest-test-dd45b.appspot.com',
	messagingSenderId:
		process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '364497227765',
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '1:364497227765:web:69fbf9c270c9a6d9fe9abc',
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? 'G-VBKT85GLX9',
};

export const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
