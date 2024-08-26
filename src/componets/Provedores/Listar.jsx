import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteThungProvedores, getThungProvedores } from '../../store/slices/provedores.slice'

function Listar({ serIdEdicion, setPost,setIdPut }) {
  const [nRegistro, setNRegistro] = useState(10)
  const [idClientes, setIdCliente] = useState('')
  const [buscarPor, setBuscarPor] = useState('')
  const [busqueda, setBusqueda] = useState('');
  const [fAtencionDesde, setFAtencionDesde] = useState('')
  const [fAtencionHasta, setFAtencionHasta] = useState('')
  const [fecha, setFecha] = useState('F_creacion');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const provedoresValor = useSelector(state => state.provedoresSlice)
  useEffect(() => {
    dispatch(getThungProvedores())
  }, [])
  const datos = provedoresValor
    .filter(idClien => idClientes === '' || idClien.id === Number(idClientes))
    .filter(buscar => busqueda === '' || buscar[buscarPor].toLowerCase().includes(busqueda.toLowerCase()))
    .filter(usuario => {
      if (fAtencionDesde === '' && fAtencionHasta === '') return true;

      let fechaCreacionUsuario;

      if (fecha === 'F_creacion') {
        fechaCreacionUsuario = new Date(usuario.createdAt); // Asegúrate de que "Usuario.F_aviso" existe
      }

      const inicio = fAtencionDesde !== '' ? new Date(fAtencionDesde) : new Date(fAtencionDesde); // Fecha muy antigua por defecto
      const fin = fAtencionHasta !== '' ? new Date(fAtencionHasta) : new Date(fAtencionHasta); // Fecha muy futura por defecto

      return fechaCreacionUsuario >= inicio && fechaCreacionUsuario <= fin;
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
              <button onClick={() => setPost('agregarProvedores')} className="flex items-center py-1 px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#0087c8]">
                <i className="fa-solid fa-user-plus"></i>
                <h3>Agragar Usuario</h3>
              </button>
            </div>
            <form className="pl-2 grid sm:flex lg:grid gap-2 justify-end mx-auto">
              <div className="flex gap-2 items-center justify-start">
                <label htmlFor="" className='font-medium text-sm w-[80px]'>Buscar por: </label>
                <select id="countries" onChange={(e) => setBuscarPor(e.target.value)} className=" py-1 w-[74%] bg-white border border-[#969696] text-black text-sm rounded-md  block  px-2 focus:outline-none ">
                  <option selected>todos</option>
                  <option value="Usuario">Usuario</option>
                  <option value="Empresa">Empresa</option>
                  <option value="Rubro">Rubro</option>
                  <option value="Prioridad">Prioridad</option>
                  <option value="Cargo">Cargo</option>
                  <option value="Telefono">Telefono</option>
                  <option value="Ruc">Ruc</option>
                  <option value="RPM">RPM</option>
                  <option value="RPC">RPC</option>
                  <option value="Web">Web</option>
                  <option value="Direccion_Empresa">Correo</option>
                  <option value="createdAt">createdAt</option>
                  <option value="usuario">Usuario</option>
                  <option value="correo">Correo</option>
                  <option value="createdAt">createdAt</option>
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
                      id="F_creacion"
                      type="radio"
                      onClick={() => setFecha('F_creacion')}
                      name="fecha"
                      className="w-4 h-4"
                      checked={fecha === 'F_creacion'} // Controla cuál radio está seleccionado
                    />
                    <label htmlFor="F_creacion" className="ml-2 text-sm font-medium">
                      Fecha de creación
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
              {/* <div className="absolute w-[90%] left-0  bg-transparent h-full">

            </div> */}
              {/* </div> */}

            </div>
            <div className="flex tems-center justify-center gap-2 lg:justify-end">
              <label htmlFor="registro-2" className="font-medium text-sm">ID del Usuario</label>
              <input
                id="registro-2"
                type="number"
                onChange={e => setIdCliente(e.target.value)}
                className="py-1 bg-white border border-[#969696] text-black text-sm rounded-md block px-2 focus:outline-none"
              />
            </div>
            <div className="flex justify-center items-center">
              <label className="font-medium text-sm">
                <i className="text-yellow-400 fa-solid fa-triangle-exclamation"></i> Actualmente hay <span className="text-[#0087c8]">{provedoresValor.length} Usuario</span>
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
                      F_atencion
                    </div>
                  </h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Empresa</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Rubro</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Prioridad</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Cargo</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Entel</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Telefono</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Ruc</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Celular</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">RPC</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">RPM</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Correo</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Web</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center whitespace-nowrap">Direccion Empresa</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Referencia</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Pais</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Ciudad</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Distrito</h4>
                </th>
                <th scope="col" className="px-6 py-3">
                  <h4 className="text-center">Codigo</h4>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                charactersPaginated.map((Provedores, index) => (
                  <tr key={index} className="bg-white border-b divide-x ">
                    <td className="px-4 py-2 text-center gap-1 flex mt-1 justify-center">
                      <button onClick={() => [serIdEdicion(Provedores.id), setIdPut('editarProvedores')]} className="px-2 font-medium py-1 whitespace-nowrap text-white bg-[#0087c8] rounded flex justify-center items-center gap-1">
                        <i className="fa-solid fa-pen-to-square"></i>Edit
                      </button>
                      <button onClick={()=>{dispatch(deleteThungProvedores(Provedores.id))}} className="px-2 font-medium py-1 whitespace-nowrap text-white bg-[#cc2630] rounded flex justify-center items-center gap-1">
                        <i className="fa-solid fa-trash-can"></i>Eliminar
                      </button>

                    </td>
                    <th scope="row" className="px-4 py-2 text-center font-medium text-black whitespace-nowrap ">
                      {Provedores.id}
                    </th>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.Usuario || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.createdAt ? new Date(Provedores.F_atencion).toLocaleDateString() : ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.Empresa || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.Rubro || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.Prioridad || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.Cargo || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.Entel || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.Telefono || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.Ruc || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.Celular || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.RPC || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.RPM || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.Correo || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.Web || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.Direccion_Empresa || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.Deferencia || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.Pais || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.Ciudad || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.Distrito || ' '}
                    </td>
                    <td className="px-4 py-2 text-center whitespace-nowrap">
                      {Provedores.Codigo || ' '}
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

export default Listar