import { configureStore } from '@reduxjs/toolkit'
import  isLoading  from './slices/isLoading.slice'
import  clienteLitarCliente  from './slices/clienteListarCliente'
import secionSlice from './slices/secion.slice'
import  Asistencia  from './slices/asistencia'
import  secionSliceid  from './slices/idseccionUser.slice'
import usuarioSlice from './slices/usuario.slice'
import provedoresSlice from './slices/provedores.slice'
import  CRequermientoSlice  from './slices/clienteRequerimiento.slice'


export default configureStore({
    reducer: {
        isLoading:isLoading,
        clienteLitarCliente:clienteLitarCliente,
        secionSlice:secionSlice,
        Asistencia:Asistencia,
        secionSliceid:secionSliceid,
        usuarioSlice:usuarioSlice,
        provedoresSlice:provedoresSlice,
        CRequermientoSlice:CRequermientoSlice
    }
})
