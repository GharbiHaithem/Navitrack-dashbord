import { createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import categrieservice from  './categriesService'

import { ToastContainer, toast } from 'react-toastify';

const initistialState ={
categries:[],
isError:false,
isSuccess:false,
isLoading:false,
message:'',
} 
export const categoriesfn = createAsyncThunk('categorie',async(thunkAPI)=>{
    try {
        return await categrieservice.getAllCategories()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateCat = createAsyncThunk('categorie-edit',async(data,thunkAPI)=>{
    try {
        return await categrieservice.updateStckCategory(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const categorySlice = createSlice({
    name:'category',
    initialState:initistialState,
    reducers:{},
    extraReducers:builder=>{
     builder.addCase(categoriesfn.pending,(state)=>{
        state.isLoading = true
     })
     .addCase(categoriesfn.fulfilled,(state,action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.categries = action.payload
     })
     .addCase(categoriesfn.rejected,(state,action)=>{
        state.isError = true
        state.isSuccess = false
        state.message = action.error
     })
     .addCase(updateCat.pending,(state)=>{
        state.isLoading = true
     })
     .addCase(updateCat.fulfilled,(state,action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.categriesEdited = action.payload
        toast.success("category edited")
     })
     .addCase(updateCat.rejected,(state,action)=>{
        state.isError = true
        state.isSuccess = false
        state.message = action.error
     })
    }
})
export default categorySlice.reducer 