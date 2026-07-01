import {
	createUserWithEmailAndPassword,
	getAuth,
	type UserCredential,
	getRedirectResult,
	GoogleAuthProvider,
	OAuthProvider,
	reload,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	signInWithRedirect,
	updateProfile,
	type User,
} from 'firebase/auth';
import type { SignupProfileInput } from '@/lib/api/auth';
import { signupUserViaApi } from '@/lib/api/auth';
import { app } from './config';

export const auth = getAuth(app);

let redirectResultPromise: Promise<UserCredential | null> | null = null;

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

	await signupUserViaApi({ ...profile, uid: user.uid });
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

const SOCIAL_REDIRECT_FALLBACK_CODES = new Set([
	'auth/popup-blocked',
	'auth/cancelled-popup-request',
	'auth/operation-not-supported-in-this-environment',
]);

const getFirebaseErrorCode = (error: unknown): string => {
	if (!error || typeof error !== 'object' || !('code' in error)) {
		return '';
	}

	return String((error as { code?: unknown }).code ?? '');
};

export const signInGoogle = async () => {
	const provider = new GoogleAuthProvider();
	provider.addScope('profile');
	provider.addScope('email');

	try {
		return await signInWithPopup(auth, provider);
	} catch (error) {
		if (SOCIAL_REDIRECT_FALLBACK_CODES.has(getFirebaseErrorCode(error))) {
			await signInWithRedirect(auth, provider);
			return null;
		}

		throw error;
	}
};

export const signInApple = async () => {
	const provider = new OAuthProvider('apple.com');
	provider.addScope('email');
	provider.addScope('name');

	try {
		return await signInWithPopup(auth, provider);
	} catch (error) {
		if (SOCIAL_REDIRECT_FALLBACK_CODES.has(getFirebaseErrorCode(error))) {
			await signInWithRedirect(auth, provider);
			return null;
		}

		throw error;
	}
};

export const handleAuthRedirectResult = () => {
	if (!redirectResultPromise) {
		redirectResultPromise = getRedirectResult(auth).finally(() => {
			redirectResultPromise = null;
		});
	}

	return redirectResultPromise;
};

export const logOut = () => signOut(auth);
