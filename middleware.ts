import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function handles routing based on authentication state
export function middleware(request: NextRequest) {
  // Public paths that don't require authentication
  const publicPaths = ['/login', '/register']
  
  // Get the path name from the URL
  const path = request.nextUrl.pathname
  
  // Check if the current path is public
  const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath))
  
  // Get session cookie
  const sessionCookie = request.cookies.get('session')
  
  // If trying to access a protected path without a session, redirect to login
  if (!isPublicPath && !sessionCookie) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }
  
  // If trying to access login/register with a valid session, redirect to dashboard
  if (isPublicPath && sessionCookie) {
    const dashboardUrl = new URL('/', request.url)
    return NextResponse.redirect(dashboardUrl)
  }
  
  // Otherwise, continue with the request
  return NextResponse.next()
}

// Configure paths that will trigger the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 