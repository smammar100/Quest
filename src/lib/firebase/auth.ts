import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import { app } from './config';

export const auth = getAuth(app);

export const signInEmail = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

export const signUpEmail = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

export const signInGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

export const logOut = () => signOut(auth);
