import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';

export const usuarioSlice = createSlice({
    name: 'usuario',
    initialState: [],
    reducers: {
        setUsuario: (state, action) => {
            const setUsuario = action.payload
            return setUsuario
        }
    }
})
export const getThungUsuario = () => async (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://backendcompina.onrender.com/user`)
        .then((res) => {dispatch(setUsuario(res.data))
        })
        .finally(() => dispatch(setIsLoading(false)));
};
export const postThungUsuario = (data) => async(dispatch) => {
    dispatch(setIsLoading(true));
    await axios.post('https://backendcompina.onrender.com/user',data);
    return await axios.get('https://backendcompina.onrender.com/user')
        .then((res) => dispatch(setUsuario(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
    
}
export const deleteThungUsuario = (id) => async(dispatch) => {
    dispatch(setIsLoading(true));
    await axios.delete(`https://backendcompina.onrender.com/user/${id}`,getConfig())
    return await axios.get('https://backendcompina.onrender.com/user/')
        .then((res) => dispatch(setUsuario(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}
export const { setUsuario } = usuarioSlice.actions;

export default usuarioSlice.reducer;