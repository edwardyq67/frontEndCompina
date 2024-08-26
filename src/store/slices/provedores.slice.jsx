import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';

export const provedoresSlice = createSlice({
    name: 'provedores',
    initialState: [],
    reducers: {
        setProvedores: (state, action) => {
            const setProvedores = action.payload
            return setProvedores
        }
    }
})
export const getThungProvedores = () => async (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://backendcompina.onrender.com/provedores`)
        .then((res) => {dispatch(setProvedores(res.data))
        })
        .finally(() => dispatch(setIsLoading(false)));
};
export const postThungProvedores = (data) => async(dispatch) => {
    dispatch(setIsLoading(true));
    await axios.post('https://backendcompina.onrender.com/provedores',data);
    return await axios.get('https://backendcompina.onrender.com/provedores')
        .then((res) => dispatch(setProvedores(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
    
}
export const deleteThungProvedores = (id) => async(dispatch) => {
    dispatch(setIsLoading(true));
    await axios.delete(`https://backendcompina.onrender.com/provedores/${id}`)
    return await axios.get('https://backendcompina.onrender.com/provedores/')
        .then((res) => dispatch(setProvedores(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}
export const putThungProvedores = (data) => async (dispatch) => {
    try {
        await axios.put(`https://backendcompina.onrender.com/provedores/${data.id}`, data);
        const res = await axios.get('https://backendcompina.onrender.com/provedores/');
        dispatch(setProvedores(res.data));
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
    } finally {
        dispatch(setIsLoading(false));
    }
};
export const { setProvedores } = provedoresSlice.actions;

export default provedoresSlice.reducer;