import {createAction, createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import factservice from  './factureServices'

import { ToastContainer, toast } from 'react-toastify';
import factureServices from './factureServices';

const initistialState ={
facture : [],
isError:false,
isSuccess:false,
isLoading:false,
message:'',

}
export const facture = createAsyncThunk('/facture', async(id,thunkAPI)=>{
    try {
       return  factservice.getFacture(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}) 
export const generateFactures = createAsyncThunk('generate/factures',async(id,thunkAPI)=>{
    try {
        return await factservice.generateFacture(id)
    } catch (error) {
        return  thunkAPI.rejectWithValue(error)
    }
})
export const allfactures = createAsyncThunk('/allfactures', async(thunkAPI)=>{
    try {
       return  factservice.getAllFactures() 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}) 

export const newFact = createAsyncThunk('/newFacture', async(thunkAPI)=>{
    try {
       return  factservice.genererNewFacture() 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}) 
export const factureSlice = createSlice({
    name:'facture',
    initialState : initistialState,
    reducer:{},
    extraReducers:builder=>{
        builder.addCase(facture.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(facture.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.facture= action.payload
            console.log(action.payload)
        })
        .addCase(generateFactures.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(generateFactures.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.facture=action.payload
        })
        .addCase(allfactures.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(allfactures.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.factures= action.payload
            console.log(action.payload)
        })
        .addCase(allfactures.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.error
        })
        .addCase(newFact.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(newFact.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.NewFacture= action.payload
            console.log(action.payload)
        })
        .addCase(newFact.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.error
        })
    }
})
export default factureSlice.reducer;