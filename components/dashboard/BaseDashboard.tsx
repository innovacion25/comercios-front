import Link from 'next/link'
import { useRouter } from 'next/router'
import Navegation from './Navegation'
import NavBar from './NavBar'

export default function BaseDashboard({ children, tpsUser = 'shops' }) {
  const router = useRouter()
  const path = router.asPath  

  return (
    <>
      <div className="bg-secondary flex">
        <div className="h-screen pt-3 px-5 flex w-screen">
          <Navegation tpsUser={tpsUser}></Navegation>
          <div className="bg-base-100 h-full w-full rounded-tr-3xl rounded-tl-3xl">
            <NavBar></NavBar>
            <div className='p-8'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}