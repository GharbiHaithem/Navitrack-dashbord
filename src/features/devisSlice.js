import{createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import devisService from './devisService'
const initistialState ={
    devis : [],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
    
    }
    export const devis = createAsyncThunk('/facture', async(id,thunkAPI)=>{
        try {
           return  devisService.getDevis(id) 
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }) 
    export const devisSlice = createSlice({
        name:'devis',
        initialState : initistialState,
        reducer:{},
        extraReducers:builder=>{
            builder.addCase(devis.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(devis.fulfilled,(state,action)=>{
              state.devis = action.payload
              state.isSuccess = true
              state.isLoading = false
            })
        }
    })
    export default devisSlice.reducer
