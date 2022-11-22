import Link from 'next/link'
import { useRouter } from 'next/router'

export default function MenuList({ tpsUser = 'shops' }) {
  const router = useRouter()
  const path = router.asPath
  return (
    <>
      <ul>
        <li className={`btn-menu ${path === '/dashboard' ? 'active' : ''}`}>
          <Link href='/dashboard/'>
            <i className='ri-home-2-line ri-lg'></i>
            Inicio
          </Link>
        </li>
        {tpsUser === 'superuser' ? (
          <li className={`btn-menu ${path === '/dashboard/config' ? 'active' : ''}`}>
            <Link href='/dashboard/config'>
              <i className="ri-settings-4-line ri-lg"></i>
              Config
            </Link>
          </li>
        ) : (
          <li className={`btn-menu ${path === '/dashboard/shops' ? 'active' : ''}`}>
            <Link href='/dashboard/shops'>
              <i className='ri-store-3-fill ri-lg'></i> 
              Mis comercios
            </Link>
          </li>
        )}
      </ul>
    </>
  )
}