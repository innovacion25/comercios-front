import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react'
import PageLayout from '../components/PageLayout';
import NotifacationToast from '../components/NotificationToast';
import { signIn } from 'next-auth/react';

export default function Login() {
  const router = useRouter()

  // estados
  const [loading, setLoading] = useState(false)

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const [messageToast, setMessageToast] = useState('')
  const [notifications, setNotifications] = useState(false)

  // ejucuaciones de funciones
  useEffect(() => {
    setLoading(true)
  }, [])

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // let botonSubmit = e.target[6]

    // console.log(botonSubmit)

    await axios.post('/api/auth/login', credentials).then(res => {
      router.push('/dashboard')
    }).catch(e => {
      let message = e.response.data.message
      setNotifications(true)
      setTimeout(() => {
        setNotifications(false)
      }, 4000)
      setMessageToast(message)
    })
  }

  // console.log(loading)

  return (
    <>
      <PageLayout title='Login'>
        <div className="grid lg:grid-cols-5">
          <div className="lg:col-span-2 lg:visible invisible lg:h-full h-0 bg-secondary flex flex-col lg:p-14 justify-center items-center ">
            <img src="/img/logo.png" className='w-80' alt="imagen login" />
            <div className='text-center'>
              <p className='text-base-100 text-4xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </div>
            <div className='text-center mt-10'>
              <p className='text-base-100 text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </div>
          </div>
          <div className="bg-base-100 flex justify-center items-center lg:col-span-3 h-screen">
            <div className="w-full flex flex-col justify-center lg:p-40 p-8 h-full max-w-3xl">
              {loading ? (
                <form onSubmit={handleSubmit}>
                  <p className="text-2xl font-bold text-gray-600 text-center mb-8">Iniciar sesión</p>
                  <div className='grid lg:grid-cols-2 gap-6'>
                    <button onClick={() => signIn()} className="btn btn-primary gap-2 capitalize shadow-lg font-normal text-white">
                      <i className="ri-google-fill ri-xl"></i>
                      Con Google
                    </button>
                    <button className="btn btn-primary gap-2 capitalize shadow-lg font-normal text-white">
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
                    <button className="btn btn-primary gap-2 capitalize shadow-lg font-normal max-w-fit text-white">
                      <i className="ri-user-2-line ri-xl"></i>
                      Iniciar sesión
                    </button>
                    <Link href="/register" className="btn btn-ghost gap-2 capitalize font-normal max-w-fit">
                      <i className="ri-user-add-line ri-xl text-primary"></i>
                      Registrarse
                    </Link>
                  </div>
                </form>
              ) : (
                <div className='flex justify-center items-center'>
                  <progress className="progress w-56"></progress>
                </div>
              )}
            </div>
          </div>
        </div>
        {notifications ? (
          <NotifacationToast text={messageToast} textColor='text-red-400' />
        ) : ''}
      </PageLayout>

    </>
  )
}