import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';
import getIdConfig from '../../utils/getIdConfig';

export const secionSliceid = createSlice({
    name: 'secionid',
    initialState: [],
    reducers: {
        setsecionid: (state, action) => {
            const setSecionid = action.payload
            return setSecionid
        }
    }
})
export const getidThungSecion = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://backendcompina.onrender.com/user/${id}`,getConfig())
        .then((res) => dispatch(setsecionid(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}
export const { setsecionid } = secionSliceid.actions;

export default secionSliceid.reducer;