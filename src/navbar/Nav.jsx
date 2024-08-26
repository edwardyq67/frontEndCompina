import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Nav({ setMostrarPag }) {
    const [activeTab, setActiveTab] = useState('');
    const [activeClientesOption, setActiveClientesOption] = useState('Listar Clientes');
    const [activeProvedoresOption, setActiveProvedoresOption] = useState('Listar provedores');
    const [activeLogisticaOption, setActiveLogisticaOption] = useState('Rutas');
    const [activeUsuarioOption, setActiveUsuarioOption] = useState('Nuevo');
    const isActive = (tab) => activeTab === tab;
    const isActiveClientes = (option) => activeClientesOption === option;
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

    return (
        <nav className='rounded-r-lg bg-white w-full min-h-[100vh] px-2 pt-4 z-40'>
            <div className="flex items-center gap-2 mb-4">
                <img className='w-[30px] h-[30px]' src="https://www.peruyello.com/img/pe/s/1651164664_82416.jpg" alt="" />
                <h2 className='text-[#969696] font-bold text-[1.2em]'>COMPINA</h2>
            </div>
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
    );
}

export default Nav;
