import 'remixicon/fonts/remixicon.css';
import BaseDashboard from '../../components/dashboard/BaseDashboard';
import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/PageLayout';

export default function dashboardPage ({user,setLoading}){
  useEffect(() => {
    setLoading(true)
  }, [])  

  const tpsDashboard = user.tpsUser == 'superuser' ? 'Admin' : 'Comerciante'

  return (
    <>
      <PageLayout title={`Dashboard | ${tpsDashboard}`}>
        <BaseDashboard tpsUser={user.tpsUser}>

        </BaseDashboard>
      </PageLayout>
    </>
  )
}