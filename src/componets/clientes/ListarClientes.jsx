import React, { useEffect, useState } from 'react'
import ejemploData from '../../ejemplo.json'
import { useDispatch, useSelector } from 'react-redux';
import { deleteClienteListarCliente, getClienteListarCliente } from '../../store/slices/clienteListarCliente';

function ListarClientes({ setIdPut, serIdEdicion, setPost }) {

  const dispatch = useDispatch();
  const [nRegistro, setNRegistro] = useState(10)
  const [idClientes, setIdCliente] = useState('')
  const [buscarPor, setBuscarPor] = useState('')
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState([])
  const [fAtencionDesde, setFAtencionDesde] = useState('')
  const [fAtencionHasta, setFAtencionHasta] = useState('')
  const [filterTiposDeClientes, setFilterTiposDeClientes] = useState('');
  const [filterStatusAtencion, setFilterStatusAtencion] = useState('');
  const [cumpleaños, setCumpleaños] = useState('');
  const [page, setPage] = useState(1);
  const [fecha, setFecha] = useState('F_atencion');

  const estadoLoading = useSelector((state) => state.clienteLitarCliente);

  useEffect(() => {
    dispatch(getClienteListarCliente());
  }, [dispatch]);

  // Actualiza localLoading solo si cambia el estado de carga
  useEffect(() => {
    if (loading !== estadoLoading) {
      setLoading(estadoLoading);
    }
  }, [loading, estadoLoading]);


  // Función para manejar el cambio de selección

  const datos = loading
    .filter(TipyCliente => filterTiposDeClientes === '' || TipyCliente.Tipos_Cliente.includes(filterTiposDeClientes))
    .filter(statusAtencion => filterStatusAtencion === '' || statusAtencion.Status_atencion.includes(filterStatusAtencion))
    .filter(cumple => cumpleaños === '' || cumple.Cumpleaños.includes(cumpleaños))
    .filter(idClien => idClientes === '' || idClien.id === Number(idClientes))
    .filter(buscar => busqueda === '' || buscar[buscarPor].toLowerCase().includes(busqueda.toLowerCase()))
    .filter(cliente => {
      if (fAtencionDesde === '' && fAtencionHasta === '') return true;
  
      let fechaCliente;
  
      if (fecha === 'F_atencion') {
        fechaCliente = new Date(cliente.F_aviso); // Asegúrate de que "cliente.F_aviso" existe
      } else {
        fechaCliente = new Date(cliente.createdAt); // Asegúrate de que "cliente.createdAt" existe
      }
  
      const inicio = fAtencionDesde !== '' ? new Date(fAtencionDesde) : new Date(fAtencionDesde); // Fecha muy antigua por defecto
      const fin = fAtencionHasta !== '' ? new Date(fAtencionHasta) : new Date(fAtencionHasta); // Fecha muy futura por defecto
  
      return fechaCliente >= inicio && fechaCliente <= fin;
    });



  const lidatos = nRegistro;
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
    <main className="">
      <div className="flex mb-2 ">
        <section className="grid rounded-md bg-white shadow-lg p-2 gap-2 divide-y ">
          <section className="grid lg:flex gap-2 divide-x-0 lg:divide-x">
            <div className="flex items-center justify-center">
              <button onClick={() => [setPost("verAgregarListaCliente")]} className="flex items-center py-1 px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#0087c8]">
                <i className="fa-solid fa-user-plus"></i>
                <h3>Agragar Cliente</h3>
              </button>
            </div>
            <form className="pl-2 grid sm:flex lg:grid gap-2 justify-end mx-auto">
              <div className="flex gap-2 items-center justify-start">
                <label htmlFor="" className='font-medium text-sm w-[80px]'>Buscar por: </label>
                <select id="countries" onChange={(e) => setBuscarPor(e.target.value)} className=" py-1 w-[74%] bg-white border border-[#969696] text-black text-sm rounded-md  block  px-2 focus:outline-none ">
                  <option selected>todos</option>
                  <option value="Razon_Comercial">Razon Comercial</option>
                  <option value="Razon_Social">Razon Social</option>
                  <option value="Nombre">Nombres</option>
                  <option value="Apellido">Apellidos</option>
                  <option value="Usuario">Usuario</option>
                  <option value="Rubro">Rubro</option>
                  <option value="RUC">RUC</option>
                  <option value="Telefono">Teléfono</option>
                  <option value="Celular">Celular</option>
                  <option value="F_Atencion">Fecha de Atencion</option>
                  <option value="Direccion">Direccion Cliente</option>
                  <option value="Obs_Direccion_Empresa">Direccion Empresa</option>
                  <option value="E_Mail">Emails</option>
                  <option value="web">Web</option>
                </select>
              </div>
              <div className="flex gap-2 items-center justify-start">
                <label htmlFor="" className='font-medium text-sm'>Busqueda:  </label>
                <div className="relative flex items-center">
                  <input
                    id="registro-1"
                    type="text"
                    onChange={e => setBusqueda(e.target.value)}
                    className="py-1 bg-white border border-[#969696] text-black text-sm rounded-md block px-2 pr-8 focus:outline-none"
                  />
                  <i className="cursor-pointer fa-solid fa-magnifying-glass absolute right-2 text-gray-500"></i>
                </div>
              </div>
            </form>
            <form action="">
              <div className="py-1 px-2 sm:flex grid gap-2 justify-around">
                <div className="flex justify-around sm:grid gap-2">
                  <div className="flex items-center">
                    <input
                      id="default-radio-1"
                      type="radio"
                      onClick={() => setFecha('F_aviso')}
                      name="default-radio"
                      className="w-4 h-4"
                      checked={fecha === 'F_aviso'} // Controla cuál radio está seleccionado
                    />
                    <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium">
                      Fecha de Aviso
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="default-radio-2"
                      type="radio"
                      onClick={() => setFecha('F_atencion')}
                      name="default-radio"
                      className="w-4 h-4"
                      checked={fecha === 'F_atencion'} // Controla cuál radio está seleccionado
                    />
                    <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium">
                      Fecha de Atencion
                    </label>
                  </div>
                </div>

                <div className="grid gap-1 ml-2">
                  <div className="flex col-span-6 sm:col-span-3 md:col-span-3 lg:col-span-2 gap-2 items-center justify-center lg:justify-end">
                    <label htmlFor="registro-1" className="font-medium text-sm">Desde: </label>
                    <input
                      onChange={e => setFAtencionDesde(e.target.value)}
                      id="registro-1"
                      type="date"
                      className="py-1 bg-white border border-[#969696] text-black text-sm rounded-md block px-2 pr-8 focus:outline-none"
                    />
                  </div>
                  <div className="flex col-span-6 sm:col-span-3 md:col-span-3 lg:col-span-2 gap-2 items-center justify-center lg:justify-end">
                    <label htmlFor="registro-1" className="font-medium text-sm">Hasta: </label>
                    <input
                      onChange={e => setFAtencionHasta(e.target.value)}
                      id="registro-1"
                      type="date"
                      className="py-1 bg-white border border-[#969696] text-black text-sm rounded-md block px-2 pr-8 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </form>

          </section>

          <form className="grid md:flex justify-evenly pt-2 gap-4">

            <div className="flex gap-2 items-center justify-center ">
              <label htmlFor="registro-1" className="font-medium text-sm">N° Registro</label>
              {/* <div className="relative flex items-center"> */}
              <input
                id="registro-1"
                type="number"
                min={1}
                value={nRegistro}

                onChange={e => setNRegistro(e.target.value)}
                className="py-1 select-none bg-white border border-[#969696] text-black text-sm rounded-md block px-2 focus:outline-none"
              />
            </div>
            <div className="flex tems-center justify-center gap-2 lg:justify-end">
              <label htmlFor="registro-2" className="font-medium text-sm">ID del Cliente</label>
              <input
                id="registro-2"
                type="number"
                onChange={e => setIdCliente(e.target.value)}
                className="py-1 bg-white border border-[#969696] text-black text-sm rounded-md block px-2 focus:outline-none"
              />
            </div>
            <div className="flex justify-center items-center">
              <label className="font-medium text-sm">
                <i className="text-yellow-400 fa-solid fa-triangle-exclamation"></i> Actualmente hay <span className="text-[#0087c8]">{loading.length} cliente</span>
              </label>
            </div>
          </form>
        </section>
      </div>
      <div className=' overflow-hidden'>
        {/*  scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent */}
        <div className=" relative overflow-x-auto shadow-md sm:rounded-lg lg:max-w-[83vw]" >
          <table className="w-full text-sm text-left rtl:text-right text-black overflow-y-auto ">
            <thead className="text-xs text-white uppercase  bg-[#0087c8]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center ">
                    <span className="sr-only">Edit</span>
                  </h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">N°</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Usuario</h4>
                </th>
                <th scope="col" className="px-6 py-3" >
                  <h4 className="text-center">
                    <div className="flex items-center justify-center">
                      F.atencion
                    </div>
                  </h4>
                </th>
                <th scope="col" className="px-6 py-3" >
                  <h4 className="text-center">
                    <div className="flex items-center justify-center">
                      F.Aviso
                    </div>
                  </h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center whitespace-nowrap">Razon Commercial</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center whitespace-nowrap mx-auto">Razon Social</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Rubro</h4>
                </th>
                <th scope="col" className="px-6 py-3 flex items-center gap-1">
                  <h4 className="text-center whitespace-nowrap">Tipos de Cliente</h4>
                  <select
                    id="countries"
                    className="py-1 font-light bg-white border border-[#969696] text-black text-sm rounded-md block px-1 focus:outline-none"
                    onChange={(e) => setFilterTiposDeClientes(e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="Ninguno">Ninguno</option>
                    <option value="Potenciales">Potenciales</option>
                    <option value="Frecuentes">Frecuentes</option>
                    <option value="Ocasionales">Ocasionales</option>
                    <option value="Tercerizadores">Tercerizadores</option>
                    <option value="Prospecto">Prospecto</option>
                    <option value="No Potencial">No Potencial</option>
                    <option value="Mal Cliente">Mal Cliente</option>
                  </select>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center w-[200px]">Origen</h4>
                </th>
                <th scope="col" className="px-6 py-3 flex items-center gap-1">
                  <h4 className="text-center whitespace-nowrap ">Status Atencion</h4>
                  <select
                    id="countries"
                    className="py-1 font-light bg-white border border-[#969696] text-black text-sm rounded-md block px-1 focus:outline-none "
                    onChange={(e) => setFilterStatusAtencion(e.target.value)}
                  >
                    <option selected value="">todos</option>
                    <option value="Contacto Inicial" >Contacto Inicial</option>
                    <option value="Retomar Contacto" >Retomar Contacto</option>
                    <option value="Pendientes por Cotizar" >Pendientes por Cotizar</option>
                    <option value="Cotizado" >Cotizado</option>
                    <option value="Venta Realizado" >Venta Realizado</option>
                    <option value="Venta No Realizado" >Venta No Realizado</option>
                    <option value="Prod. Entregado" >Prod. Entregado</option>
                  </select>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center ">Cargo</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center ">Entel</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center ">Telefono</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center ">RUC</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center ">Celular</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">RPC</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">RPM</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center ">E-Mail</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center ">Web</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center ">Dirección</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center whitespace-nowrap">Direccion de Empresa</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Referencia</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Distrito</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Ciudad</h4>
                </th>
                <th scope="col" className="px-6 py-3 flex items-center gap-1">
                  <h4 className="text-center  ">Cumpleaños</h4>
                  <select
                    id="countries"
                    className="py-1 font-light bg-white border border-[#969696] text-black text-sm rounded-md block px-1 focus:outline-none"
                    onChange={(e) => setCumpleaños(e.target.value)}
                  >
                    <option selected value="">todos</option>
                    <option value="Enero">Enero</option>
                    <option value="Febrero">Febrero</option>
                    <option value="Marzo">Marzo</option>
                    <option value="Abril">Abril</option>
                    <option value="Mayo">Mayo</option>
                    <option value="Junio">Junio</option>
                    <option value="Julio">Julio</option>
                    <option value="Agosto">Agosto</option>
                    <option value="Septiembre">Septiembre</option>
                    <option value="Octubre">Octubre</option>
                    <option value="Noviembre">Noviembre</option>
                    <option value="Diciembre">Diciembre</option>
                  </select>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center whitespace-nowrap">Aniversario</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center whitespace-nowrap">Skype</h4>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                charactersPaginated.map((cliente, index) => (
                  <tr key={index} className="bg-white border-b divide-x ">
                    <td className="px-4 py-2 text-center gap-1 flex mt-1">
                      <button onClick={() => [serIdEdicion(cliente.id), setIdPut('editarListarClietne')]} className="px-2 font-medium py-1 whitespace-nowrap text-white bg-[#0087c8] rounded flex justify-center items-center gap-1">
                        <i className="fa-solid fa-pen-to-square"></i>Edit
                      </button>
                      <button onClick={() => [dispatch(deleteClienteListarCliente(cliente.id))]} className="px-2 font-medium py-1 whitespace-nowrap text-white bg-[#cc2630] rounded flex justify-center items-center gap-1">
                        <i className="fa-solid fa-trash-can"></i>Eliminar
                      </button>

                    </td>
                    <th scope="row" className="px-4 py-2 text-center font-medium text-black whitespace-nowrap ">
                      {cliente.id}
                    </th>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.Usuario || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.updatedAt ? new Date(cliente.updatedAt).toLocaleDateString() : ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.F_aviso ? new Date(cliente.F_aviso).toLocaleDateString() : ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.Razon_Comercial || ' '}
                    </td>
                    <td className="px-4 whitespace-nowrap  py-2 text-center ">
                      {cliente.Razon_Social || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.Rubro || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.Tipos_Cliente || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.Origen || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.Status_atencion || ' '}
                    </td>
                    <td className="px-4 whitespace-nowrap  py-2 text-center">
                      {cliente.Cargo || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.Entel || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.Telefono || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.RUC || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.Celular || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.RPC || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.RPM || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.E_Mail || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.Web || ' '}
                    </td>
                    <td className="px-4 whitespace-nowrap  py-2 text-center">
                      {cliente.Dirección || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap ">
                      {cliente.Obs_Direccion_Empresa || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.Referencia || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.Distrito || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.Ciudad || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.Cumpleaños ? new Date(cliente.Cumpleaños).toLocaleDateString() : ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.Aniversario ? new Date(cliente.Aniversario).toLocaleDateString() : ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {cliente.Skype || ' '}
                    </td>
                  </tr>
                ))
              }
            </tbody>

          </table>
        </div>

      </div>
      <div className="flex mt-2 p-2 justify-center">
        <nav aria-label="" className="flex justify-center">
          <ul className="inline-flex -space-x-px text-[1.1em] ">
            <li>
              <a
                onClick={() => setPage(1)}
                className="text-sm cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight rounded-l-lg border-r-2 border-white bg-[#0087c8] text-white hover:bg-[#3381a8]"
              >
                <i className="fa-solid fa-angles-left"></i>
              </a>
            </li>
            {pagNumber.map((number) => (
              <li key={number}>
                <a
                  onClick={() => setPage(number)}
                  className="text-sm cursor-pointer flex items-center justify-center px-3 h-8 bg-[#0087c8] border-r-2 border-white  text-white hover:bg-[#3381a8]"
                >
                  {number}
                </a>
              </li>
            ))}
            <li>
              <a
                onClick={() => setPage(totalPgaginas)}
                className="text-sm cursor-pointer flex items-center justify-center px-3 h-8 leading-tight bg-[#0087c8] text-white hover:bg-[#3381a8] rounded-e-lg "
              >
                <i className="fa-solid fa-angles-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>

    </main>
  )
}

export default ListarClientes