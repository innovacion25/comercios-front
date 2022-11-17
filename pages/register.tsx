import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import Link from 'next/link';

import React, { useState } from 'react'
import PageLayout from '../components/PageLayout';

export default function Register() {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // fetch(serverApi, {
    //   method: 'GET',
    //   headers: {
    //     "Content-Type": 'application/json'
    //   },
    //   body: JSON.stringify(credentials),
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //   })

    await axios.post('http://localhost:3333/login', credentials)
      .then(res => {
        const data = res.data

      }).catch(e => {
        console.log(e.message)
      })
  }


  return (
    <>
      <PageLayout title="Registrar">
        <div className="grid lg:grid-cols-5">
          <div className="lg:col-span-2 lg:visible invisible lg:h-full h-0 bg-secondary flex flex-col lg:p-14 justify-center items-center ">
            <img src="/img/img-inicio.png" className='w-80' alt="imagen login" />
            <div className='text-center'>
              <p className='text-base-100 text-4xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </div>
            <div className='text-center mt-10'>
              <p className='text-base-100 text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </div>
          </div>
          <div className="bg-base-100 flex justify-center items-center lg:col-span-3 h-screen">
            <div className="w-full flex flex-col justify-center lg:p-40 p-8 h-full">
              <form onSubmit={handleSubmit}>
                <p className="text-2xl font-bold text-gray-600 text-center mb-8">Registrar cuenta</p>
                <div className='grid lg:grid-cols-2 gap-6'>
                  <button className="btn btn-primary gap-2 capitalize shadow-lg font-normal text-white">
                    <i className="ri-google-fill ri-xl"></i>
                    Con Google
                  </button>
                  <button className="btn btn-primary gap-2 capitalize shadow-lg font-normal text-white">
                    <i className="ri-facebook-circle-fill ri-xl"></i>
                    Con Facebook
                  </button>
                </div>
                <div className="divider">O</div>
                <input type="text" name='username' placeholder="Usuario" className="input input-bordered w-full my-2 mt-6" onChange={handleChange} />
                <input type="email" name='email' placeholder="Correo" className="input input-bordered w-full my-2" onChange={handleChange} />
                <input type="password" name='password' placeholder="Contraseña" className="input input-bordered w-full my-2" onChange={handleChange} />
                <div className='flex justify-between mt-12'>
                  <button className="btn btn-primary gap-2 capitalize shadow-lg font-normal max-w-fit text-white">
                    <i className="ri-user-2-line ri-xl"></i>
                    Registrar cuenta
                  </button>
                  <Link href="/login" className="btn btn-ghost gap-2 capitalize font-normal max-w-fit">
                    <i className="ri-user-add-line ri-xl text-primary"></i>
                    Iniciar sesión
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </PageLayout>

    </>
  )
}