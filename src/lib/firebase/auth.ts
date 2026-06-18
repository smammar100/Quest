import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	reload,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
	type User,
} from 'firebase/auth';
import type { SignupProfileInput } from './firestore';
import { upsertUserProfileOnSignup } from './firestore';
import { app } from './config';

export const auth = getAuth(app);

export const signInEmail = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

export const signUpEmail = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

export const completeEmailSignupProfile = async (
	user: User,
	profile: Omit<SignupProfileInput, 'uid'>
) => {
	const displayName = `${profile.firstName} ${profile.lastName}`.trim();
	if (displayName.length > 0) {
		await updateProfile(user, { displayName });
	}

	await upsertUserProfileOnSignup({ ...profile, uid: user.uid });
};

export const sendSignupVerificationEmail = (user: User) =>
	sendEmailVerification(user);

export const refreshUserVerificationStatus = async (user: User) => {
	await reload(user);
	return user.emailVerified;
};

export const getCurrentAuthUser = () => auth.currentUser;

export const deleteCurrentAuthUser = async () => {
	const user = auth.currentUser;
	if (!user) {
		return;
	}

	await user.delete();
};

export const signInGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

export const logOut = () => signOut(auth);
