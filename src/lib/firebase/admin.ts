import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Singleton — Next.js hot-reload can re-run module code, so guard against
// re-initializing the Admin SDK on every request in development.
const app =
  getApps().length === 0
    ? initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      })
    : getApps()[0];

const adminAuth = getAuth(app);

// Verifies a Firebase ID token and returns the decoded claims.
// Pass the raw Bearer token string (with or without the "Bearer " prefix).
// Throws if the token is missing, malformed, or expired.
export async function verifyIdToken(bearerToken: string) {
  const token = bearerToken.replace(/^Bearer\s+/i, '').trim();
  if (!token) throw new Error('Missing token');
  return adminAuth.verifyIdToken(token);
}
