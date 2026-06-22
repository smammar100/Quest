import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'quest_auth';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuthenticated = request.cookies.get(AUTH_COOKIE_NAME)?.value === '1';

  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    const redirectTarget = `${pathname}${request.nextUrl.search}`;
    loginUrl.searchParams.set('next', redirectTarget);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Add every protected URL pattern here as the app grows.
export const config = {
  matcher: [
    '/browse-quest/list/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/tasks/:path*',
  ],
};
