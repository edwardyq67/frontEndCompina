import { useEffect, useRef, useState } from 'react'

import './App.css'
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './login/Login'
import { useForm } from 'react-hook-form';
import Inicio from './componets/Inicio'
import Nav from './navbar/Nav'
import NavVertical from './navbar/NavVertical'
import ListarClientes from './componets/clientes/ListarClientes'
import Requerimiento from './componets/clientes/Requerimiento'
import Listar from './componets/Provedores/Listar'
import Nuevo from './componets/usuarios/Nuevo'
import Inventario from './componets/Inventario'
import { useDispatch } from 'react-redux';
import { postClienteListarCliente, putClienteListarCliente } from './store/slices/clienteListarCliente';
import axios from 'axios';
import ProtectedRoutes from './login/ProtectedRoutes';
import { postThungUsuario } from './store/slices/usuario.slice';
import { postThungCRequerimiento, putThungCRequerimiento } from './store/slices/clienteRequerimiento.slice';
import { postThungProvedores, putThungProvedores } from './store/slices/provedores.slice';


function App() {
  // cliente
  const { register: postClienteRegister, handleSubmit: postClienteHandleSubmit, reset: postClienteReset } = useForm();
  const { register: putClienteRegister, handleSubmit: putClienteHandleSubmit, reset: putClienteRest, setValue: putClienteSetValue } = useForm();

  const { register: postClienteRequerimiento, handleSubmit: postClienteRequerimientoHandleSubmit, reset: postClienteRequerimientoReset } = useForm();
  const { register: putClienteRequerimiento, handleSubmit: putClienteRequerimientoHandleSubmit, reset: putClienteRequerimientoReset, setValue: putClienteRequerimientoSetValue } = useForm();
  // usuario
  const { register: postUsuario, handleSubmit: postUsuarioHandleSubmit, reset: postUsuarioReset } = useForm();
  const { register: putUsuario, handleSubmit: putUsuarioHandleSubmit, reset: putUsuarioReset, setValue: putUsuarioSetValue } = useForm();
  //provedores 
  const { register: postProvedores, handleSubmit: postProvedoresHandleSubmit, reset: postProvedoresReset } = useForm();
  const { register: putProvedores, handleSubmit: putProvedoresHandleSubmit, reset: putProvedoresReset, setValue: putProvedoresSetValue } = useForm();

  const dispatch = useDispatch();
  const [mostrarPag, setMostrarPag] = useState('')
  const [ruta, setRutas] = useState("/Inicio")
  const [secionid, setSeccionId] = useState([])
  // Cliente
  // lista de cliente
  const [post, setPost] = useState('')
  // agregar
  const [activarAgregarClienteListarCliene, setActivarAgregarClienteListarCliene] = useState('Informacion')
  const isActivarAgregarClienteListarCliene = (tab) => activarAgregarClienteListarCliene === tab;
  // editar
  const [idEdicion, serIdEdicion] = useState('')
  const [idEdit, setIdEdit] = useState('')
  const [idPut, setIdPut] = useState('')

  const postClienteLista = async (data) => {
    const processedData = {
      Usuario: data.Usuario || "",
      E_Mail: data.E_Mail || "",
      Skype: data.Skype || "",
      Cumpleaños: data.Cumpleaños || "",
      Telefono: data.Telefono || "",
      Celular: data.Celular || "",
      Entel: data.Entel || "",
      RPC: data.RPC || "",
      RPM: data.RPM || "",
      Pais: data.Pais || "",
      Ciudad: data.Ciudad || "",
      Provincia: data.Provincia || "",
      Distrito: data.Distrito || "",
      C_postal: data.C_postal || "",
      Dirección: data.Dirección || "",
      Referencia: data.Referencia || "",
      RUC: data.RUC || "",
      Obs_Direccion_Empresa: data.Obs_Direccion_Empresa || "",
      Razon_Comercial: data.Razon_Comercial || "",
      Razon_Social: data.Razon_Social || "",
      Obs_direccion: data.Obs_direccion || "",
      Cargo: data.Cargo || "",
      Aniversario: data.Aniversario || "",
      F_aviso: data.F_aviso || "",
      Rubro: data.Rubro || "",
      Codigo: data.Codigo || "",
      Tipos_Cliente: data.Tipos_Cliente || "",
      Status_atencion: data.Status_atencion || "",
      Origen: data.Origen || "",
      Web: data.Web || "",
      C_presentacion: data.C_presentacion === "true" ? true : false,
      Catalogo: data.Catalogo === "true" ? true : false,
      P_presentacion: data.P_presentacion === "true" ? true : false,
      id: data.id
    };

    try {
      await dispatch(postClienteListarCliente(processedData));

    } catch (error) {
      console.error('Error al enviar los datos:', error.response?.data || error.message);
    }
  };

  const editIdCliente = async (data) => {
    const processedDataEdit = {
      Usuario: data.Usuario || "",
      E_Mail: data.E_Mail || "",
      Skype: data.Skype || "",
      Cumpleaños: data.Cumpleaños || "",
      Telefono: data.Telefono || "",
      Celular: data.Celular || "",
      Entel: data.Entel || "",
      RPC: data.RPC || "",
      RPM: data.RPM || "",
      Pais: data.Pais || "",
      Ciudad: data.Ciudad || "",
      Provincia: data.Provincia || "",
      Distrito: data.Distrito || "",
      C_postal: data.C_postal || "",
      Dirección: data.Dirección || "",
      Referencia: data.Referencia || "",
      RUC: data.RUC || "",
      Obs_Direccion_Empresa: data.Obs_Direccion_Empresa || "",
      Razon_Comercial: data.Razon_Comercial || "",
      Razon_Social: data.Razon_Social || "",
      Obs_direccion: data.Obs_direccion || "",
      Cargo: data.Cargo || "",
      Aniversario: data.Aniversario || "",
      F_aviso: data.F_aviso || "",
      Rubro: data.Rubro || "",
      Codigo: data.Codigo || "",
      Tipos_Cliente: data.Tipos_Cliente || "",
      Status_atencion: data.Status_atencion || "",
      Origen: data.Origen || "",
      Web: data.Web || "",
      C_presentacion: data.C_presentacion === "true" ? true : false,
      Catalogo: data.Catalogo === "true" ? true : false,
      P_presentacion: data.P_presentacion === "true" ? true : false,
      id: idEdit
    };

    try {
      await dispatch(putClienteListarCliente(processedDataEdit));

    } catch (error) {
      console.error('Error al enviar los datos:', error.response?.data || error.message);
    }
  };

  const submitUsuario = async (data) => {
    // Crear el objeto de datos del usuario
    const datosUsuario = {
      usuario: data.usuario,
      correo: data.correo,
      password: data.password,
      lastLogin: '', // Si esto no es necesario, podrías eliminarlo o manejarlo en el backend
      lastLogout: ''
    };

    try {
      // Despachar la acción y esperar a que se complete
      await dispatch(postThungUsuario(datosUsuario));
    } catch (error) {
      // Manejo de errores
      console.error('Error al guardar el usuario:', error);
      // Opcional: Mostrar un mensaje al usuario sobre el error
    }
  };
  const submitProvedores = async(data) => {
    const processedDataEdit = {
      Usuario: data.usuario || "",
      F_atencion: data.F_atencion || "",
      Empresa: data.Empresa || "",
      Rubro: data.Rubro || "",
      Prioridad: data.Prioridad || "",
      Cargo: data.Cargo || "",
      Entel: data.Entel || "",
      Telefono: data.Telefono || "",
      Ruc: data.Ruc || "",
      Celular: data.Celular || "",
      RPC: data.RPC || "",
      RPM: data.RPM || "",
      Correo: data.Correo || "",
      Web: data.Web || "",
      Direccion_Empresa: data.Direccion_Empresa || "",
      Deferencia: data.Deferencia || "",
      Pais: data.Pais || "",
      Ciudad: data.Ciudad || "",
      Distrito: data.Distrito || "",
      Codigo: data.Codigo || "",
    };
    try {
      await dispatch(postThungProvedores(processedDataEdit));
    } catch (error) {
      console.error('Error al enviar los datos:', error.response?.data || error.message);
    }
  }
  const submitPutProvedores = async(data) => {
    const processedDataEdit = {
      Usuario: data.Usuario || "",
      F_atencion: data.F_atencion || "",
      Empresa: data.Empresa || "",
      Rubro: data.Rubro || "",
      Prioridad: data.Prioridad || "",
      Cargo: data.Cargo || "",
      Entel: data.Entel || "",
      Telefono: data.Telefono || "",
      Ruc: data.Ruc || "",
      Celular: data.Celular || "",
      RPC: data.RPC || "",
      RPM: data.RPM || "",
      Correo: data.Correo || "",
      Web: data.Web || "",
      Direccion_Empresa: data.Direccion_Empresa || "",
      Deferencia: data.Deferencia || "",
      Pais: data.Pais || "",
      Ciudad: data.Ciudad || "",
      Distrito: data.Distrito || "",
      Codigo: data.Codigo || "",
      id: idEdit
    };
    try {
      await dispatch(putThungProvedores(processedDataEdit));
    } catch (error) {
      console.error('Error al enviar los datos:', error.response?.data || error.message);
    }
  }

  const submitClienteRequerimiento = async (data) => {
    const processedDataEdit = {
      Usuario: data.Usuario || "",
      F_requerimiento: data.F_requerimiento || "",
      Empresa: data.Empresa || "",
      Requerimiento: data.Requerimiento || "",
      status: data.status || "",
      F_respuesta_cliente: data.F_respuesta_cliente || "",
      F_atencion: data.F_atencion || "",
      Email: data.Email || "",
      Direccion: data.Direccion || "",
      Telefono: data.Telefono || "",
      Celular: data.Celular || "",
      Url_pagina: data.Url_pagina || "",
    };

    try {
      await dispatch(postThungCRequerimiento(processedDataEdit));
    } catch (error) {
      console.error('Error al enviar los datos:', error.response?.data || error.message);
    }
  }
  const submitputClienteRequerimiento = async (data) => {
    const processedDataEdit = {
      Usuario: data.Usuario || "",
      F_requerimiento: data.F_requerimiento || "",
      Empresa: data.Empresa || "",
      Requerimiento: data.Requerimiento || "",
      status: data.status || "",
      F_respuesta_cliente: data.F_respuesta_cliente || "",
      F_atencion: data.F_atencion || "",
      Email: data.Email || "",
      Direccion: data.Direccion || "",
      Telefono: data.Telefono || "",
      Celular: data.Celular || "",
      Url_pagina: data.Url_pagina || "",
      id: idEdit
    };

    try {
      await dispatch(putThungCRequerimiento(processedDataEdit));
    } catch (error) {
      console.error('Error al enviar los datos:', error.response?.data || error.message);
    }
  }
  useEffect(() => {
    if (idEdicion&&mostrarPag=="Listar Clientes") { // Verifica que idEdicion no esté vacío o no sea null
      axios.get(`http://localhost:8080/cliente/listarCliente/${idEdicion}`)
        .then(res => {
          setIdEdit(res.data.id); // Actualiza el ID del cliente
          const data = res.data;

          // Establece los valores en el formulario usando setValue
          for (const key in data) {
            if (data.hasOwnProperty(key)) { // Verifica si la propiedad pertenece al objeto
              putClienteSetValue(key, data[key] || ''); // Usa un valor predeterminado si el valor es undefined
            }
          }
        })
        .catch(error => {
          console.error('Error al cargar los datos del cliente:', error.response?.data || error.message);
        });
    }
    if (idEdicion&&mostrarPag=="Requerimientos por atender") { // Verifica que idEdicion no esté vacío o no sea null
      axios.get(`http://localhost:8080/cliente/requirimiento/${idEdicion}`)
        .then(res => {
          setIdEdit(res.data.id); // Actualiza el ID del cliente
          const data = res.data;

          // Establece los valores en el formulario usando setValue
          for (const key in data) {
            if (data.hasOwnProperty(key)) { // Verifica si la propiedad pertenece al objeto
              putClienteRequerimientoSetValue(key, data[key] || ''); // Usa un valor predeterminado si el valor es undefined
            }
          }
        })
        .catch(error => {
          console.error('Error al cargar los datos del cliente:', error.response?.data || error.message);
        });
    }
    if (idEdicion&&mostrarPag=="Listar provedores") { // Verifica que idEdicion no esté vacío o no sea null
      axios.get(`http://localhost:8080/provedores/${idEdicion}`)
        .then(res => {
          setIdEdit(res.data.id); // Actualiza el ID del cliente
          const data = res.data;

          // Establece los valores en el formulario usando setValue
          for (const key in data) {
            if (data.hasOwnProperty(key)) { // Verifica si la propiedad pertenece al objeto
              putProvedoresSetValue(key, data[key] || ''); // Usa un valor predeterminado si el valor es undefined
            }
          }
        })
        .catch(error => {
          console.error('Error al cargar los datos del cliente:', error.response?.data || error.message);
        });
    }
  }, [idEdicion, idPut, putClienteSetValue]); // Agrega setValue a las dependencias si es necesario

  return (
    <HashRouter>

      <div className={`${(post || post || idPut) ? 'h-[100vh] relative flex overflow-y-hidden' : 'flex overflow-x-hidden'} relative  bg-[#E9E9E9]`} >
        <div className={`${ruta == '/Inicio' ? 'hidden lg:grid w-[16vw]' : 'hidden'}`}>

          <Nav setMostrarPag={setMostrarPag} />
        </div>

        <div className={`${ruta == '/Inicio' ? 'w-[98vw] lg:w-[83vw] min-h-[100vh] pt-3 sm:mx-2 mx-1 lg:pl-0' : 'w-[100vw]'}`}>
          <div className={`${ruta == '/Inicio' ? 'p-2 mb-2 bg-white rounded-md shadow-lg' : 'hidden'}`}>
            <NavVertical setRutas={setRutas} mostrarPag={mostrarPag} setMostrarPag={setMostrarPag} />
          </div>
          <div className="w-full ">
            <Routes>
              <Route path='/' element={<Login ruta={ruta} setRutas={setRutas} setSeccionId={setSeccionId} />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/Inicio" element={<Inicio secionid={secionid} />} />
                <Route path="/Inventario" element={<Inventario />} />
                {/* clientes */}
                <Route path="/clientes/ListarClientes" element={<ListarClientes setIdPut={setIdPut} serIdEdicion={serIdEdicion} setPost={setPost} post={post} />} />
                <Route path="/clientes/Requerimiento" element={<Requerimiento setPost={setPost} setIdPut={setIdPut} serIdEdicion={serIdEdicion}  />} />
                {/* Provedores */}
                <Route path="/provedores/Listar" element={<Listar setPost={setPost} setIdPut={setIdPut} serIdEdicion={serIdEdicion}/>} />
                {/* usuario */}
                <Route path="/usuario/nuevo" element={<Nuevo setPost={setPost} />} />
              </Route>
            </Routes>
          </div>
        </div>
        {/* put lista cliente */}
        <div className={`${idPut == 'editarListarClietne' ? 'visible' : 'invisible hidden '}  flex justify-center items-center absolute w-[100vw] min-h-[100vh]`}>
          <div onClick={() => setIdPut('')} className=" absolute  bg-black opacity-50 w-[100vw] h-[100vh] z-40"></div>
          <form onSubmit={putClienteHandleSubmit(editIdCliente)} className="z-50 grid  mx-2 bg-white col-span-4 grid-cols-4 max-h-[80vh] overflow-hidden rounded-md overflow-y-auto">
            <div className="flex justify-around col-span-4 bg-[#969696]  pt-2">
              <section onClick={() => setActivarAgregarClienteListarCliene('Informacion')} className={`${isActivarAgregarClienteListarCliene('Informacion') ? 'bg-white text-[#969696]' : 'bg-[#969696] text-white hover:bg-white hover:text-[#969696] duration-150 transition-all'} min-w-[48%]  flex rounded-t-md  font-medium transition-all cursor-pointer py-1 px-2 text-sm`}>
                <h6 className='mx-auto'>
                  Informacion Personal
                </h6>
              </section>
              <section onClick={() => setActivarAgregarClienteListarCliene('Trabajo')} className={`${isActivarAgregarClienteListarCliene('Trabajo') ? 'bg-white text-[#969696]' : 'bg-[#969696] text-white hover:bg-white hover:text-[#969696] duration-150 transition-all'} flex rounded-t-md   min-w-[48%] select-none   font-medium cursor-pointer py-1 px-2 text-sm`}>
                <h6 className='mx-auto'>
                  Trabajoos
                </h6>
              </section>
            </div>
            <section className={`${isActivarAgregarClienteListarCliene('Informacion') ? 'grid' : 'hidden'} grid-cols-4 col-span-4 px-2 gap-x-2 gap-y-4 py-4`}>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="first_name" className="block mb-2 text-sm font-medium">Usuario</label>
                  <input  {...putClienteRegister("Usuario")} type="text" id="first_name" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Correo</label>
                  <input  {...putClienteRegister("E_Mail")} type="email" id="email" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="skype" className="block mb-2 text-sm font-medium">Skype</label>
                  <input {...putClienteRegister("Skype")} type="text" id="skype" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="birthday" className="block mb-2 text-sm font-medium">Cumpleaños</label>
                  <input {...putClienteRegister("Cumpleaños")} type="date" id="birthday" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium">Telefono</label>
                  <input {...putClienteRegister("Telefono")} type="text" id="phone" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="(01) 12345678" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="cellphone" className="block mb-2 text-sm font-medium">Celular</label>
                  <input {...putClienteRegister("Celular")} type="text" id="cellphone" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="123456789" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="entel" className="block mb-2 text-sm font-medium">Entel</label>
                  <input {...putClienteRegister("Entel")} type="text" id="entel" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="rpc" className="block mb-2 text-sm font-medium">RPC</label>
                  <input {...putClienteRegister("RPC")} type="text" id="rpc" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="rpm" className="block mb-2 text-sm font-medium">RPM</label>
                  <input {...putClienteRegister("RPM")} type="text" id="rpm" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="country" className="block mb-2 text-sm font-medium">País</label>
                  <input {...putClienteRegister("Pais")} type="text" id="country" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Perú" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="city" className="block mb-2 text-sm font-medium">Ciudad</label>
                  <input {...putClienteRegister("Ciudad")} type="text" id="city" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Lima" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="province" className="block mb-2 text-sm font-medium">Provincia</label>
                  <input {...putClienteRegister("Provincia")} type="text" id="province" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Lima" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="district" className="block mb-2 text-sm font-medium">Distrito</label>
                  <input {...putClienteRegister("Distrito")} type="text" id="district" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="San Juan de Lurigancho" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="postal_code" className="block mb-2 text-sm font-medium">C.Postal</label>
                  <input {...putClienteRegister("C_postal")} type="text" id="postal_code" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="1234" />
                </span>
              </div>
              <div className="col-span-4">
                <span>
                  <label htmlFor="address" className="block mb-2 text-sm font-medium">Dirección</label>
                  <input {...putClienteRegister("Direccion")} type="text" id="address" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Dirección Ejemplo" />
                </span>
              </div>
              <div className="col-span-4">
                <span>
                  <label htmlFor="reference" className="block mb-2 text-sm font-medium">Referencia</label>
                  <textarea {...putClienteRegister("Referencia")} id="reference" rows="4" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Referencia..."></textarea>
                </span>
              </div>
              <div className="grid grid-cols-4 col-span-4">
                <div className="col-span-4 flex gap-2  ">
                  <button onClick={() => putClienteRest()} type="button" className="flex 1 items-center py-1 px-2 font-medium rounded-md text-white gap-2 justify-center text-sm bg-[#969696]">
                    <i className="fa-solid fa-broom"></i>
                    <h3 className='whitespace-nowrap' >Limpiar</h3>
                  </button>

                  <button type="button" onClick={() => setIdPut('')} className="flex 1 items-center py-1 font-medium px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#cc2630]">
                    <i className="fa-solid fa-ban"></i>
                    <h3 className='whitespace-nowrap ' >Cancelar</h3>
                  </button>
                  <button type="submit" onClick={() => [setIdPut('')]} className="flex 1 items-center py-1 font-medium px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#0087c8]">
                    <i className="fa-solid fa-folder-open"></i>
                    <h3 className='whitespace-nowrap ' >Guardar</h3>
                  </button>
                </div>
              </div>
            </section>
            <section className={`${isActivarAgregarClienteListarCliene('Trabajo') ? 'grid' : 'hidden'} grid-cols-4 col-span-4 px-2 gap-x-2 gap-y-4 py-4`}>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="ruc" className="block mb-2 text-sm font-medium">RUC</label>
                  <input {...putClienteRegister("RUC")} type="text" id="ruc" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="direccion" className="block mb-2 text-sm font-medium">Direccion de Empresa</label>
                  <input {...putClienteRegister("Obs_Direccion_Empresa")} type="text" id="direccion" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejample@gmail.com" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="razon_comercial" className="block mb-2 text-sm font-medium">Razon Comercial</label>
                  <input {...putClienteRegister("Razon_Comercial")} type="text" id="razon_comercial" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="razon_social" className="block mb-2 text-sm font-medium">Razon social</label>
                  <input {...putClienteRegister("Razon_Social")} type="text" id="razon_social" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="obs_direccion" className="block mb-2 text-sm font-medium">Obs. Direccion</label>
                  <input {...putClienteRegister("Obs_direccion")} type="text" id="obs_direccion" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="cargo" className="block mb-2 text-sm font-medium">Cargo</label>
                  <input {...putClienteRegister("Cargo")} type="text" id="cargo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="aniversario" className="block mb-2 text-sm font-medium">Aniversario</label>
                  <input type="date" {...putClienteRegister("Aniversario")} id="aniversario" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejample@gmail.com" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="F_aviso" className="block mb-2 text-sm font-medium">Fecha de aviso</label>
                  <input type="date" {...putClienteRegister("F_aviso")} id="F_aviso" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejample@gmail.com" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="rubro" className="block mb-2 text-sm font-medium">Rubro</label>
                  <input {...putClienteRegister("Rubro")} type="text" id="rubro" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="codigo" className="block mb-2 text-sm font-medium">Codigo</label>
                  <input {...putClienteRegister("Codigo")} type="text" id="codigo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="tipo_cliente" className="block mb-2 text-sm font-medium">Tipo de Cliente</label>
                  <select {...putClienteRegister("Tipos_Cliente")} id="tipo_cliente" className="font-light bg-white border border-[#969696] p-2.5 w-full text-black text-sm rounded-md block focus:outline-none">
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
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="estatus_atencion" className="block mb-2 text-sm font-medium">Estatus Atencion</label>
                  <select {...putClienteRegister("Status_atencion")} id="estatus_atencion" className="font-light p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none">
                    <option value="">todos</option>
                    <option value="Contacto Inicial">Contacto Inicial</option>
                    <option value="Retomar Contacto">Retomar Contacto</option>
                    <option value="Pendientes por Cotizar">Pendientes por Cotizar</option>
                    <option value="Cotizado">Cotizado</option>
                    <option value="Venta Realizado">Venta Realizado</option>
                    <option value="Venta No Realizado">Venta No Realizado</option>
                    <option value="Prod. Entregado">Prod. Entregado</option>
                  </select>
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="detalle_origen" className="block mb-2 text-sm font-medium">Detalle Origen</label>
                  <select {...putClienteRegister("Origen")} id="detalle_origen" className="font-light p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none">
                    <option value="">Seleccione</option>
                    <option value="Pag Web">Pag Web</option>
                    <option value="Mailing">Mailing</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Chat">Chat</option>
                    <option value="Llamadas">Llamadas</option>
                    <option value="Referidos">Referidos</option>
                    <option value="Otros">Otros</option>
                  </select>
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="pagina_web" className="block mb-2 text-sm font-medium">Pagina Web</label>
                  <input {...putClienteRegister("Web")} type="text" id="pagina_web" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-3 grid grid-cols-6 gap-x-2 gap-y-1">
                <label htmlFor="direccion" className="col-span-6 block mb-2 text-sm font-medium">Acciones Realizadas</label>
                <div className="col-span-3 sm:col-span-2 flex items-center">
                  <input id="checkbox1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-[#969696] focus:ring-blue-500 focus:ring-2" />
                  <label htmlFor="checkbox1" {...putClienteRegister("C_presentacion")} className="ml-2 text-xs font-light">Carta de Presentacion</label>
                </div>
                <div className="col-span-3 sm:col-span-2 flex items-center">
                  <input id="checkbox2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-[#969696] focus:ring-blue-500 focus:ring-2" />
                  <label htmlFor="checkbox2" {...putClienteRegister("Catalogo")} className="ml-2 text-xs font-light">Catalogo</label>
                </div>
                <div className="col-span-3 sm:col-span-2 flex items-center">
                  <input id="checkbox3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-[#969696] focus:ring-blue-500 focus:ring-2" />
                  <label htmlFor="checkbox3"{...putClienteRegister("P_presentacion")} className="ml-2 text-xs font-light">Pack Promocional</label>
                </div>
              </div>
              <div className="grid grid-cols-4 col-span-4">
                <div className="col-span-4 flex gap-2  ">
                  <button type="button" onClick={() => putClienteRest()} className="flex 1 items-center py-1 px-2 font-medium rounded-md text-white gap-2 justify-center text-sm bg-[#969696]">
                    <i className="fa-solid fa-broom"></i>
                    <h3 className='whitespace-nowrap' >Limpiar</h3>
                  </button>

                  <button type="button" onClick={() => setIdPut('')} className="flex 1 items-center py-1 font-medium px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#cc2630]">
                    <i className="fa-solid fa-ban"></i>
                    <h3 className='whitespace-nowrap ' >Cancelar</h3>
                  </button>
                  <button type="submit" onClick={() => [setIdPut('')]} className="flex 1 items-center py-1 font-medium px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#0087c8]">
                    <i className="fa-solid fa-folder-open"></i>
                    <h3 className='whitespace-nowrap ' >Guardar</h3>
                  </button>
                </div>
              </div>
            </section>
          </form>
        </div>
        {/* post lista Cliente */}
        <div className={`${post == 'verAgregarListaCliente' ? 'visible' : 'invisible hidden '}  flex justify-center items-center absolute w-[100vw] min-h-[100vh]`}>
          <div onClick={() => setPost('')} className=" absolute  bg-black opacity-50 w-[100vw] h-[100vh] z-40"></div>
          <form onSubmit={postClienteHandleSubmit(postClienteLista)} className="z-50 grid  mx-2 bg-white col-span-4 grid-cols-4 max-h-[80vh] overflow-hidden rounded-md overflow-y-auto">
            <div className="flex justify-around col-span-4 bg-[#969696]  pt-2">
              <section onClick={() => setActivarAgregarClienteListarCliene('Informacion')} className={`${isActivarAgregarClienteListarCliene('Informacion') ? 'bg-white text-[#969696]' : 'bg-[#969696] text-white hover:bg-white hover:text-[#969696] duration-150 transition-all'} min-w-[48%]  flex rounded-t-md  font-medium transition-all cursor-pointer py-1 px-2 text-sm`}>
                <h6 className='mx-auto'>
                  Informacion Personal
                </h6>
              </section>
              <section onClick={() => setActivarAgregarClienteListarCliene('Trabajo')} className={`${isActivarAgregarClienteListarCliene('Trabajo') ? 'bg-white text-[#969696]' : 'bg-[#969696] text-white hover:bg-white hover:text-[#969696] duration-150 transition-all'} flex rounded-t-md   min-w-[48%] select-none   font-medium cursor-pointer py-1 px-2 text-sm`}>
                <h6 className='mx-auto'>
                  Trabajo
                </h6>
              </section>
            </div>
            <section className={`${isActivarAgregarClienteListarCliene('Informacion') ? 'grid' : 'hidden'} grid-cols-4 col-span-4 px-2 gap-x-2 gap-y-4 py-4`}>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="first_name" className="block mb-2 text-sm font-medium">Usuario</label>
                  <input {...postClienteRegister("Usuario")} type="text" id="Usuario" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Correo</label>
                  <input {...postClienteRegister("E_Mail")} type="email" id="email" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="skype" className="block mb-2 text-sm font-medium">Skype</label>
                  <input {...postClienteRegister("Skype")} type="text" id="skype" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="birthday" className="block mb-2 text-sm font-medium">Cumpleaños</label>
                  <input {...postClienteRegister("Cumpleaños")} type="date" id="birthday" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium">Telefonsao</label>
                  <input {...postClienteRegister("Telefono")} type="text" id="phone" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="(01) 12345678" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="cellphone" className="block mb-2 text-sm font-medium">Celular</label>
                  <input {...postClienteRegister("Celular")} type="text" id="cellphone" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="123456789" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="entel" className="block mb-2 text-sm font-medium">Entel</label>
                  <input {...postClienteRegister("Entel")} type="text" id="entel" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="rpc" className="block mb-2 text-sm font-medium">RPC</label>
                  <input {...postClienteRegister("RPC")} type="text" id="rpc" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="rpm" className="block mb-2 text-sm font-medium">RPM</label>
                  <input {...postClienteRegister("RPM")} type="text" id="rpm" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="country" className="block mb-2 text-sm font-medium">País</label>
                  <input {...postClienteRegister("Pais")} type="text" id="country" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Perú" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="city" className="block mb-2 text-sm font-medium">Ciudad</label>
                  <input {...postClienteRegister("Ciudad")} type="text" id="city" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Lima" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="province" className="block mb-2 text-sm font-medium">Provincia</label>
                  <input {...postClienteRegister("Provincia")} type="text" id="province" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Lima" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="district" className="block mb-2 text-sm font-medium">Distrito</label>
                  <input {...postClienteRegister("Distrito")} type="text" id="district" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="San Juan de Lurigancho" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="postal_code" className="block mb-2 text-sm font-medium">C.Postal</label>
                  <input {...postClienteRegister("C_postal")} type="text" id="postal_code" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="1234" />
                </span>
              </div>
              <div className="col-span-4">
                <span>
                  <label htmlFor="address" className="block mb-2 text-sm font-medium">Dirección</label>
                  <input {...postClienteRegister("Direccion")} type="text" id="address" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Dirección Ejemplo" />
                </span>
              </div>
              <div className="col-span-4">
                <span>
                  <label htmlFor="reference" className="block mb-2 text-sm font-medium">Referencia</label>
                  <textarea {...postClienteRegister("Referencia")} id="reference" rows="4" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Referencia..."></textarea>
                </span>
              </div>
              <div className="grid grid-cols-4 col-span-4">
                <div className="col-span-4 flex gap-2  ">
                  <button onClick={() => postClienteReset()} type="button" className="flex 1 items-center py-1 px-2 font-medium rounded-md text-white gap-2 justify-center text-sm bg-[#969696]">
                    <i className="fa-solid fa-broom"></i>
                    <h3 className='whitespace-nowrap' >Limpiar</h3>
                  </button>

                  <button type="button" onClick={() => setPost('')} className="flex 1 items-center py-1 font-medium px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#cc2630]">
                    <i className="fa-solid fa-ban"></i>
                    <h3 className='whitespace-nowrap ' >Cancelar</h3>
                  </button>
                  <button type="submit" onClick={() => [setPost('')]} className="flex 1 items-center py-1 font-medium px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#0087c8]">
                    <i className="fa-solid fa-folder-open"></i>
                    <h3 className='whitespace-nowrap ' >Guardar</h3>
                  </button>
                </div>
              </div>
            </section>
            <section className={`${isActivarAgregarClienteListarCliene('Trabajo') ? 'grid' : 'hidden'} grid-cols-4 col-span-4 px-2 gap-x-2 gap-y-4 py-4`}>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="ruc" className="block mb-2 text-sm font-medium">RUC</label>
                  <input {...postClienteRegister("RUC")} type="text" id="ruc" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="direccion" className="block mb-2 text-sm font-medium">Direccion de Empresa</label>
                  <input {...postClienteRegister("Obs_Direccion_Empresa")} type="text" id="direccion" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejample@gmail.com" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="razon_comercial" className="block mb-2 text-sm font-medium">Razon Comercial</label>
                  <input {...postClienteRegister("Razon_Comercial")} type="text" id="razon_comercial" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="razon_social" className="block mb-2 text-sm font-medium">Razon social</label>
                  <input {...postClienteRegister("Razon_Social")} type="text" id="razon_social" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="obs_direccion" className="block mb-2 text-sm font-medium">Obs. Direccion</label>
                  <input {...postClienteRegister("Obs_direccion")} type="text" id="obs_direccion" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="cargo" className="block mb-2 text-sm font-medium">Cargo</label>
                  <input {...postClienteRegister("Cargo")} type="text" id="cargo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="aniversario" className="block mb-2 text-sm font-medium">Aniversario</label>
                  <input type="date" {...postClienteRegister("Aniversario")} id="aniversario" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejample@gmail.com" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="F_aviso" className="block mb-2 text-sm font-medium">Fecha de aviso</label>
                  <input {...postClienteRegister("F_aviso")} type="date" id="F_aviso" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="rubro" className="block mb-2 text-sm font-medium">Rubro</label>
                  <input {...postClienteRegister("Rubro")} type="text" id="rubro" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="codigo" className="block mb-2 text-sm font-medium">Codigo</label>
                  <input {...postClienteRegister("Codigo")} type="text" id="codigo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="tipo_cliente" className="block mb-2 text-sm font-medium">Tipo de Cliente</label>
                  <select {...postClienteRegister("Tipos_Cliente")} id="tipo_cliente" className="font-light bg-white border border-[#969696] p-2.5 w-full text-black text-sm rounded-md block focus:outline-none">
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
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="estatus_atencion" className="block mb-2 text-sm font-medium">Estatus Atencion</label>
                  <select {...postClienteRegister("Status_atencion")} id="estatus_atencion" className="font-light p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none">
                    <option value="">todos</option>
                    <option value="Contacto Inicial">Contacto Inicial</option>
                    <option value="Retomar Contacto">Retomar Contacto</option>
                    <option value="Pendientes por Cotizar">Pendientes por Cotizar</option>
                    <option value="Cotizado">Cotizado</option>
                    <option value="Venta Realizado">Venta Realizado</option>
                    <option value="Venta No Realizado">Venta No Realizado</option>
                    <option value="Prod. Entregado">Prod. Entregado</option>
                  </select>
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="detalle_origen" className="block mb-2 text-sm font-medium">Detalle Origen</label>
                  <select {...postClienteRegister("Origen")} id="detalle_origen" className="font-light p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none">
                    <option value="">Seleccione</option>
                    <option value="Pag Web">Pag Web</option>
                    <option value="Mailing">Mailing</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Chat">Chat</option>
                    <option value="Llamadas">Llamadas</option>
                    <option value="Referidos">Referidos</option>
                    <option value="Otros">Otros</option>
                  </select>
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="pagina_web" className="block mb-2 text-sm font-medium">Pagina Web</label>
                  <input {...postClienteRegister("Web")} type="text" id="pagina_web" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-3 grid grid-cols-6 gap-x-2 gap-y-1">
                <label htmlFor="direccion" className="col-span-6 block mb-2 text-sm font-medium">Acciones Realizadas</label>
                <div className="col-span-3 sm:col-span-2 flex items-center">
                  <input id="checkbox1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-[#969696] focus:ring-blue-500 focus:ring-2" />
                  <label htmlFor="checkbox1" {...postClienteRegister("C_presentacion")} className="ml-2 text-xs font-light">Carta de Presentacion</label>
                </div>
                <div className="col-span-3 sm:col-span-2 flex items-center">
                  <input id="checkbox2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-[#969696] focus:ring-blue-500 focus:ring-2" />
                  <label htmlFor="checkbox2" {...postClienteRegister("Catalogo")} className="ml-2 text-xs font-light">Catalogo</label>
                </div>
                <div className="col-span-3 sm:col-span-2 flex items-center">
                  <input id="checkbox3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-[#969696] focus:ring-blue-500 focus:ring-2" />
                  <label htmlFor="checkbox3"{...postClienteRegister("P_presentacion")} className="ml-2 text-xs font-light">Pack Promocional</label>
                </div>
              </div>
              <div className="grid grid-cols-4 col-span-4">
                <div className="col-span-4 flex gap-2  ">
                  <button onClick={() => postClienteReset()} type="button" className="flex 1 items-center py-1 px-2 font-medium rounded-md text-white gap-2 justify-center text-sm bg-[#969696]">
                    <i className="fa-solid fa-broom"></i>
                    <h3 className='whitespace-nowrap' >Limpiar</h3>
                  </button>

                  <button type="button" onClick={() => setPost('')} className="flex 1 items-center py-1 font-medium px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#cc2630]">
                    <i className="fa-solid fa-ban"></i>
                    <h3 className='whitespace-nowrap ' >Cancelar</h3>
                  </button>
                  <button type="submit" onClick={() => [setPost('')]} className="flex 1 items-center py-1 font-medium px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#0087c8]">
                    <i className="fa-solid fa-folder-open"></i>
                    <h3 className='whitespace-nowrap ' >Guardar</h3>
                  </button>
                </div>
              </div>
            </section>
          </form>
        </div>
        {/* post Usuario */}
        <div className={`${post == 'agregarNuevoUsuario' ? 'visible' : 'invisible hidden '}  flex justify-center items-center absolute w-[100vw] min-h-[100vh]`}>
          <div onClick={() => setPost('')} className=" absolute  bg-black opacity-50 w-[100vw] h-[100vh] z-40"></div>
          <form onSubmit={postUsuarioHandleSubmit(submitUsuario)} className="z-50 grid mx-2 bg-white col-span-4 grid-cols-4 max-h-[80vh] overflow-hidden rounded-md overflow-y-auto">
            <section className='grid grid-cols-4 col-span-4 px-2 gap-x-2 gap-y-4 py-4'>
              <div className="col-span-4">
                <span>
                  <label htmlFor="Usuario" className="block mb-2 text-sm font-medium">Usuario</label>
                  <input {...postUsuario("usuario")} type="text" id="Usuario" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-4">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">Correo</label>
                  <input {...postUsuario("correo")} type="email" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium">Contraseña</label>
                  <input {...postUsuario("password")} type="text" id="password" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              {/* <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium">Repetir contraseña</label>
                  <input {...postUsuario("password")} type="text" id="password" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div> */}
              <div className="grid grid-cols-4 col-span-4 mx-auto">
                <div className="col-span-4 flex gap-2">
                  <button type="button" onClick={() => postUsuarioReset()} className="flex 1 items-center py-1 px-2 font-medium rounded-md text-white gap-2 justify-center text-sm bg-[#969696]">
                    <i className="fa-solid fa-broom"></i>
                    <h3 className='whitespace-nowrap'>Limpiar</h3>
                  </button>

                  <button type="button" onClick={() => setPost('')} className="flex 1 items-center py-1 font-medium px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#cc2630]">
                    <i className="fa-solid fa-ban"></i>
                    <h3 className='whitespace-nowrap'>Cancelar</h3>
                  </button>

                  <button type="submit" onClick={() => [setPost('')]} className="flex 1 items-center py-1 font-medium px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#0087c8]">
                    <i className="fa-solid fa-folder-open"></i>
                    <h3 className='whitespace-nowrap'>Guardar</h3>
                  </button>
                </div>
              </div>
            </section>
          </form>
        </div>
        {/* post provedores */}
        <div className={`${post == 'agregarProvedores' ? 'visible' : 'invisible hidden '}  flex justify-center items-center absolute w-[100vw] min-h-[100vh]`}>
          <div onClick={() => setPost('')} className=" absolute  bg-black opacity-50 w-[100vw] h-[100vh] z-40"></div>
          <form onSubmit={postProvedoresHandleSubmit(submitProvedores)} className="z-50 grid mx-2 bg-white col-span-4 grid-cols-4 max-h-[80vh] overflow-hidden rounded-md overflow-y-auto">
            <section className='grid grid-cols-4 col-span-4 px-2 gap-x-2 gap-y-4 py-4'>
              <div className="col-span-4 sm:col-span-1">
                <span>
                  <label htmlFor="Usuario" className="block mb-2 text-sm font-medium">Usuario</label>
                  <input {...postProvedores("usuario")} type="text" id="Usuario" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="F_atencion" className="block mb-2 text-sm font-medium">F. atencion</label>
                  <input {...postProvedores("F_atencion")} type="date" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="Empresa" className="block mb-2 text-sm font-medium">Empresa</label>
                  <input {...postProvedores("Empresa")} type="text" id="Usuario" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="Direccion_Empresa" className="block mb-2 text-sm font-medium">Direccion Empresa</label>
                  <input {...postProvedores("Direccion_Empresa")} type="text" id="Direccion_Empresa" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-1">
                <span>
                  <label htmlFor="Rubro" className="block mb-2 text-sm font-medium">Rubro</label>
                  <input {...postProvedores("Rubro")} type="text" id="Usuario" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-1">
                <span>
                  <label htmlFor="Prioridad" className="block mb-2 text-sm font-medium">Prioridad</label>
                  <select {...postProvedores("Prioridad")} id="Prioridad" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none">
                    <option value="">Selecciona un estado</option>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                  </select>
                </span>
              </div>
              <div className="col-span-4 sm:col-span-1">
                <span>
                  <label htmlFor="Cargo" className="block mb-2 text-sm font-medium">Cargo</label>
                  <input {...postProvedores("Cargo")} type="text" id="Cargo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium">Telefono</label>
                  <input {...postProvedores("Telefono")} type="text" id="phone" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="(01) 12345678" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="Correo" className="block mb-2 text-sm font-medium">Correo</label>
                  <input {...postProvedores("Correo")} type="text" id="Correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Dirección Ejemplo" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="Deferencia" className="block mb-2 text-sm font-medium">Referencia</label>
                  <input {...postProvedores("Deferencia")} type="text" id="Deferencia" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="123456789" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="Ruc" className="block mb-2 text-sm font-medium">Ruc</label>
                  <input {...postProvedores("Ruc")} type="text" id="entel" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="cellphone" className="block mb-2 text-sm font-medium">Celular</label>
                  <input {...postProvedores("Celular")} type="text" id="cellphone" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="123456789" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="rpc" className="block mb-2 text-sm font-medium">RPC</label>
                  <input {...postProvedores("RPC")} type="text" id="rpc" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="rpm" className="block mb-2 text-sm font-medium">RPM</label>
                  <input {...postProvedores("RPM")} type="text" id="rpm" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="country" className="block mb-2 text-sm font-medium">País</label>
                  <input {...postProvedores("Pais")} type="text" id="country" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Perú" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="city" className="block mb-2 text-sm font-medium">Ciudad</label>
                  <input {...postProvedores("Ciudad")} type="text" id="city" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Lima" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="district" className="block mb-2 text-sm font-medium">Distrito</label>
                  <input {...postProvedores("Distrito")} type="text" id="district" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="San Juan de Lurigancho" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="postal_code" className="block mb-2 text-sm font-medium">Codigo</label>
                  <input {...postProvedores("Codigo")} type="text" id="postal_code" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="1234" />
                </span>
              </div>
              <div className="col-span-4">
                <span>
                  <label htmlFor="Web" className="block mb-2 text-sm font-medium">Web</label>
                  <input {...postProvedores("Web")} type="text" id="Web" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Dirección Ejemplo" />
                </span>
              </div>
              <div className="grid grid-cols-4 col-span-4 mx-auto">
                <div className="col-span-4 flex gap-2">
                  <button type="button" onClick={() => postUsuarioReset()} className="flex 1 items-center py-1 px-2 font-medium rounded-md text-white gap-2 justify-center text-sm bg-[#969696]">
                    <i className="fa-solid fa-broom"></i>
                    <h3 className='whitespace-nowrap'>Limpiar</h3>
                  </button>

                  <button type="button" onClick={() => setPost('')} className="flex 1 items-center py-1 font-medium px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#cc2630]">
                    <i className="fa-solid fa-ban"></i>
                    <h3 className='whitespace-nowrap'>Cancelar</h3>
                  </button>

                  <button type="submit" onClick={() => [setPost('')]} className="flex 1 items-center py-1 font-medium px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#0087c8]">
                    <i className="fa-solid fa-folder-open"></i>
                    <h3 className='whitespace-nowrap'>Guardar</h3>
                  </button>
                </div>
              </div>
            </section>
          </form>
        </div>
        {/* put provedores */}
        <div className={`${idPut == 'editarProvedores' ? 'visible' : 'invisible hidden '}  flex justify-center items-center absolute w-[100vw] min-h-[100vh]`}>
          <div onClick={() => setIdPut('')} className=" absolute  bg-black opacity-50 w-[100vw] h-[100vh] z-40"></div>
          <form onSubmit={putProvedoresHandleSubmit(submitPutProvedores)} className="z-50 grid mx-2 bg-white col-span-4 grid-cols-4 max-h-[80vh] overflow-hidden rounded-md overflow-y-auto">
            <section className='grid grid-cols-4 col-span-4 px-2 gap-x-2 gap-y-4 py-4'>
              <div className="col-span-4 sm:col-span-1">
                <span>
                  <label htmlFor="Usuario" className="block mb-2 text-sm font-medium">Usuario</label>
                  <input {...putProvedores("Usuario")} type="text" id="Usuario" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="F_atencion" className="block mb-2 text-sm font-medium">F. atencion</label>
                  <input {...putProvedores("F_atencion")} type="date" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="Empresa" className="block mb-2 text-sm font-medium">Empresa</label>
                  <input {...putProvedores("Empresa")} type="text" id="Usuario" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="Direccion_Empresa" className="block mb-2 text-sm font-medium">Direccion Empresa</label>
                  <input {...putProvedores("Direccion_Empresa")} type="text" id="Direccion_Empresa" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-1">
                <span>
                  <label htmlFor="Rubro" className="block mb-2 text-sm font-medium">Rubro</label>
                  <input {...putProvedores("Rubro")} type="text" id="Usuario" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-1">
                <span>
                  <label htmlFor="Prioridad" className="block mb-2 text-sm font-medium">Prioridad</label>
                  <select {...putProvedores("Prioridad")} id="Prioridad" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none">
                    <option value="">Selecciona un estado</option>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                  </select>
                </span>
              </div>
              <div className="col-span-4 sm:col-span-1">
                <span>
                  <label htmlFor="Cargo" className="block mb-2 text-sm font-medium">Cargo</label>
                  <input {...putProvedores("Cargo")} type="text" id="Cargo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium">Telefono</label>
                  <input {...putProvedores("Telefono")} type="text" id="phone" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="(01) 12345678" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="Correo" className="block mb-2 text-sm font-medium">Correo</label>
                  <input {...putProvedores("Correo")} type="text" id="Correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Dirección Ejemplo" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="Deferencia" className="block mb-2 text-sm font-medium">Referencia</label>
                  <input {...putProvedores("Deferencia")} type="text" id="Deferencia" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="123456789" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="Ruc" className="block mb-2 text-sm font-medium">Ruc</label>
                  <input {...putProvedores("Ruc")} type="text" id="entel" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="cellphone" className="block mb-2 text-sm font-medium">Celular</label>
                  <input {...putProvedores("Celular")} type="text" id="cellphone" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="123456789" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="rpc" className="block mb-2 text-sm font-medium">RPC</label>
                  <input {...putProvedores("RPC")} type="text" id="rpc" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="rpm" className="block mb-2 text-sm font-medium">RPM</label>
                  <input {...putProvedores("RPM")} type="text" id="rpm" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="country" className="block mb-2 text-sm font-medium">País</label>
                  <input {...putProvedores("Pais")} type="text" id="country" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Perú" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="city" className="block mb-2 text-sm font-medium">Ciudad</label>
                  <input {...putProvedores("Ciudad")} type="text" id="city" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Lima" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="district" className="block mb-2 text-sm font-medium">Distrito</label>
                  <input {...putProvedores("Distrito")} type="text" id="district" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="San Juan de Lurigancho" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="postal_code" className="block mb-2 text-sm font-medium">Codigo</label>
                  <input {...putProvedores("Codigo")} type="text" id="postal_code" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="1234" />
                </span>
              </div>
              <div className="col-span-4">
                <span>
                  <label htmlFor="Web" className="block mb-2 text-sm font-medium">Web</label>
                  <input {...putProvedores("Web")} type="text" id="Web" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Dirección Ejemplo" />
                </span>
              </div>
              <div className="grid grid-cols-4 col-span-4 mx-auto">
                <div className="col-span-4 flex gap-2">
                  <button type="button" onClick={() => postUsuarioReset()} className="flex 1 items-center py-1 px-2 font-medium rounded-md text-white gap-2 justify-center text-sm bg-[#969696]">
                    <i className="fa-solid fa-broom"></i>
                    <h3 className='whitespace-nowrap'>Limpiar</h3>
                  </button>

                  <button type="button" onClick={() => setIdPut('')} className="flex 1 items-center py-1 font-medium px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#cc2630]">
                    <i className="fa-solid fa-ban"></i>
                    <h3 className='whitespace-nowrap'>Cancelar</h3>
                  </button>

                  <button type="submit" onClick={() => setIdPut('')} className="flex 1 items-center py-1 font-medium px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#0087c8]">
                    <i className="fa-solid fa-folder-open"></i>
                    <h3 className='whitespace-nowrap'>Guardar</h3>
                  </button>
                </div>
              </div>
            </section>
          </form>
        </div>
        {/* post lista requerimiento */}
        <div className={`${post == 'agregarClienteRequerimiento' ? 'visible' : 'invisible hidden '}  flex justify-center items-center absolute w-[100vw] min-h-[100vh]`}>
          <div onClick={() => setPost('')} className=" absolute  bg-black opacity-50 w-[100vw] h-[100vh] z-40"></div>
          <form onSubmit={postClienteRequerimientoHandleSubmit(submitClienteRequerimiento)} className="z-50 grid mx-2 bg-white col-span-4 grid-cols-4 max-h-[80vh] overflow-hidden rounded-md overflow-y-auto">
            <section className='grid grid-cols-4 col-span-4 px-2 gap-x-2 gap-y-4 py-4'>
              <div className="col-span-4 sm:col-span-1">
                <span>
                  <label htmlFor="Usuario" className="block mb-2 text-sm font-medium">Usuario</label>
                  <input {...postClienteRequerimiento("Usuario")} type="text" id="Usuario" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium">Empresa</label>
                  <input {...postClienteRequerimiento("Empresa")} type="text" id="password" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-1">
                <span>
                  <label htmlFor="status" className="block mb-2 text-sm font-medium">Status</label>
                  <select {...postClienteRequerimiento("status")} id="status" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none">
                    <option value="">Selecciona un estado</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                    <option value="pendiente">Pendiente</option>
                  </select>
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">F. Requerimiento</label>
                  <input {...postClienteRequerimiento("F_requerimiento")} type="date" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">F. respuesta del cliente</label>
                  <input {...postClienteRequerimiento("F_respuesta_cliente")} type="date" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">Telefono</label>
                  <input {...postClienteRequerimiento("Telefono")} type="text" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">Celular</label>
                  <input {...postClienteRequerimiento("Celular")} type="text" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">F. Atencion</label>
                  <input {...postClienteRequerimiento("F_atencion")} type="date" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">F. Atencion</label>
                  <input {...postClienteRequerimiento("F_atencion")} type="date" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">Requerimiento</label>
                  <input {...postClienteRequerimiento("Requerimiento")} type="text" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">Url_pagina</label>
                  <input {...postClienteRequerimiento("Url_pagina")} type="text" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="Email" className="block mb-2 text-sm font-medium">Email</label>
                  <input {...postClienteRequerimiento("Email")} type="text" id="Email" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">Direccion</label>
                  <input {...postClienteRequerimiento("Direccion")} type="text" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="grid grid-cols-4 col-span-4 mx-auto">
                <div className="col-span-4 flex gap-2">
                  <button type="button" onClick={() => postClienteRequerimiento()} className="flex 1 items-center py-1 px-2 font-medium rounded-md text-white gap-2 justify-center text-sm bg-[#969696]">
                    <i className="fa-solid fa-broom"></i>
                    <h3 className='whitespace-nowrap'>Limpiar</h3>
                  </button>

                  <button type="button" onClick={() => setPost('')} className="flex 1 items-center py-1 font-medium px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#cc2630]">
                    <i className="fa-solid fa-ban"></i>
                    <h3 className='whitespace-nowrap'>Cancelar</h3>
                  </button>

                  <button type="submit" onClick={() => [setPost('')]} className="flex 1 items-center py-1 font-medium px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#0087c8]">
                    <i className="fa-solid fa-folder-open"></i>
                    <h3 className='whitespace-nowrap'>Guardar</h3>
                  </button>
                </div>
              </div>
            </section>
          </form>
        </div>
        {/* put lista requerimiento */}
        <div className={`${idPut == 'editarListaRequerimiento' ? 'visible' : 'invisible hidden '}  flex justify-center items-center absolute w-[100vw] min-h-[100vh]`}>
          <div onClick={() => setIdPut('')} className=" absolute  bg-black opacity-50 w-[100vw] h-[100vh] z-40"></div>
          <form onSubmit={putClienteRequerimientoHandleSubmit(submitputClienteRequerimiento)} className="z-50 grid mx-2 bg-white col-span-4 grid-cols-4 max-h-[80vh] overflow-hidden rounded-md overflow-y-auto">
            <section className='grid grid-cols-4 col-span-4 px-2 gap-x-2 gap-y-4 py-4'>
              <div className="col-span-4 sm:col-span-1">
                <span>
                  <label htmlFor="Usuario" className="block mb-2 text-sm font-medium">Usuario</label>
                  <input {...putClienteRequerimiento("Usuario")} type="text" id="Usuario" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="Nombre Apellido" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium">Empresa</label>
                  <input {...putClienteRequerimiento("Empresa")} type="text" id="password" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-1">
                <span>
                  <label htmlFor="status" className="block mb-2 text-sm font-medium">Status</label>
                  <select {...putClienteRequerimiento("status")} id="status" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none">
                    <option value="">Selecciona un estado</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                    <option value="pendiente">Pendiente</option>
                  </select>
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">F. Requerimiento</label>
                  <input {...putClienteRequerimiento("F_requerimiento")} type="date" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">F. respuesta del cliente</label>
                  <input {...putClienteRequerimiento("F_respuesta_cliente")} type="date" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">Telefono</label>
                  <input {...putClienteRequerimiento("Telefono")} type="text" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">Celular</label>
                  <input {...putClienteRequerimiento("Celular")} type="text" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">F. Atencion</label>
                  <input {...putClienteRequerimiento("F_atencion")} type="date" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">F. Atencion</label>
                  <input {...putClienteRequerimiento("F_atencion")} type="date" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">Requerimiento</label>
                  <input {...putClienteRequerimiento("Requerimiento")} type="text" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">Url_pagina</label>
                  <input {...putClienteRequerimiento("Url_pagina")} type="text" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <span>
                  <label htmlFor="correo" className="block mb-2 text-sm font-medium">Direccion</label>
                  <input {...putClienteRequerimiento("Direccion")} type="text" id="correo" className="p-2.5 w-full bg-white border border-[#969696] text-black text-sm rounded-md block focus:outline-none" placeholder="ejemplo@gmail.com" />
                </span>
              </div>
              <div className="grid grid-cols-4 col-span-4 mx-auto">
                <div className="col-span-4 flex gap-2">
                  <button type="button" onClick={() => putClienteRequerimiento()} className="flex 1 items-center py-1 px-2 font-medium rounded-md text-white gap-2 justify-center text-sm bg-[#969696]">
                    <i className="fa-solid fa-broom"></i>
                    <h3 className='whitespace-nowrap'>Limpiar</h3>
                  </button>

                  <button type="button" onClick={() => setIdPut('')} className="flex 1 items-center py-1 font-medium px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#cc2630]">
                    <i className="fa-solid fa-ban"></i>
                    <h3 className='whitespace-nowrap'>Cancelar</h3>
                  </button>
                  <button type="submit" onClick={() => [setIdPut('')]} className="flex 1 items-center py-1 font-medium px-2 rounded-md text-white gap-2 justify-center text-sm bg-[#0087c8]">
                    <i className="fa-solid fa-folder-open"></i>
                    <h3 className='whitespace-nowrap'>Guardar</h3>
                  </button>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </HashRouter>
  )
}

export default App
