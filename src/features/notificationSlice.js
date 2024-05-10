import {createAction, createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import notifservice from  './notificationService'

import { ToastContainer, toast } from 'react-toastify';


const initistialState ={
notification : [],
isError:false,
isSuccess:false,
isLoading:false,
message:'',

}
export const notifications = createAsyncThunk('/notifications', async(thunkAPI)=>{
    try {
       return  notifservice.getAllNotif() 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}) 

export const notificationSlice = createSlice({
    name:'facture',
    initialState : initistialState,
    reducer:{},
    extraReducers:builder=>{
        builder.addCase(notifications.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(notifications.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.notification= action.payload
            console.log(action.payload)
        })
      
        .addCase(notifications.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.error
            state.notification = []
        })
    }
})
export default notificationSlice.reducer;