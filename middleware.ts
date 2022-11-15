import { NextResponse } from 'next/server'

export function middleware(req) {
  // const path = req.nextUrl.pathname
  const cookie = req.cookies.get('TokenSession')

  if (cookie === undefined) {
    return NextResponse.redirect(new URL('/login', req.url))
  }


  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}