import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import NotifacationToast from '../../NotificationToast';
import NotifacationAlert from '../../NotificationAlert';


export default function PlansConfig() {
  const router = useRouter()
  const host = 'http://localhost:3004'

  const [credentials, setCredentials] = useState({
    name: '',
    price: '',
    description: ''
  })

  const [plans, setPlans] = useState({})
  const [loadingPlans, setLoadingPlans] = useState(false)
  const [method, setMethod] = useState('get')
  const [url, setUrl] = useState(`${host}/api/config/plans`)

  const [messageToast, setMessageToast] = useState('')
  const [messageAlert, setMessageAlert] = useState('')
  const [notificationsToast, setNotificationsToast] = useState(false)
  const [notificationsAlert, setNotificationsAlert] = useState(false)

  useEffect(() => {
    const url = 'http://localhost:3004/api/config/plans'
    const getPlans = async () => {
      const { data } = await axios.get(url)
      setPlans(data)
    }
    getPlans()
    setLoadingPlans(false)
  }, [loadingPlans == true])

  // ejucuaciones de funciones
  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  // crear plan
  const createPlan = ()=>{
    setUrl(`${host}/api/config/plans`)
    setMethod('post')
    setCredentials({
      name: '',
      price: '',
      description: ''
    })
  }

  // actualizar plan
  const updatePlan = (plan: any)=>{
    setUrl(`${host}/api/config/plans/${plan._id}`)
    setMethod('put')
    setCredentials({
      name: plan.name,
      price: plan.price,
      description: plan.description
    })
  }

  // eliminar plan
  const deletePlan = (plan: any)=>{
    setUrl(`${host}/api/config/plans/${plan._id}`)
    setMethod('delete')
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    let botonSubmit = document.getElementsByClassName('btn-submit')
    let botonCancel = document.getElementById('btn-cancel')
    botonSubmit[0].classList.add('loading')
    
    axios({
      method: method,
      url: url,
      data: credentials
    }).then(res => {
      // const { data } = res
      // let message = data.message
      let message = 'Plan creado'
      setLoadingPlans(true)
      setToast(message)
    }).catch(e => {
      // const { data } = e.response
      // let message = data.message
      let message = 'Plan ya existente'
      setAlert(message)
    })
    botonSubmit[0].classList.remove('loading')
    router.push('/dashboard/config/#')
  }

  const setToast = (message: any) => {
    setNotificationsToast(true)
    setTimeout(() => {
      setNotificationsToast(false)
    }, 5000)
    setMessageToast(message)
  }

  const setAlert = (message: any) => {
    setNotificationsAlert(true)
    setTimeout(() => {
      setNotificationsAlert(false)
    }, 5000)
    setMessageAlert(message)
  }

  return (
    <>
      <div className='flex justify-between'>
        <div>
          <h2 className='text-2xl uppercase'>Planes</h2>
        </div>
        <div className='mb-8'>
          <a href="#plans" className="btn btn-primary text-white" onClick={() => createPlan()}>
            <i className="ri-add-line mr-2"></i>
            Agregar
          </a>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full ">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(plans.length > 0) ? (plans.map((plan) => (
              <tr>
                <td>{plan.name}</td>
                <td>{plan.price}</td>
                <td>{plan.description}</td>
                <td>
                  <div className="tooltip mr-4" data-tip="Editar">
                    <a href="#plans" className="btn btn-circle btn-ghost btn-sm hover:text-primary" onClick={() => updatePlan(plan)}>
                      <i className="ri-pencil-fill ri-lg"></i>
                    </a>
                  </div>
                  <div className="tooltip" data-tip="Eliminar">
                    <button className="btn btn-circle btn-ghost btn-sm hover:text-primary" onClick={async (e, id = plan._id) => {
                      const url = `http://localhost:3004/api/config/plans/${id}`
                      await axios.delete(url).then(res => {
                        setToast('Plan eliminado')
                      })
                      setLoadingPlans(true)
                    }}>
                      <i className="ri-delete-bin-7-fill ri-lg"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))) : (
              <tr>
                <td colSpan={4} className="text-center">
                  Sin planes registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* modals */}
      <div className="modal" id="plans">
        <div className="modal-box">
          {/* <h3 className="font-bold text-lg mb-4 text-center">Agregar nuevo plan</h3> */}

          {notificationsAlert ? (
            <NotifacationAlert text={messageAlert} />
          ) : ''}

          <form onSubmit={handleSubmit}>

            <div className="form-control my-2">
              <label className="label">
                <span className="label-text">Nombre</span>
              </label>
              <input type="text" value={credentials.name} name="name" placeholder="Ingresar nombre" className="input input-bordered w-full" onChange={handleChange} required />
            </div>

            <div className="form-control my-2">
              <label className="label">
                <span className="label-text">Ingresar monto</span>
              </label>
              <label className="input-group">
                <input type="number" value={credentials.price} name="price" placeholder="10" className="input input-bordered w-full" min='0' onChange={handleChange} required />
                <span>USD</span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Descripción</span>
              </label>
              <textarea name="description" value={credentials.description} className="textarea textarea-bordered h-24" placeholder="Ingresar descripción" onChange={handleChange} required></textarea>
            </div>
            <div className="modal-action flex justify-between">
              <a href='#' id='botonCancel' className="btn btn-create">Cancelar</a>
              <button className="btn btn-primary text-white btn-submit">Continuar</button>
            </div>
          </form>
        </div>
      </div>

      {/* <div className="modal" id="plans">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
          <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
          <div className="modal-action">
          <a href="#" className="btn">Yay!</a>
          </div>
        </div>
      </div> */}
      {notificationsToast ? (
        <NotifacationToast text={messageToast} alertColor='alert-success' />
      ) : ''}
    </>
  )
}