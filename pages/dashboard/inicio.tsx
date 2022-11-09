import 'remixicon/fonts/remixicon.css';

const inicio = () => {
  return (
    <>
      <div className="bg-secondary flex">
        <div className="h-screen pt-3 px-5 flex w-screen">
          <div className='w-64'>
            <div className='text-white w-full flex justify-center text-4xl mt-4'>  
              LOGO
            </div>
            <div className='mt-20'>
              <ul>
                <li className='btn-menu active'>
                  <a href="#"><i className='ri-home-2-line ri-lg'></i> Inicio</a>
                </li>
                <li className='btn-menu'>
                  <a href="#"><i className='ri-store-3-fill'></i> Mis comercios</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-base-100 h-full w-full rounded-tr-3xl rounded-tl-3xl">
            <div className="py-2 px-6 flex gap-4 justify-between shadow items-center">
              <div className="text-sm breadcrumbs">
                <ul>
                  <li><a>Home</a></li>
                  <li><a>Documents</a></li>
                  <li>Add Document</li>
                </ul>
              </div>

              <div className="">
                <button className="btn btn-ghost btn-circle">
                  <i className="ri-notification-4-line ri-lg"></i>
                </button>
                <button className="btn btn-ghost btn-circle">
                  <i className='ri-user-line ri-lg'></i>
                </button>
              </div>
            </div>


            <div className='p-8'>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default inicio