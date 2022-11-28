import { useRouter } from 'next/router'
import axios from 'axios'

export default function NavBar({user}) {
  const router = useRouter()

  const logout = async ()=>{
    const result = await axios.post('/api/auth/logout').then(()=>{
      router.push('/login')
    }).catch((err)=>{
      // console.log(err)
    })
  }

  return (
    <>
      <div className="py-2 px-6 flex gap-4 justify-between shadow items-center">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>Bienvenido</li>
            <li>{user.username}</li>
          </ul>
        </div>

        <div className="">
          <button className="btn btn-ghost btn-circle">
            <i className="ri-notification-4-line ri-lg"></i>
          </button>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <i className='ri-user-line ri-lg'></i>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-40">
              <li>
                <a>Perfil</a>
              </li>
              <li>
                <a onClick={logout}>Cerrar sesión</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}