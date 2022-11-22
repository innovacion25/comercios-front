import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import BaseDashboard from '../../../components/dashboard/BaseDashboard';

export default function configPage({ plans }) {
  return (
    <>
      <BaseDashboard tpsUser='superuser'>
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
                <h3 className="font-bold text-lg mb-4">Agregar nuevo plan</h3>

                <div className="form-control my-2">
                  <label className="label">
                    <span className="label-text">Nombre</span>
                  </label>
                  <input type="text" placeholder="Ingresar nombre" className="input input-bordered w-full" />
                </div>

                <div className="form-control my-2">
                  <label className="label">
                    <span className="label-text">Ingresar monto</span>
                  </label>
                  <label className="input-group">
                    <input type="number" placeholder="10" className="input input-bordered w-full" min='0' />
                    <span>USD</span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Descripción</span>                    
                  </label>
                  <textarea className="textarea textarea-bordered h-24" placeholder="Ingresar descripción"></textarea>
                </div>

                <div className="modal-action flex justify-between">
                  <label htmlFor="my-modal" className="btn">Cancelar</label>
                  <label htmlFor="my-modal" className="btn btn-primary text-white">Continuar</label>
                </div>
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
              {plans.map((plan) => (
                <tr>
                  <td>{plan.name}</td>
                  <td>{plan.price}</td>
                  <td>{plan.description}</td>
                  <td>
                    <div className="tooltip mr-4" data-tip="Editar">
                      <button className="btn btn-circle btn-ghost btn-sm">
                        <i className="ri-pencil-fill ri-lg"></i>
                      </button>
                    </div>
                    <div className="tooltip" data-tip="Eliminar">
                      <button className="btn btn-circle btn-ghost btn-sm">
                        <i className="ri-delete-bin-7-fill ri-lg"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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