import 'remixicon/fonts/remixicon.css';
import BaseDashboard from '../../../components/dashboard/BaseDashboard';
import React, { useEffect } from 'react'
import PlansConfig from '../../../components/dashboard/config/Plans';
import PageLayout from '../../../components/PageLayout';
import CategoriesConfig from '../../../components/dashboard/config/Categories';
import LocationsConfig from '../../../components/dashboard/config/Locations';

export default function configPage({ user, setLoading }) {
  useEffect(() => {
    setLoading(true)
  }, [])
  return (
    <>
      <PageLayout title='Configuración'>
        <BaseDashboard tpsUser={user.tpsUser} user={user}>
          <PlansConfig/>
          <CategoriesConfig/>
          <LocationsConfig/>
        </BaseDashboard>
      </PageLayout>
    </>
  )
}