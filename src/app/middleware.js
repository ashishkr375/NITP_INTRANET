// middleware.js
import { NextResponse } from 'next/server';

export default function middleware(req) {
  const authCookie = req.cookies.get('auth');

  // Log the cookie value for debugging
  console.log('Auth cookie:', authCookie);

  // If the user is not authenticated, redirect to the login page
  if (!authCookie) {
    return NextResponse.redirect(new URL('/Login', req.url));
  }

  return NextResponse.next();
}



// Specify which paths should be protected
export const config = {
  matcher: ['/protected', '/','/:path*'], // Adjust this to protect specific routes
};
