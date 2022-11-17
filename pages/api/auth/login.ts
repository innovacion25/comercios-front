import { serialize } from 'cookie'
import axios from 'axios'

export default async function Login(req, res) {
  try {
    const result = await axios.post('http://localhost:3333/login', req.body)
    // console.log(result.data)
    const data = result.data

    const serialized = serialize('TokenSession', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/'
    })

    // console.log(serialized)

    res.setHeader('Set-Cookie', serialized)

    return res.json({
      error: false,
      message: 'login success'
    })
  } catch (e) {
    return res.json({
      error: true,
      message: 'login error'
    })
  }
}