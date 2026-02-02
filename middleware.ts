import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('monetoile_access_token')?.value;
  const { pathname, search } = request.nextUrl;

  // Liste des routes publiques
  const publicRoutes = ['/', '/auth/login', '/auth/register', '/callback', '/wallet', '/terms'];
  const isPublicRoute = publicRoutes.some(route => pathname === route);

  // Routes d'authentification qui ne doivent PAS rediriger même si connecté
  const authActionRoutes = ['/auth/logout'];
  const isAuthAction = authActionRoutes.some(route => pathname === route);

  // Liste des routes protégées (toutes les routes commençant par /star)
  const protectedRoutePrefixes = ['/admin', '/star'];
  const isProtectedRoute = protectedRoutePrefixes.some(prefix => pathname.startsWith(prefix));

  // Si la route est protégée et pas de token, rediriger vers login avec returnTo
  if (isProtectedRoute && !token) {
    const returnTo = pathname + search;
    const loginUrl = `/auth/login?returnTo=${encodeURIComponent(returnTo)}`;
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  // Si connecté et essaie d'accéder à login/register (mais PAS logout ou callback ou wallet)
  // Rediriger vers dashboard
  if (
    token &&
    isPublicRoute &&
    !isAuthAction && // ✅ Ne pas rediriger si c'est une action d'auth (logout)
    pathname !== '/' &&
    pathname !== '/callback' &&
    pathname !== '/wallet'
  ) {
    return NextResponse.redirect(new URL('/star/profil', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
