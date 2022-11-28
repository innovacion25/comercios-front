import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import BaseDashboard from '../../../components/dashboard/BaseDashboard';
import React, { useEffect, useState } from 'react'
import PlansConfig from '../../../components/dashboard/config/Plans';

export default function configPage({user, plans, setLoading }) {
  useEffect(() => {
    setLoading(true)
  }, [])
  return (
    <>
      <BaseDashboard tpsUser={user.tpsUser} user={user}>
        <PlansConfig plans={plans}>
        </PlansConfig>
      </BaseDashboard>
    </>
  )
}

export async function getServerSideProps() {
  const plansQuery = await axios.get('http://localhost:3004/api/config/plans')
  const { data: plans } = plansQuery

  return {
    props: { plans },
  }
}