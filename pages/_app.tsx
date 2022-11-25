import '../styles/globals.css'
import type { AppProps } from 'next/app'
import axios from 'axios'
import { SessionProvider } from "next-auth/react"
import React, { useState, useEffect } from 'react'
import { setCookie, getCookie } from 'cookies-next'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {

  const [loading, setLoading] = useState(false)
  const [user, setUserData] = useState({})

  useEffect(()=>{
    setUser()
  },[loading])

  const isLoading = async (loading: any)=>{
    await setUser()
    setLoading(loading)
  }

  const setUser = async()=>{
    const {data} = await axios.get('/api/auth/cookieUser')
    setUserData(data.token)
  }

  return (
    <SessionProvider session={session}>
      <div>
        <div id="ftco-loader" className={`fullscreen ${loading == false ? 'show' : ' '}`}>
          <svg className="circular" width="48px" height="48px">
            <circle className="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#DAA520" />
            <circle className="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="#B8860B" />
          </svg>
        </div>
      </div>
      <Component {...pageProps} loading={loading} setLoading={isLoading} user={user} setUser={setUser} />
    </SessionProvider>
  )
}