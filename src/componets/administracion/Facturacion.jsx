import React, { useState } from 'react'
import ejemploData from '../../ejemplo.json'
function Facturacion() {
  const [page, setPage] = useState(1);

  const datos = ejemploData.Administracion.Facturacion
console.log(ejemploData.Administracion.Facturacion)
  const lidatos = 10;
  const lastCharacterIndex = page * lidatos; //15;
  const firstCharacterIndex = lastCharacterIndex - lidatos;
  const charactersPaginated = datos.slice(
    firstCharacterIndex,
    lastCharacterIndex
  );
  const totalPgaginas = Math.ceil(datos.length / lidatos);
  const pagNumber = [];
  for (let i = 1; i <= totalPgaginas; i++) {
    pagNumber.push(i);
  }
  return (
    <main>
      <div className="flex mb-2">
        <form className="sm:flex grid justify-end  rounded-md bg-white shadow-lg p-2 gap-2 ">
        <div className="flex gap-1 sm:gap-2 items-center justify-start">
            
            <label htmlFor="" className='font-medium text-sm'>
              <button className="flex items-center py-1 px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#0087c8]">
              <i className="fa-solid fa-square-pen"></i>
                <h3 className='whitespace-nowrap'>NUEVA FACTURA</h3>
              </button>
            </label>
                <select id="countries" className=" py-1 w-[74%] bg-white border border-[#969696] text-black text-sm rounded-md  block  px-2 focus:outline-none ">
              <option value="" selected disabled>Seleccione</option>
              <option value="idconsulta">N</option>
              <option value="usuario">Usuario</option>
              <option value="fecha_consulta">Fecha Requerimiento</option>
              <option value="empresa">Empresa</option>
              <option value="asunto">Requerimientos</option>
              <option value="Derivado">Origen</option>
              <option value="status">Status</option>
              <option value="nombres">Nombres</option>
              <option value="apellidos">Apellidos</option>
              <option value="fechaaviso">Fecha Respuesta Cliente</option>
              <option value="fatencion">Fecha Atencion</option>
              <option value="email">Email</option>
              <option value="direccion">Direccion</option>
              <option value="telefono">Telefono</option>
              <option value="celular">Celular</option>
            </select>
          </div>


        

          <div className="flex gap-1 sm:gap-2 items-center justify-start">
            <input type="text" className=" py-1  bg-white border  border-[#969696] text-black text-sm rounded-md  block  px-2 focus:outline-none" />
            <label htmlFor="" className='font-medium text-sm'>
              <button className="flex items-center py-1 px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#0087c8]">
                <i className="fa-solid fa-magnifying-glass"></i>
                <h3>BUSCAR</h3>
              </button>
            </label>
          </div>
        </form>

      </div>
      <div className=' overflow-hidden'>
        {/*  scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent */}
        <div className=" relative overflow-x-auto shadow-md sm:rounded-lg lg:max-w-[83vw]" >
          <table className="w-full text-sm text-left rtl:text-right text-black overflow-y-auto ">
            <thead className="text-xs text-white uppercase bg-[#0087c8]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center ">
                    <span className="sr-only">Edit</span>
                  </h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center w-[200px]">Fecha de Emision:</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center w-[200px]">Nro de Factura:</h4>
                </th>

                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center w-[200px]">Nro Cotizacion:</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center w-[200px] mx-auto">Nombres y Apellidos</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center w-[200px]">Señor(es)</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center w-[200px]">Estado de Pago</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center w-[200px]">Nro de Guia Emision</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center ">Total</h4>
                </th>
 
              </tr>
            </thead>
            <tbody>
              {
                charactersPaginated.map((cliente, index) => (
                  <tr key={index} className="bg-white border-b divide-x">
                    <td className="px-4 py-2 text-center gap-1 mt-1 flex">
                      <a  className="font-medium py-1 w-[100px] text-white bg-[#0087c8] rounded flex justify-center items-center gap-1">
                      <i className="fa-solid fa-cash-register"></i>Detalles
                      </a>
                      <a className="font-medium py-1 w-[100px] text-white bg-[#cc2630] rounded flex justify-center items-center gap-1">
                      <i className="fa-solid fa-pen-to-square"></i>Editar
                      </a>

                    </td>
                    <td  className="px-4 py-2 text-center min-w-[150px]">
                      {cliente.F_Emicion}
                    </td>
                    <td className="px-4 py-2 text-center min-w-[150px]">
                      {cliente.Nro_Factura || ' '}
                    </td>
                    <td className="px-4 py-2 text-center min-w-[150px]">
                      {cliente.Nro_Cotizacion || ' '}
                    </td>
                    <td className="px-4 py-2 text-center min-w-[150px]">
                      {cliente.NombreApellido || ' '}
                    </td>

                    <td className="px-4 py-2 text-center min-w-[150px]">
                      {cliente.señor || ' '}
                    </td>
                    <td className="px-4 py-2 text-center min-w-[150px]">
                      {cliente.estadoPago || ' '}
                    </td>
                    <td className="px-4 py-2 text-center min-w-[150px]">
                      {cliente.Nro_de_Guia_Emision || ' '}
                    </td>

                    <td className="px-4 py-2 text-center min-w-[150px]">
                      {cliente.Total || ' '}
                    </td>
                   
                  </tr>
                ))
              }
            </tbody>

          </table>
        </div>

      </div>
    </main>
  )
}

export default Facturacion