import { createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import companieService from  './companieService'

import { ToastContainer, toast } from 'react-toastify';

const initistialState ={
companie:[],
isError:false,
isSuccess:false,
isLoading:false,
message:'',
} 
export const companies = createAsyncThunk('companies',async(thunkAPI)=>{
    try {
        return companieService.companies()
    } catch (error) {
        return  thunkAPI.rejectWithValue(error)
    }
}) 
export const companiefn = createAsyncThunk('/client',async(id,thunkAPI)=>{
  try {
 console.log(id)
    return await companieService.companie(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const createcompanie = createAsyncThunk('/client/create',async(dataClient,thunkAPI)=>{
    try {
        return await companieService.createClient(dataClient)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const searchClient = createAsyncThunk('auth/search/client',async(query,thunkAPI)=>{
    try {
   
      return await companieService.searchClient(query)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  })
 
  export const editcompanie = createAsyncThunk('/edit/client',async(data,thunkAPI)=>{
    try {
   
      return await companieService.editcompanie(data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  })
  export const deletecompanie = createAsyncThunk('/delete/client',async(id,thunkAPI)=>{
    try {
   
      return await companieService.deleteArchiveCompanie(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  })
export const companieSlice = createSlice({
    name:'companie',
    initialState:initistialState,
    reducers:{},
    extraReducers:builder=>{
     builder.addCase(companies.pending,(state)=>{
        state.isLoading = true
     })
     .addCase(companies.fulfilled,(state,action)=>{
      console.log(action.payload)
        state.isLoading = false
        state.isSuccess = true
        state.companie= action.payload
     })
     .addCase(companies.rejected,(state,action)=>{
        state.isLoading=false
        state.isSuccess = false
        state.isError= true
        state.message = action.error
     }).addCase(createcompanie.pending,(state)=>{
        state.isLoading = true
                })
                .addCase(createcompanie.fulfilled,(state,action)=>{
                    console.log(action.payload)
                    state.isLoading = false
                    state.isSuccess = true
                    state.clientcreated = action.payload.client
                    state.message = action.payload.message 
                    toast.success("companie created success")
                })
                
                .addCase(createcompanie.rejected,(state,action)=>{
                  console.log(action.payload)
                    state.isLoading = false
                    state.isSuccess = false
                    state.isError = true
                    state.message = action.error
                    toast.error("something went wrong")
                })
                .addCase(searchClient.pending,(state)=>{
                    state.isLoading=true
                    state.message=""
                    state.isError= false
                  
                   })
                   .addCase(searchClient.fulfilled,(state,action)=>{
                    console.log(action.payload)
                    state.isLoading=false
                    state.isSuccess=true
                    state.isError = false
                   state.isLogin = true
                   state.companie = action.payload
                 
            
                   })
                   .addCase(searchClient.rejected,(state,action)=>{
                    console.log(action.payload)
                    state.isLoading=false
                    state.isSuccess=false
                    state.isError=true
                   
                  
                   })
                   .addCase(companiefn.pending, (state) => {
                    state.isLoading = true;
                    state.message = '';
                    state.isError = false;
                })
                .addCase(companiefn.fulfilled, (state, action) => {
                    console.log(action.payload);
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.companie = action.payload;
                })
                .addCase(companiefn.rejected, (state, action) => {
                    console.log(action.payload);
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError = true;
                    state.message = action.error;
                })
                   .addCase(editcompanie.pending,(state)=>{
                    state.isLoading=true
                    state.message=""
                    state.isError= false
                  
                   })
                   .addCase(editcompanie.fulfilled,(state,action)=>{
                    console.log(action.payload)
                    state.isLoading=false
                    state.isSuccess=true
                    state.isError = false
                   state.isLogin = true
                   state.companie = action.payload
                 
            
                   })
                   .addCase(editcompanie.rejected,(state,action)=>{
                    console.log(action.payload)
                    state.isLoading=false
                    state.isSuccess=false
                    state.isError=true
                   
                  
                   })
                   .addCase(deletecompanie.pending,(state)=>{
                    state.isLoading=true
                    state.message=""
                    state.isError= false
                  
                   })
                   .addCase(deletecompanie.fulfilled,(state,action)=>{
                    console.log(action.payload)
                    state.isLoading=false
                    state.isSuccess=true
                    state.isError = false
                   state.isLogin = true
                   state.companiedeleted = action.payload
                 toast.error("companie supprimé")
            
                   })
                   .addCase(deletecompanie.rejected,(state,action)=>{
                    console.log(action.payload)
                    state.isLoading=false
                    state.isSuccess=false
                    state.isError=true
                   
                  
                   })
    }
}) 
export default companieSlice.reducer;