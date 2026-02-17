import { NextResponse } from 'next/server';

// Define routes that are specifically for authenticated users
const privateRoutes = ['/student/dashboard', '/admin/dashboard', '/student/quiz', '/admin/quizzes', '/admin/subjects', '/admin/results', '/student/results'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  const userCookie = request.cookies.get('user')?.value;
  let user = null;
  
  try {
    if (userCookie) {
      user = JSON.parse(userCookie);
    }
  } catch (e) {
    // Guest
  }

  const isAuthenticated = !!user;

  // 1. If trying to access a private route and not authenticated
  const isPrivateRoute = privateRoutes.some(path => pathname.startsWith(path));
  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. If already authenticated and trying to access login/register
  const isAuthPage = pathname === '/login' || pathname === '/register';
  if (isAuthPage && isAuthenticated) {
    const dashboard = user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard';
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  // 3. Special handling for Landing Page (/)
  if (pathname === '/' && isAuthenticated) {
    const dashboard = user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard';
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
