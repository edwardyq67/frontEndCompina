import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';

export const Asistencia = createSlice({
    name: 'asistencia',
    initialState: [],
    reducers: {
        setAsistencia: (state, action) => {
            const setAsistencia = action.payload
            return setAsistencia
        }
    }
})

export const getAsitenciaThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://backendcompina.onrender.com/asistencia/1`,getConfig())
        .then((res) => dispatch(setAsistencia(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const postAsitenciaThunk = (horario) => async (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .post(
            `https://backendcompina.onrender.com/asistencia`,horario,getConfig())
        .then((res) => dispatch(setAsistencia(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
};


export const { setAsistencia } = Asistencia.actions;

export default Asistencia.reducer;
