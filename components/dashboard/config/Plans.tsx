// import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import NotifacationToast from '../../NotificationToast';
import NotifacationAlert from '../../NotificationAlert';


export default function PlansConfig() {
  const router = useRouter()
  const host = 'http://localhost:3004'

  const [credentials, setCredentials] = useState({
    _id: '',
    name: '',
    price: '',
    description: ''
  })

  const [plans, setPlans] = useState([{
    _id: '',
    name: '',
    price: '',
    description: ''
  }])

  const [loadingPlans, setLoadingPlans] = useState(false)
  const [method, setMethod] = useState('get')
  const [url, setUrl] = useState(`${host}/api/config/plans`)

  const [messageToast, setMessageToast] = useState('')
  const [messageAlert, setMessageAlert] = useState('')
  const [notificationsToast, setNotificationsToast] = useState(false)
  const [notificationsAlert, setNotificationsAlert] = useState(false)

  useEffect(() => {
    const url = `${host}/api/config/plans`
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
  const createPlan = () => {
    setUrl(`${host}/api/config/plans`)
    setMethod('post')
    setCredentials({
      _id: '',
      name: '',
      price: '',
      description: ''
    })
  }

  // actualizar plan
  const updatePlan = (plan: any) => {
    setUrl(`${host}/api/config/plans/${plan._id}`)
    setMethod('put')
    setCredentials({
      _id: plan._id,
      name: plan.name,
      price: plan.price,
      description: plan.description
    })
  }

  // eliminar plan
  const deletePlan = (plan: any) => {
    setUrl(`${host}/api/config/plans/${plan._id}`)
    setMethod('delete')
    setCredentials({
      _id: plan._id,
      name: plan.name,
      price: plan.price,
      description: plan.description
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    let botonSubmit:any
    let botonCancel:any 

    if(method === 'delete'){
      botonSubmit = document.querySelector(".btn-submit-delete")
      botonCancel = document.querySelector(".btn-cancel-delete")
    }else{
      botonSubmit = document.querySelector(".btn-submit")
      botonCancel = document.querySelector(".btn-cancel")
    }
    
    botonSubmit.classList.add('loading')


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
      botonSubmit.classList.remove('loading')
      botonCancel.click()
    }).catch(e => {
      // const { data } = e.response
      // let message = data.message
      let message = 'Plan ya existente'
      setAlert(message)
      botonSubmit.classList.remove('loading')
    })
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
    <div className='container'>
      <div className='flex justify-between items-center mb-2'>
        <div className='flex items-center'>
          <h2 className='text-1xl uppercase'>Planes</h2>
        </div>
        <div className=''>
          <label htmlFor="modal-plan" className="btn btn-primary btn-sm text-white" onClick={() => createPlan()}>
            <i className="ri-add-line mr-2"></i>
            Agregar
          </label>
        </div>
      </div>
      <div className="overflow-x-auto mb-20 flex justify-center">
        <table className="table min-w-[800px] w-full text-center">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripci??n</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(plans.length > 0) ? (plans.map((plan) => (
              <tr>
                <td>{plan.name}</td>
                <td>{plan.price} $</td>
                <td>
                  <span className='whitespace-normal'>
                    {plan.description}
                  </span>
                </td>
                <td>
                  <div className="tooltip mr-4" data-tip="Editar">
                    <label htmlFor="modal-plan" className="btn btn-circle btn-ghost btn-sm hover:text-primary" onClick={() => updatePlan(plan)}>
                      <i className="ri-pencil-fill ri-lg"></i>
                    </label>
                  </div>
                  <div className="tooltip" data-tip="Eliminar">
                    <label htmlFor="modal-delete-plan" className="btn btn-circle btn-ghost btn-sm hover:text-primary" onClick={() => deletePlan(plan)}>
                      <i className="ri-delete-bin-7-fill ri-lg"></i>
                    </label>
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
      {/* create and edit */}
      <input type="checkbox" id="modal-plan" className="modal-toggle"/>
      <label htmlFor="modal-plan" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
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
                <input type="number" value={credentials.price} name="price" placeholder="10" className="input input-bordered w-full" onChange={handleChange} required />
                <span>USD</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Descripci??n</span>
              </label>
              <textarea name="description" value={credentials.description} className="textarea textarea-bordered h-24" placeholder="Ingresar descripci??n" onChange={handleChange} required></textarea>
            </div>
            <div className="modal-action flex justify-between">
              <label htmlFor="modal-plan" className="btn btn-cancel btn-ghost">Cancelar</label>
              <button className="btn btn-primary text-white btn-submit">Continuar</button>
            </div>
          </form>
        </label>
      </label>
      {/* delete */}
      <input type="checkbox" id="modal-delete-plan" className="modal-toggle" />
      <label htmlFor="modal-delete-plan" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className='text-center'>
            <i className="ri-error-warning-line ri-3x text-red-600"></i>
          </div>
          <h3 className="text-lg font-bold text-center">Eliminar el plan "{credentials.name}"</h3>
          <p className="py-4">Una ves eliminado el plan, este se eliminara permanentemente!</p>
          <p className='text-center'>Deseas Continuar?</p>
          <form onSubmit={handleSubmit}>
            <div className="modal-action flex justify-between">
              <label htmlFor="modal-delete-plan" className="btn btn-cancel-delete btn-ghost">Cancelar</label>
              <button className="btn btn-primary text-white btn-submit-delete">Continuar</button>
            </div>
          </form>
        </label>
      </label>
      {notificationsToast ? (
        <NotifacationToast text={messageToast} alertColor='alert-success' />
      ) : ''}
    </div>
  )
}