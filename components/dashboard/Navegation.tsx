import Link from 'next/link'
import { useRouter } from 'next/router'
import MenuList from './MenuList'

export default function Navegation({tpsUser}) {
  const router = useRouter()
  const path = router.asPath
  return (
    <>
      <div className='w-64'>
        <div className='text-white w-full flex justify-center text-4xl mt-4 p-2'>
          <img src="/img/logo.png" alt="" />
        </div>
        <div className='mt-10'>
          <MenuList tpsUser={tpsUser} />
        </div>
      </div>
    </>
  )
}