import { doc, getDoc, getFirestore } from 'firebase/firestore';
import type { UserProfile, UserRole } from '@/lib/models/user';
import { app } from './config';

type FirestoreDateLike = {
	toDate?: () => Date;
};

type UserProfileDoc = {
	email?: string;
	displayName?: string;
	photoURL?: string;
	role?: string;
	createdAt?: FirestoreDateLike | Date | string | number;
	countryCode?: string;
	country_code?: string;
	country?: string;
};

const VALID_ROLES: UserRole[] = ['poster', 'hero', 'admin'];

const toDate = (value: UserProfileDoc['createdAt']): Date => {
	if (!value) {
		return new Date();
	}

	if (value instanceof Date) {
		return value;
	}

	if (typeof value === 'string' || typeof value === 'number') {
		const parsed = new Date(value);
		return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
	}

	if (typeof value === 'object' && typeof value.toDate === 'function') {
		const parsed = value.toDate();
		return parsed instanceof Date && !Number.isNaN(parsed.getTime())
			? parsed
			: new Date();
	}

	return new Date();
};

export const db = getFirestore(app);

export async function getUserProfileByUid(uid: string): Promise<UserProfile | null> {
	const snap = await getDoc(doc(db, 'users', uid));
	if (!snap.exists()) {
		return null;
	}

	const data = snap.data() as UserProfileDoc;
	const role = VALID_ROLES.includes(data.role as UserRole)
		? (data.role as UserRole)
		: 'poster';

	const countryCodeRaw = data.countryCode ?? data.country_code ?? data.country;
	const countryCode = countryCodeRaw?.trim();

	return {
		uid,
		email: data.email ?? '',
		displayName: data.displayName ?? '',
		photoURL: data.photoURL,
		countryCode: countryCode ? countryCode.toUpperCase() : undefined,
		role,
		createdAt: toDate(data.createdAt),
	};
}
