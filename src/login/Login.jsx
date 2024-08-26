import React, { useEffect, useState } from 'react'
import avatar from '../img/avatar.png'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getThungSecion, postThungSecion } from '../store/slices/secion.slice';
import { postAsitenciaThunk } from '../store/slices/asistencia';
import { getidThungSecion } from '../store/slices/idseccionUser.slice';
import getIdConfig from '../utils/getIdConfig';

function Login({ ruta, setRutas }) {

    Login.defaultProps = {
        ruta: '/',
        setRutas: () => {},
      };
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [seccion,setSecion] =useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
  
    useEffect(()=>{
        setRutas("/")
        dispatch(getThungSecion())
    },[])


    const submit = async (e) => {
        await axios.post('https://backendcompina.onrender.com/user/login', e)
        .then(async(res) => {await setSecion(res.data)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.user.id);
        })
        .catch((err) => alert("usuario no encontrado")); 
    

    };
useEffect(()=>{
    const verificarAsistencia = async () => {
        // Asegúrate de que `seccion`, `seccion.user`, y `seccion.user.asistencia` existen antes de acceder a ellas
        if (seccion?.user?.asistencia?.length) {
            const fechaHoy = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

            const ultimaEntrada = seccion.user.asistencia[seccion.user.asistencia.length - 1].fecha;
            const ultimaEntradaFecha = new Date(ultimaEntrada).toISOString().split('T')[0]; // Formato YYYY-MM-DD
            if (ultimaEntradaFecha === fechaHoy) {
                localStorage.setItem('miArreglo', JSON.stringify(seccion));
                setRutas('/Inicio');
                navigate("/Inicio");
            } else {
                const horario = {
                    fecha: new Date(),
                    horarioInicio: new Date(),
                    horarioSalida: ""
                };

                await dispatch(postAsitenciaThunk(horario));
                const authorization = getIdConfig().headers.Authorization;
                await dispatch(getidThungSecion(authorization));
                await localStorage.setItem('miArreglo', JSON.stringify(seccion));
                setRutas('/Inicio');
                navigate("/Inicio");
            }
        } else if (seccion?.user?.asistencia?.length === 0 || !seccion.user.asistencia?.[seccion.user.asistencia.length - 1]?.fecha) {
            const horario = {
                fecha: new Date(),
                horarioInicio: new Date(),
                horarioSalida: ""
            };

            await dispatch(postAsitenciaThunk(horario));
            const authorization = getIdConfig().headers.Authorization;
            await dispatch(getidThungSecion(authorization));
            await localStorage.setItem('miArreglo', JSON.stringify(seccion));
            setRutas('/Inicio');
            navigate("/Inicio");
        }
    };

    verificarAsistencia();
},[submit])
    return (
        <form onSubmit={handleSubmit(submit)} className={`${ruta == '/Login' ? 'hidden' : "flex bg-gradient-to-r from-color1 to-color2 w-[100vw] h-[100vh] justify-center items-center"}`}>
            <div className="gap-x-10 gap-y-5 justify-center max-w-[50vw] px-10 py-14 bg-white rounded-md border border-black relative grid grid-cols-2">
                <div className="absolute inset-x-0 top-[-50px] flex justify-center">
                    <img className=' w-[100px] h-[100px]' src={avatar} alt="Avatar" />
                </div>
                <div className="col-span-2 flex">
                    <img src="https://compina.net/soluciones/sistema_cmr_compipro/sistema_cmr/images/logo-compipro1.png" alt="Compina" />
                </div>
                <div className="col-span-1 grid">
                    <div className="flex justify-start items-center">
                        <i className="fa-solid fa-user "></i>
                        <h2 className='text-[1em]'>
                            Usuario :
                        </h2>
                    </div>
                    <input {...register("usuario")} className='border border-black rounded-md p-2 h-12' type="text" />
                </div>
                <div className="col-span-1 grid">
                    <div className="flex justify-start items-center">
                        <i className="fa-solid fa-key "></i>
                        <h2 className='text-[1em]'>
                            Contraseña :
                        </h2>
                    </div>
                    <div className="relative">
                        <input
                            className='border border-black rounded-md p-2 h-12'
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Password"
                            {...register("password")}
                        />
                        <i
                            className={`fa-solid ${passwordVisible ? "fa-eye" : "fa-eye-slash"} absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer`}
                            onClick={togglePasswordVisibility}
                        ></i>
                    </div>
                </div>
                <button type='submit' className='bg-color1 rounded text-white py-1 cursor-pointer'>
                    Entrar
                </button>
            </div>
        </form>
    )
}

export default Login;

