import axios from 'axios';
// import { NextApiRequest, NextApiResponse } from "next";
import 'remixicon/fonts/remixicon.css';
import Link from 'next/link';

// const res = await fetch(`https://jsonplaceholder.typicode.com/users`)


import React, { useState } from 'react'

export default function login() {
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

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const serverApi = 'https://jsonplaceholder.typicode.com/users'

    // const serverApi = '/api/auth/login'

    const response = await axios({
      method: 'post',
      url: serverApi,
      data: credentials
    }).then((res)=>{
      console.log(res.data)
    })
  }

  return (
    <>
      <div className="grid lg:grid-cols-5">
        <div className="lg:col-span-2 lg:visible invisible lg:h-full h-0 bg-secondary flex flex-col p-14 justify-center items-center ">
          <img src="/img/img-inicio.png" className='w-80' alt="imagen login" />
          <div className='text-center'>
            <p className='text-base-100 text-4xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
          </div>
          <div className='text-center mt-10'>
            <p className='text-base-100 text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
          </div>
        </div>
        <div className="bg-base-100 flex justify-center items-center lg:col-span-3 h-screen">
          <div className="w-full flex flex-col justify-center lg:p-40 p-8">
            <form onSubmit={handleSubmit}>
              <span className="text-2xl font-bold text-gray-600 text-center my-5">Iniciar sesión</span>
              <div className='grid lg:grid-cols-2 gap-6'>
                <button className="btn btn-primary gap-2 capitalize shadow-lg font-normal">
                  <i className="ri-google-fill ri-xl"></i>
                  Con Google
                </button>
                <button className="btn btn-primary gap-2 capitalize shadow-lg font-normal">
                  <i className="ri-facebook-circle-fill ri-xl"></i>
                  Con Facebook
                </button>
              </div>
              <div className="divider">O</div>
              <input type="text" name='email' placeholder="Correo o usuario" className="input input-bordered w-full my-2 mt-6" onChange={handleChange} />
              <input type="password" name='password' placeholder="Contraseña" className="input input-bordered w-full my-2" onChange={handleChange} />
              <div className='flex justify-between mt-4'>
                <div className="form-control">
                  <label className="label cursor-pointer flex justify-center gap-4">
                    <input type="checkbox" className="checkbox checkbox-primary" />
                    <span className="text-left label-text font-semibold">Remember me</span>
                  </label>
                </div>
                <button className="btn btn-ghost capitalize btn-sm mt-1">Recuperar Contraseña</button>
              </div>
              <div className='flex justify-between mt-12'>
                <button className="btn btn-primary gap-2 capitalize shadow-lg font-normal max-w-fit">
                  <i className="ri-user-2-line ri-xl"></i>
                  Iniciar sesión
                </button>
                {/* <Link href="/dashboard/inicio" className="btn btn-primary gap-2 capitalize shadow-lg font-normal max-w-fit">
                  <i className="ri-user-2-line ri-xl"></i>
                  Iniciar sesión
                </Link> */}
                <Link href="#" className="btn btn-ghost gap-2 capitalize font-normal max-w-fit">
                  <i className="ri-user-add-line ri-xl text-primary"></i>
                  Registrarse
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}