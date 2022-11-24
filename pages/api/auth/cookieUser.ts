import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export default function cookieUser(req: NextRequest, res) {
  const token = req.cookies.TokenSession
  try {
    const verifyToken = jwt.verify(token, process.env['TOKEN_SECRET'])
    return res.status(200).json({
      error: false,
      message: 'token bien',
      token: verifyToken
    })
  } catch (e) {
    return res.status(200).json({
      error: true,
      message: 'token fail',
      token: ''
    })
  }
}