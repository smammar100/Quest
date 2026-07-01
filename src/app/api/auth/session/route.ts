import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken } from '@/lib/firebase/admin';

const COOKIE_NAME = '__session';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days, matching previous behaviour

// POST /api/auth/session
// Body: { idToken: string }
// Verifies the Firebase ID token and issues an HttpOnly session cookie.
export async function POST(req: NextRequest) {
  const { idToken } = await req.json();

  try {
    await verifyIdToken(idToken);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, '1', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
  return res;
}

// DELETE /api/auth/session
// Clears the session cookie on sign-out.
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return res;
}
