import { serialize } from 'cookie'
import axios from 'axios'
import jwt from 'jsonwebtoken'

export default async function Login(req, res) {
  try {
    const result = await axios.post('http://localhost:3004/api/auth/login', req.body)
    
    const verifyToken = jwt.verify(result.data, process.env['TOKEN_SECRET'])

    const serialized = serialize('TokenSession', result.data, {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/'
    })

    res.setHeader('Set-Cookie', serialized)

    return res.status(200).json({
      error: false,
      message: 'Sesión iniciada',
      token: result.data 
    })
  } catch (e) {
    return res.status(401).json({
      error: true,
      message: 'Usuario o contraseña inválida'
    })
  }
}