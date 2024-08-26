import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const secionSlice = createSlice({
    name: 'secion',
    initialState: [],
    reducers: {
        setsecion: (state, action) => {
            const setSecion = action.payload
            return setSecion
        }
    }
})
export const getThungSecion = () => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
        dispatch(setsecion([])); 
    } catch (error) {
        console.error('Error:', error);
        dispatch(setsecion([])); // Asegura que en caso de error, la sección esté vacía.
    } finally {
        dispatch(setIsLoading(false)); // Detiene la indicación de carga.
    }
};
export const postThungSecion = (date) => async(dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post(`https://backendcompina.onrender.com/user/login`, date)
        .then((res) => {dispatch(setsecion(res.data))
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.user.id);
        })
        .finally(() => dispatch(setIsLoading(false)));
}
export const { setsecion } = secionSlice.actions;

export default secionSlice.reducer;
