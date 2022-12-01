// import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import NotifacationToast from '../../NotificationToast';
import NotifacationAlert from '../../NotificationAlert';


export default function LocationsConfig() {
    const router = useRouter()
    const host = 'http://localhost:3004'

    const [credentials, setCredentials] = useState({
        _id: '',
        nacionalidad: '',
        estados: [{ _id: '', nombre: '', municipios: [{ _id: '', nombre: '', parroquias: [{ _id: '', nombre: '' }] }] }]
    })

    const [locations, seLocations] = useState([{
        _id: '',
        nacionalidad: '',
        estados: [{ _id: '', nombre: '', municipios: [{ _id: '', nombre: '', parroquias: [{ _id: '', nombre: '' }] }] }]
    }])

    const [loadingLocation, setLoadingLocation] = useState(false)
    const [method, setMethod] = useState('get')
    const [url, setUrl] = useState(`${host}/api/config/locations`)

    const [messageToast, setMessageToast] = useState('')
    const [messageAlert, setMessageAlert] = useState('')
    const [notificationsToast, setNotificationsToast] = useState(false)
    const [notificationsAlert, setNotificationsAlert] = useState(false)

    useEffect(() => {
        const url = `${host}/api/config/locations`
        const getLocations = async () => {
            const { data } = await axios.get(url)
            seLocations(data)
        }
        getLocations()
        setLoadingLocation(false)
    }, [loadingLocation == true])

    // ejucuaciones de funciones
    const handleChange = (e: any) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    // crear location
    const createCategory = () => {
        setUrl(`${host}/api/config/locations`)
        setMethod('post')
        setCredentials({
            _id: '',
            nacionalidad: '',
            estados: [{ _id: '', nombre: '', municipios: [{ _id: '', nombre: '', parroquias: [{ _id: '', nombre: '' }] }] }]
        })
    }

    // actualizar location
    const updateCategory = (location: any) => {
        setUrl(`${host}/api/config/locations/${location._id}`)
        setMethod('put')
        setCredentials({
            _id: category._id,
            name: category.name,
            description: category.description
        })
    }

    // eliminar location
    const deleteCategory = (location: any) => {
        setUrl(`${host}/api/config/categorys/${location._id}`)
        setMethod('delete')
        setCredentials({
            _id: category._id,
            name: category.name,
            description: category.description
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        let botonSubmit: any
        let botonCancel: any

        if (method === 'delete') {
            botonSubmit = document.querySelector(".btn-submit-delete-location")
            botonCancel = document.querySelector(".btn-cancel-delete-location")
        } else {
            botonSubmit = document.querySelector(".btn-submit-location")
            botonCancel = document.querySelector(".btn-cancel-location")
        }

        botonSubmit.classList.add('loading')


        axios({
            method: method,
            url: url,
            data: credentials
        }).then(res => {
            // const { data } = res
            // let message = data.message
            let message = 'Categoria creada'
            setLoadingLocation(true)
            setToast(message)
            botonSubmit.classList.remove('loading')
            botonCancel.click()
        }).catch(e => {
            // const { data } = e.response
            // let message = data.message
            let message = 'Categoria ya existente'
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
                <div>
                    <h2 className='text-1xl uppercase'>Localidades</h2>
                </div>
                <div className=''>
                    <label htmlFor="modal-location" className="btn btn-primary btn-sm text-white" onClick={() => createCategory()}>
                        <i className="ri-add-line mr-2"></i>
                        Agregar
                    </label>
                </div>
            </div>
            <div className="overflow-x-auto mb-20 flex justify-center">
                <table className="table min-w-[800px] w-full text-center ">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(locations.length > 0) ? (locations.map((location) => (
                            <tr>
                                <td>
                                    sd
                                </td>
                                <td>
                                    <span className='whitespace-normal'>
                                        {location.description}
                                    </span>
                                </td>
                                <td>
                                    <div className="tooltip mr-4" data-tip="Editar">
                                        <label htmlFor="modal-location" className="btn btn-circle btn-ghost btn-sm hover:text-primary" onClick={() => updateCategory(category)}>
                                            <i className="ri-pencil-fill ri-lg"></i>
                                        </label>
                                    </div>
                                    <div className="tooltip" data-tip="Eliminar">
                                        <label htmlFor="modal-delete-location" className="btn btn-circle btn-ghost btn-sm hover:text-primary" onClick={() => deleteCategory(category)}>
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
            <input type="checkbox" id="modal-location" className="modal-toggle" />
            <label htmlFor="modal-location" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <div className="tabs flex justify-center">
                        <a className="tab tab-bordered">Tab 1</a>
                        <a className="tab tab-bordered tab-active">Tab 2</a>
                        <a className="tab tab-bordered">Tab 3</a>
                    </div>
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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Descripción</span>
                            </label>
                            <textarea name="description" value={credentials.description} className="textarea textarea-bordered h-24" placeholder="Ingresar descripción" onChange={handleChange} required></textarea>
                        </div>
                        <div className="modal-action flex justify-between">
                            <label htmlFor="modal-location" className="btn btn-cancel-location btn-ghost">Cancelar</label>
                            <button className="btn btn-primary text-white btn-submit-location">Continuar</button>
                        </div>
                    </form>
                </label>
            </label>
            {/* delete */}
            <input type="checkbox" id="modal-delete-location" className="modal-toggle" />
            <label htmlFor="modal-delete-location" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <div className='text-center'>
                        <i className="ri-error-warning-line ri-3x text-red-600"></i>
                    </div>
                    <h3 className="text-lg font-bold text-center">Eliminar el categoria "{credentials.name}"</h3>
                    <p className="py-4">Una ves eliminada la categoria, este se eliminara permanentemente!</p>
                    <p className='text-center'>Deseas Continuar?</p>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-action flex justify-between">
                            <label htmlFor="modal-delete-location" className="btn btn-cancel-delete-location btn-ghost">Cancelar</label>
                            <button className="btn btn-primary text-white btn-submit-delete-location">Continuar</button>
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