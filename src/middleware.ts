import { NextRequest, NextResponse } from 'next/server';
import { authRoutes, protectedRoutes } from '../src/router/routes';

export function middleware(request: NextRequest) {
  const currentUserString = request.cookies.get('currentUser')?.value;
  let currentUser;

  try {
    currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  } catch (error) {
    console.error('Error parsing currentUser cookie:', error);
    currentUser = null;
  }
  // Redirect to login if trying to access protected route and not logged in or session expired
  if (
    (protectedRoutes.includes(request.nextUrl.pathname) && !currentUser) ||
    Date.now() > currentUser?.expiredAt * 1000
  ) {
    const redirectUrl = new URL('/login', request.url);
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.delete('currentUser');
    return response;
  }

  // Redirect to home if trying to access auth route while already logged in
  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Continue to the requested route if not redirected
  return NextResponse.next();
}
