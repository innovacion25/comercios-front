import axios from 'axios'

export default async function Register(req, res) {
  try {
    const result = await axios.post('http://localhost:3004/api/auth/register', req.body)

    return res.status(200).json({
      error: false,
      message: 'Usuario creado'
    })
  } catch (e) {
    return res.status(401).json({
      error: true,
      message: 'Error al crear usuario'
    })
  }
}