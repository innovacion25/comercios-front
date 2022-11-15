import { serialize } from "cookie"

export default async function Logout(req, res) {
  const { TokenSession } = req.cookies

  if (!TokenSession) return res.status(401).json({ error: true, message: 'no token' })

  try {
    const serialized = serialize('TokenSession', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    })
    res.setHeader('Set-Cookie', serialized)
    return res.status(200).json({
      error: false,
      message: 'logout success'
    })
  } catch (e) {
    return res.status(401).json({
      error: true,
      message: 'invalid token'
    })
  }
}