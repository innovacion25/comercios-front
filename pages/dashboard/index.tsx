import 'remixicon/fonts/remixicon.css';
import BaseDashboard from '../../components/dashboard/BaseDashboard';
import React, { useEffect, useState } from 'react'

export default function dashboardPage ({user,setLoading}){
  useEffect(() => {
    setLoading(true)
  }, [])  

  return (
    <>
      <BaseDashboard tpsUser={user.tpsUser}>
        
      </BaseDashboard>
    </>
  )
}