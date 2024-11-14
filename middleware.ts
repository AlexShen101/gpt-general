// Root middleware to protect private routes
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = (path === '/')

  // Get the token from cookies
  const token = request.cookies.get('next-auth.session-token')?.value || ''

  // Redirect logic
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
 
// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/',
    '/notes-to-cards',
    '/cards-to-notes',
  ]
}