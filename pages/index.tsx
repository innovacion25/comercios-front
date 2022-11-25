import Image from 'next/image'
import Link from 'next/link'
import 'remixicon/fonts/remixicon.css'
import React, { useEffect, useState } from 'react'
import PageLayout from '../components/PageLayout'

export default function Home({ setLoading }) {
  
  useEffect(() => {
    setLoading(true)
  }, [])


  return (
    <PageLayout title="Busca tus negocios favoritos aqui">
      <div className="navbar bg-base-100 shadow w-screen grid grid-rows-3 p-0">
        <div className="flex justify-between w-full px-8 py-2 row-span-2">
          <div className="flex">
            <a className="btn btn-ghost normal-case text-xl">
              <Image src="/img/logo.png" width={100} height={42} alt="imagen logo" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/register" className="btn btn-ghost gap-2 capitalize font-normal">
              <i className="ri-user-add-line ri-xl text-primary"></i>
              Registrarse
            </Link>
            <Link href="/login" className="btn btn-ghost gap-2 capitalize font-normal">
              <i className="ri-user-2-line ri-xl text-primary"></i>
              Iniciar sesión
            </Link>
          </div>
        </div>
        <div className="bg-base-200 p-0 h-full px-8">
          <ul className="flex gap-6">
            <li className="flex items-center gap-4">
              Más buscados
              <i className="ri-menu-line text-primary"></i>
            </li>
            <li><a href="#">Categoria</a></li>
            <li><a href="#">Categoria</a></li>
            <li><a href="#">Categoria</a></li>
            <li><a href="#">Categoria</a></li>
            <li><a href="#">Categoria</a></li>
            <li><a href="#">Categoria</a></li>
          </ul>
        </div>
      </div>
      <div>
        <div className="carousel w-full">
          <div id="item1" className="carousel-item w-full">
            <img src="https://placeimg.com/800/200/arch" className="w-full" />
          </div>
          <div id="item2" className="carousel-item w-full">
            <img src="https://placeimg.com/800/200/arch" className="w-full" />
          </div>
          <div id="item3" className="carousel-item w-full">
            <img src="https://placeimg.com/800/200/arch" className="w-full" />
          </div>
          <div id="item4" className="carousel-item w-full">
            <img src="https://placeimg.com/800/200/arch" className="w-full" />
          </div>
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
          <a href="#item1" className="btn btn-xs btn-circle"></a>
          <a href="#item2" className="btn btn-xs btn-circle"></a>
          <a href="#item3" className="btn btn-xs btn-circle"></a>
          <a href="#item4" className="btn btn-xs btn-circle"></a>
        </div>
      </div>

    </PageLayout>
  )
}