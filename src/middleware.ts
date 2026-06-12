import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Route protection — runs on the server before any page renders.
// TODO: replace the stub check with real Firebase session-cookie verification.
// See: https://firebase.google.com/docs/auth/admin/manage-cookies
export function middleware(request: NextRequest) {
  // const session = request.cookies.get('session')?.value;
  // if (!session) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  return NextResponse.next();
}

// Add every protected URL pattern here as the app grows.
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/tasks/:path*'],
};
