import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('monetoile_access_token')?.value;
  const { pathname, search } = request.nextUrl;

  // Liste des routes publiques (peut être étendue)
  // /callback est autorisé sans authentification car c'est la redirection MoneyFusion
  // /auth/logout est autorisé pour permettre la déconnexion sans boucle infinie
  const publicRoutes = ['/', '/auth/login', '/auth/register', '/auth/logout', '/callback'];
  const isPublicRoute = publicRoutes.some(route => pathname === route);

  // Liste des routes protégées (toutes les routes commençant par /protected)
  const protectedRoutePrefixes = ['/admin', '/protected', '/dashboard'];
  const isProtectedRoute = protectedRoutePrefixes.some(prefix => pathname.startsWith(prefix));

  // Si la route est protégée et pas de token, rediriger vers login avec returnTo
  if (isProtectedRoute && !token) {
    const returnTo = pathname + search;
    const loginUrl = `/auth/login?returnTo=${encodeURIComponent(returnTo)}`;
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  // Si connecté et essaie d'accéder à login/register, rediriger vers dashboard
  if (token && isPublicRoute && pathname !== '/' && pathname !== '/callback') {
    return NextResponse.redirect(new URL('/protected/profil', request.url));
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
