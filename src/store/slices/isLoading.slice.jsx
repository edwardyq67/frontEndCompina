import { createSlice } from '@reduxjs/toolkit';

export const isLoading = createSlice({
    name: 'isLoading',
    initialState: false,
    reducers: {
        setIsLoading:(state,action)=>{
            const isLoading=action.payload
            return isLoading
        }
    }
})

export const { setIsLoading } = isLoading.actions;

export default isLoading.reducer;
