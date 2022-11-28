import Navegation from './Navegation'
import NavBar from './NavBar'

export default function BaseDashboard({ children, tpsUser = 'shops', user }) {
  return (
    <>
      <div className="bg-secondary flex">
        <div className="min-h-screen pt-3 px-5 flex w-screen">
          <Navegation tpsUser={tpsUser}></Navegation>
          <div id="dashboard" className="h-full w-full rounded-tr-3xl rounded-tl-3xl">
            <NavBar user={user}></NavBar>
            <div className='p-8'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}