import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';

export const CRequermientoSlice = createSlice({
    name: 'cRequerimento',
    initialState: [],
    reducers: {
        setCRequerimiento: (state, action) => {
            const setCRequerimiento = action.payload
            return setCRequerimiento
        }
    }
})
export const getThungCRequerimiento = () => async (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://backendcompina.onrender.com/cliente/requirimiento`)
        .then((res) => {
            dispatch(setCRequerimiento(res.data))
        })
        .finally(() => dispatch(setIsLoading(false)));
};
export const postThungCRequerimiento = (data) => async(dispatch) => {
    dispatch(setIsLoading(true));
    await axios.post('https://backendcompina.onrender.com/cliente/requirimiento',data);
    return await axios.get('https://backendcompina.onrender.com/cliente/requirimiento')
        .then((res) => dispatch(setCRequerimiento(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
    
}
export const deleteThungCRequerimiento = (id) => async(dispatch) => {
    dispatch(setIsLoading(true));
    await axios.delete(`https://backendcompina.onrender.com/cliente/requirimiento/${id}`)
    return await axios.get('https://backendcompina.onrender.com/cliente/requirimiento/')
        .then((res) => dispatch(setCRequerimiento(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}
export const putThungCRequerimiento = (data) => async (dispatch) => {
    try {
        await axios.put(`https://backendcompina.onrender.com/cliente/requirimiento/${data.id}`, data);
        const res = await axios.get('https://backendcompina.onrender.com/cliente/requirimiento/');
        dispatch(setCRequerimiento(res.data));
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
    } finally {
        dispatch(setIsLoading(false));
    }
};
export const { setCRequerimiento } = CRequermientoSlice.actions;

export default CRequermientoSlice.reducer;