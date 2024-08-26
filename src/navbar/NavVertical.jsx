import React, { useEffect, useRef, useState } from 'react'
import avatar from '../img/avatar.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import getConfig from '../utils/getConfig';
function NavVertical({ mostrarPag, setMostrarPag,setRutas }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    const [activeClientesOption, setActiveClientesOption] = useState('Listar Clientes');
    const [activeProvedoresOption, setActiveProvedoresOption] = useState('Listar provedores');
    const [activeLogisticaOption, setActiveLogisticaOption] = useState('Rutas');
    const [activeUsuarioOption, setActiveUsuarioOption] = useState('Nuevo');

    const [user, setUser] = useState(false)

    const isActive = (tab) => activeTab === tab;
    const isActiveClientes = (option) => activeClientesOption === option;

    const drawerRef = useRef();
    const arregloGuardado = localStorage.getItem('miArreglo');
    const miArregloRecuperado = arregloGuardado ? JSON.parse(arregloGuardado) : [];
    
    // Asegurarse de que miArregloRecuperado y las propiedades existen antes de acceder a ellas
    const idArreglo = miArregloRecuperado.user?.asistencia?.[miArregloRecuperado.user.asistencia.length - 1];
    
    const logaut = async () => {
        try {
            console.log(miArregloRecuperado )
            // Asegurarse de que `secion` y `secion.user` existen antes de acceder a `secion.user.id`
            if (miArregloRecuperado && miArregloRecuperado.user) {
                await axios.post("https://backendcompina.onrender.com/user/cerrarSecion", {
                    "userId": miArregloRecuperado.user.id
                });
    
                // Asegurarse de que `idArreglo` existe antes de usarlo en la solicitud PUT
                if (idArreglo && idArreglo.id) {
                    await axios.put(
                        `https://backendcompina.onrender.com/asistencia/${idArreglo.id}`,
                        { horarioSalida: new Date() }, // Cuerpo de la solicitud
                        getConfig() // Configuración de la solicitud (headers, etc.)
                    );
                } else {
                    console.error("No se pudo encontrar el ID de la asistencia.");
                }
            } else {
                console.error("Usuario no encontrado en la sesión.");
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            // Opcional: Mostrar un mensaje al usuario sobre el error
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            localStorage.removeItem("miArreglo"); // Elimina el token del localStorage
    
            navigate("/Inicio");
            setRutas("/login");
        }
    };
    
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (drawerRef.current && !drawerRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    const navigate = useNavigate()

    useEffect(() => {
        if (activeTab === 'Inicio' || activeTab === 'Documentos' || activeTab === 'Inventario') {
            setMostrarPag(activeTab);
            navigate(`${activeTab}`)
        }
        // rutas clientes
        else if (activeTab === 'Clientes') {
            setMostrarPag(activeClientesOption);
            if (activeClientesOption === 'Listar Clientes') {
                navigate('/clientes/ListarClientes');
            } else if (activeClientesOption === 'Requerimientos por atender') {
                navigate('/clientes/Requerimiento');
            } 
            // rutas Status de Atencion   
        } 
        // provedores
        else if (activeTab === 'Provedores') {
            setMostrarPag(activeProvedoresOption)
            if (activeProvedoresOption === 'Listar provedores') {
                navigate('/provedores/Listar');
            }
        }
        // logistica
        else if (activeTab === 'Logistica') {
            setMostrarPag(activeLogisticaOption)
            if (activeLogisticaOption === 'Rutas') {
                navigate('/logistica/Rutas');
            } else if (activeLogisticaOption === 'Productos') {
                navigate('/logistica/Emitir');
            } else if (activeLogisticaOption === 'Requerimiento cotizaciones') {
                navigate('/logistica/OrdenCOMPINA');
            } else if (activeLogisticaOption === 'Formato') {
                navigate('/logistica/OrdenCOMPIPRO');
            }
        }
        // usuarios
        else if (activeTab === 'Usuarios') {
            setMostrarPag(activeUsuarioOption)
            if (activeUsuarioOption === 'Nuevo') {
                navigate('/usuario/nuevo');
            } 
        }
    }, [activeTab,activeClientesOption]);
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    return (
        <div className=' z-40'>
            <div className='flex justify-between items-center '>
                <div className='  text-[#969696] flex gap-2 items-center'>
                    <i onClick={toggleDrawer} className="lg:hidden grid fa-solid fa-bars "></i>
                    <h2 className=' font-semibold text-[1.2em]'>{mostrarPag}</h2>
                </div>

                <div className="relative flex gap-1 min-w-[140px] z-40">
                    <div className="grid text-[.9em] text-[#969696]">
                        <h5 className=''>Juliana Alvares</h5>
                        <div className=" flex items-center justify-center gap-1">
                            <i className="fa-solid fa-clock"></i>
                            <h6 className=''>20:18:17</h6>
                        </div>
                    </div>
                    <img onClick={() => setUser(!user)} className="cursor-pointer w-10 h-10 rounded-full" src={avatar} alt="Rounded avatar"></img>
                    <div className= {`shadow-md bg-white w-full justify-center rounded top-[60px] py-2 gap-1 grid ${user?'absolute ':'hidden'}`}>
                        <div className="cursor-pointer flex items-center gap-1">
                            <i className="fa-solid fa-file-pen"></i>
                            <h5>Tardanza</h5>
                        </div>
                        <div className="cursor-pointer flex items-center gap-1">
                            <i className="fa-solid fa-burger"></i>
                            <h5>Tardanza</h5>
                        </div>
                        <span className=" h-[.2px] bg-[#969696] "></span>
                        <div onClick={()=>logaut()} className="cursor-pointer flex items-center gap-1">
                            <i className="fa-solid fa-door-open"></i>
                            <h5>Salir</h5>
                        </div>
                    </div>
                </div>
            </div>

            {/* nav */}
            <nav
                ref={drawerRef}
                id="drawer-example"
                className={`fixed top-0 left-0 z-50 h-screen p-4 overflow-y-auto transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } bg-white w-80 shadow-lg`}
                tabIndex="-1"
                aria-labelledby="drawer-label"
            >
                <div className="flex items-center gap-2 mb-4">
                    <img className='w-[30px] h-[30px]' src="https://www.peruyello.com/img/pe/s/1651164664_82416.jpg" alt="" />
                    <h2 className='text-[#969696] font-bold text-[1.2em]'>COMPINA</h2>
                </div>
                <button
                    type="button"
                    onClick={toggleDrawer}
                    aria-controls="drawer-example"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>

                 {/* inicio */}
            <div
                onClick={() => setActiveTab('Inicio')}
                className={`flex w-full rounded-md px-3 py-2 gap-2 cursor-pointer items-center mb-2 ${isActive('Inicio') ? 'bg-[#969696] text-white' : 'bg-white text-[#969696] hover:bg-[#969696] hover:text-white duration-150 transition-all'
                    }`}
            >
                <i className={`fa-solid fa-calendar-days`}></i>
                <h3 className={`font-semibold`}>Inicio</h3>
            </div>
            {/* clientes */}
            <div
                onClick={() => setActiveTab('Clientes')}
                className={`text-[1em] flex w-full rounded-md px-3 py-2 gap-2 cursor-pointer items-center mb-1 ${isActive('Clientes') ? 'bg-[#969696] text-white' : 'text-[#969696] bg-white hover:bg-[#969696] hover:text-white duration-150 transition-all'
                    }`}
            >
                <i className={`fa-solid fa-users`}></i>
                <h3 className={`font-semibold`}>Clientes</h3>
            </div>
            {/* clienter options */}
            <div
                className={`overflow-hidden transition-all duration-300 ${isActive('Clientes') ? 'max-h-screen' : 'max-h-0'
                    }`}
            >
                <div className="mb-2 ml-4">
                    <div
                        onClick={() => setActiveClientesOption('Listar Clientes')}
                        className={`cursor-pointer w-full rounded-md px-2 py-1 mb-1 ${isActiveClientes('Listar Clientes') ? 'bg-[#C3C3C3] text-white' : 'bg-white text-[#C3C3C3] hover:bg-[#C3C3C3] hover:text-white duration-150 transition-all'
                            }`}
                    >
                        <h4 className='text-[.9em] font-medium'>Listar Clientes</h4>
                    </div>
                    <div
                        onClick={() => setActiveClientesOption('Requerimientos por atender')}
                        className={`cursor-pointer w-full rounded-md px-2 py-1 mb-1 ${isActiveClientes('Requerimientos por atender') ? 'bg-[#C3C3C3] text-white' : 'bg-white text-[#C3C3C3] hover:bg-[#C3C3C3] hover:text-white duration-150 transition-all'
                            }`}
                    >
                        <h4 className='text-[.9em] font-medium'>Requerimientos por atender</h4>
                    </div>
                </div>
            </div>
            {/* provedores */}
            <div
                onClick={() => setActiveTab('Provedores')}
                className={`text-[1em] flex w-full rounded-md px-3 py-2 gap-2 cursor-pointer items-center mb-1 ${isActive('Provedores') ? 'bg-[#969696] text-white' : 'text-[#969696] bg-white hover:bg-[#969696] hover:text-white duration-150 transition-all'
                    }`}
            >
                <i className={`fa-solid fa-handshake`}></i>
                <h3 className={`font-semibold`}>Provedores</h3>
            </div>
            {/* usuarios */}
            <div
                onClick={() => setActiveTab('Usuarios')}
                className={`text-[1em] flex w-full rounded-md px-3 py-2 gap-2 cursor-pointer items-center mb-1 ${isActive('Usuarios') ? 'bg-[#969696] text-white' : 'text-[#969696] bg-white hover:bg-[#969696] hover:text-white duration-150 transition-all'
                    }`}
            >
                <i className={`fa-solid fa-user`}></i>
                <h3 className={`font-semibold`}>Usuarios</h3>
            </div>
            {/* Inventario */}
            <div
                onClick={() => setActiveTab('Inventario')}
                className={`flex w-full rounded-md px-3 py-2 gap-2 cursor-pointer items-center mb-2 ${isActive('Inventario') ? 'bg-[#969696] text-white' : 'bg-white text-[#969696] hover:bg-[#969696] hover:text-white duration-150 transition-all'
                    }`}
            >
                <i className={`fa-solid fa-border-all`}></i>
                <h3 className={`font-semibold`}>Inventario</h3>
            </div>
            </nav>
        </div>
    )
}

export default NavVertical