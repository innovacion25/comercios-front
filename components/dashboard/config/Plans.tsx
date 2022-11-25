import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import NotifacationToast from '../../NotificationToast';


export default function PlansConfig({ plans }) {
  const router = useRouter()

  const [credentials, setCredentials] = useState({
    name: '',
    price: '',
    description: ''
  })

  const [messageToast, setMessageToast] = useState('')
  const [notifications, setNotifications] = useState(false)

  // ejucuaciones de funciones
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let botonSubmit = e.target.children[3].children[1]
    botonSubmit.classList.add('loading')

    const url = 'http://localhost:3004/api/config/plans'

    await axios.post(url, credentials).then(res => {
      const {data} = res
      console.log(data)
    }).catch(e => {
      let message = e.data.message
      setNotifications(true)
      setTimeout(() => {
        setNotifications(false)
      }, 4000)
      setMessageToast(message)
    })

    botonSubmit.classList.remove('loading')
  }


  return (
    <>
      <div className='flex justify-between'>
        <div>
          <h2 className='text-2xl uppercase'>Planes</h2>
        </div>
        <div className='mb-8'>
          <label htmlFor="my-modal" className="btn btn-primary text-white">
            <i className="ri-add-line mr-2"></i>
            Agregar
          </label>
          <input type="checkbox" id="my-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4 text-center">Agregar nuevo plan</h3>

              <form onSubmit={handleSubmit}>

                <div className="form-control my-2">
                  <label className="label">
                    <span className="label-text">Nombre</span>
                  </label>
                  <input type="text" name="name" placeholder="Ingresar nombre" className="input input-bordered w-full" onChange={handleChange} required/>
                </div>

                <div className="form-control my-2">
                  <label className="label">
                    <span className="label-text">Ingresar monto</span>
                  </label>
                  <label className="input-group">
                    <input type="number" name="price" placeholder="10" className="input input-bordered w-full" min='0' onChange={handleChange} required/>
                    <span>USD</span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Descripción</span>
                  </label>
                  <textarea name="description" className="textarea textarea-bordered h-24" placeholder="Ingresar descripción" onChange={handleChange} required></textarea>
                </div>

                <div className="modal-action flex justify-between">
                  <label htmlFor="my-modal" className="btn">Cancelar</label>
                  <button className="btn btn-primary text-white">Continuar</button>
                </div>
              </form>
            </div>
          </div>
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
                    <label htmlFor={`edit-modal-${plan.name}`} className="btn btn-circle btn-ghost btn-sm hover:text-primary">
                      <i className="ri-pencil-fill ri-lg"></i>
                    </label>
                    <input type="checkbox" id={`edit-modal-${plan.name}`} className="modal-toggle" />
                    <div className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Editar plan seleccionado</h3>

                        <form onSubmit={handleSubmit}>

                          <div className="form-control my-2">
                            <label className="label">
                              <span className="label-text">Nombre</span>
                            </label>
                            <input type="text" name="name" placeholder="Ingresar nombre" className="input input-bordered w-full" onChange={handleChange} required/>
                          </div>

                          <div className="form-control my-2">
                            <label className="label">
                              <span className="label-text">Ingresar monto</span>
                            </label>
                            <label className="input-group">
                              <input type="number" name="price" placeholder="10" className="input input-bordered w-full" min='0' onChange={handleChange} required/>
                              <span>USD</span>
                            </label>
                          </div>

                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Descripción</span>
                            </label>
                            <textarea name="description" className="textarea textarea-bordered h-24" placeholder="Ingresar descripción" onChange={handleChange} required></textarea>
                          </div>

                          <div className="modal-action flex justify-between">
                            <label htmlFor={`edit-modal-${plan.name}`} className="btn">Cancelar</label>
                            <button className="btn btn-primary text-white">Continuar</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="tooltip" data-tip="Eliminar">
                    <button className="btn btn-circle btn-ghost btn-sm hover:text-primary">
                      <i className="ri-delete-bin-7-fill ri-lg"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Sin planes registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {notifications ? (
          <NotifacationToast text={messageToast} textColor='text-red-400' />
        ) : ''}
    </>
  )
}