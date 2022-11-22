import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(req) {
  const cookie = req.cookies.get('TokenSession')
  if (cookie === undefined) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    const {payload} = await jwtVerify(cookie.value, new TextEncoder().encode(process.env['TOKEN_SECRET']))

    return NextResponse.next()
  } catch (error) {
    // console.log(error)
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*']
}